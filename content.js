// FUNCTION 1: This is our "Eyes and Ears". It scrapes the page.
function scrapePage() {
    // Get all visible text from the body
    const allText = document.body.innerText.trim();

    // Get all interactive elements
    const inputs = Array.from(document.querySelectorAll('input, button'));
    const interactiveElements = inputs.map(el => {
        // Find the associated label text
        let labelText = '';
        if (el.id) {
            const label = document.querySelector(`label[for='${el.id}']`);
            if (label) {
                labelText = label.innerText;
            }
        }
        // If no label, try to find text from a parent element
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
    }).filter(el => el.id); // Only include elements with an ID for reliable selection

    return {
        text: allText,
        interactiveElements: interactiveElements
    };
}

// FUNCTION 2: This is our "Hands". It performs the action decided by the AI.
function performAction(decision) {
    if (!decision || !decision.action || !decision.elementId) {
        console.error("AI returned an invalid decision:", decision);
        return;
    }

    const element = document.getElementById(decision.elementId);
    if (!element) {
        console.error(`Could not find element with ID: ${decision.elementId}`);
        return;
    }

    if (decision.action === 'click') {
        element.click();
        // Optional: Add a visual indicator
        element.style.outline = '3px solid #4285F4';
        element.style.outlineOffset = '2px';

    } else if (decision.action === 'type') {
        element.value = decision.answerText;
        // Optional: Add a visual indicator
        element.style.border = '3px solid #34A853';
    }
}
