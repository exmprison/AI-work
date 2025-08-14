chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "solveQuiz") {
        (async () => {
            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (!tab) {
                    throw new Error("No active tab found.");
                }

                const results = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: scrapePage,
                });

                const pageContent = results[0].result;
                if (!pageContent || !pageContent.text || pageContent.text.trim().length < 20) {
                    throw new Error("Not enough text on page to analyze.");
                }

                const aiDecisions = await getAIDecision(pageContent, request.model);
                
                if (!aiDecisions || !Array.isArray(aiDecisions) || aiDecisions.length === 0) {
                    console.error("Invalid decision array from AI:", aiDecisions);
                    throw new Error("AI returned no valid actions.");
                }

                const actionResults = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: performActions,
                    args: [aiDecisions]
                });

                const result = actionResults[0].result;
                if (!result.success) {
                    throw new Error(result.error);
                }

                sendResponse({ success: true, status: `${result.actionsTaken} actions performed!` });

            } catch (error) {
                console.error("Error in solveQuiz:", error);
                sendResponse({ success: false, status: `Error: ${error.message}` });
            }
        })();
        return true;
    }
});

async function getAIDecision(pageContent, model) {
    const keyURL = chrome.runtime.getURL('key.txt');
    
    const keyResponse = await fetch(keyURL);
    if (!keyResponse.ok) {
        throw new Error("Could not load key.txt from extension files.");
    }
    const API_KEY = (await keyResponse.text()).trim();

    if (!API_KEY) {
        throw new Error("API Key is missing from key.txt.");
    }
    
    // Select the model based on the request
    let modelName = '';
    if (model === 'pro') {
        modelName = 'gemini-2.5-pro';
    } else {
        modelName = 'gemini-2.5-flash';
    }

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
    
    const prompt = `
        You are an expert quiz-solving AI. Your task is to analyze the provided webpage content, identify ALL the questions, and determine the correct actions to answer them. You are to give the answers in the provided format, and use no other means of mormatting your responce. 

        **Webpage Text Content:**
        ---
        ${pageContent.text}
        ---

        **Available Interactive Elements:**
        ---
        ${JSON.stringify(pageContent.interactiveElements, null, 2)}
        ---

        **Your Task:**
        1. Find every question on the page.
        2. For each question, determine the correct answer(s).
        3. For each answer, find the corresponding interactive element(s) from the list.
        4. Provide your response as a JSON array of action objects. Each object must follow this format:
            {
              "action": "click" or "type",
              "elementId": "The 'id' of the element to interact with",
              "answerText": "The text to type (only if action is 'type')"
            }
        
        **Example Response for a page with multiple questions:**
        [
          { "action": "type", "elementId": "q1-input", "answerText": "Oxygen" },
          { "action": "click", "elementId": "q2a2", "answerText": null },
          { "action": "click", "elementId": "q3a1", "answerText": null },
          { "action": "click", "elementId": "q3a3", "answerText": null }
        ]

        Return ONLY the JSON array.
    `;
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    
    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    
    const responseData = await response.json();
    
    console.log("Full API Response:", responseData);
    
    if (!responseData.candidates || responseData.candidates.length === 0) {
        let errorMessage = "AI returned no valid candidate response.";
        if (responseData.promptFeedback && responseData.promptFeedback.safetyRatings) {
            const blockedReason = responseData.promptFeedback.safetyRatings
                .filter(r => r.blocked)
                .map(r => `${r.category}: ${r.probability}`)
                .join(', ');
            errorMessage = `AI returned no valid candidate response. Content was blocked by safety settings: ${blockedReason}.`;
        }
        throw new Error(errorMessage);
    }
    
    const aiResponseText = responseData.candidates[0].content.parts[0].text;
    
    try {
        const jsonString = aiResponseText.replace(/```json\n|```/g, '').trim();
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON from AI response:", aiResponseText);
        throw new Error("AI returned a malformed response. Expected a valid JSON array.");
    }
}

function scrapePage() {
    const allText = document.body.innerText.trim();
    const inputs = Array.from(document.querySelectorAll('input, button'));
    const interactiveElements = inputs.map(el => {
        let labelText = '';
        if (el.id) {
            const label = document.querySelector(`label[for='${el.id}']`);
            if (label) {
                labelText = label.innerText;
            }
        }
        if (!labelText) {
           labelText = el.closest('label')?.innerText || el.value || el.name || '';
        }
        return {
            id: el.id,
            type: el.type,
            name: el.name,
            value: el.value,
            labelText: labelText.trim()
        };
    }).filter(el => el.id);
    return { text: allText, interactiveElements: interactiveElements };
}

function performActions(decisions) {
    let actionsTaken = 0;
    for (const decision of decisions) {
        if (!decision || !decision.action || !decision.elementId) {
            console.error("AI returned an invalid decision object:", decision);
            continue;
        }
        const element = document.getElementById(decision.elementId);
        if (!element) {
            console.error(`Could not find element with ID: ${decision.elementId}`);
            continue;
        }
        try {
            if (decision.action === 'click') {
                element.click();
                element.style.outline = '3px solid #4285F4';
                element.style.outlineOffset = '2px';
            } else if (decision.action === 'type') {
                element.value = decision.answerText;
                element.style.border = '3px solid #34A853';
            }
            actionsTaken++;
        } catch (e) {
            console.error(`Failed to interact with element ${decision.elementId}: ${e.message}`);
        }
    }
    if (actionsTaken === 0 && decisions.length > 0) {
        return { success: false, error: "AI provided actions, but none could be performed." };
    }
    return { success: true, actionsTaken: actionsTaken };
}