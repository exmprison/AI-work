# README: AI Quiz Solver Chrome Extension

### Table of Contents
1.  [Introduction](#1-introduction)
2.  [How It Works](#2-how-it-works)
3.  [Features](#3-features)
4.  [Prerequisites](#4-prerequisites)
5.  [Installation](#5-installation)
6.  [Usage](#6-usage)
7.  [Troubleshooting](#7-troubleshooting)
8.  [Download and Contribute](#8-download-and-contribute)

***

### 1. Introduction
The **AI Quiz Solver** is a Chrome extension that helps you answer quizzes and questions on any webpage. It uses an advanced AI model from Google called Gemini to find the correct answers and then automatically types or clicks them for you. It's like having a smart helper right in your browser! 🤖

***

### 2. How It Works
The extension works in three simple steps:
1.  **Look**: It scans the webpage to find all the questions and possible answers.
2.  **Think**: It sends this information to the Gemini AI to figure out the right answers.
3.  **Do**: It uses the AI's answers to click buttons or type text into the right places on the page.

***

### 3. Features
* **Two AI Models**: You can choose between two different Gemini models:
    * **Flash**: This model is super fast and great for most quizzes.
    * **Pro**: This model is more powerful and can be better at solving trickier questions.
* **Automatic Actions**: It automatically performs the necessary clicks and text inputs.
* **Easy to Use**: The extension has a simple button to get started.

***

### 4. Prerequisites
Before you can use the extension, you need a secret code called an API key from Google. Don't worry, it's free!

#### How to Get Your API Key 🔑
1.  Go to the Google AI Studio website: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2.  Click the "**Get API key**" or "**Create API key**" button.
3.  If a new window pops up, click "**Create with new project**".
4.  Copy the long code that appears on the screen. This is your API key.

Now, you need to save this code in a file.
5.  Open a simple text program like Notepad (on Windows) or TextEdit (on Mac).
6.  Paste your API key into the empty file.
7.  Save the file as **`key.txt`** and make sure there are no other characters in the file, like extra spaces.

***

### 5. Installation
There are two ways to get the extension onto your computer. Pick the one that's easiest for you.

#### Option 1: Download a Zipped File (Easiest)
1.  Go to the GitHub page for this project and click on the **Code** button.
2.  In the menu that appears, click "**Download ZIP**". This will download a compressed folder with all the files.
3.  Find the downloaded file and unzip it. This will create a new regular folder with all the extension's files inside.
4.  Take the `key.txt` file you created in the last step and move it into this new folder. It should be in the same place as the `manifest.json` file.
5.  Open your Chrome browser and go to `chrome://extensions` in the address bar.
6.  Look for the **Developer mode** switch in the top-right corner and turn it on. 
7.  A new button called "**Load unpacked**" will appear. Click it.
8.  Select the folder you unzipped and put your `key.txt` file in.
9.  The extension is now installed! A new icon will appear in your Chrome toolbar.

#### Option 2: Use Git to Clone the Repository
This is for users who are comfortable with Git.

1.  If you don't have Git, download it here: [https://git-scm.com/download/win](https://git-scm.com/download/win).
2.  Open your computer's terminal or Git Bash.
3.  Navigate to the folder where you want to save the extension files.
4.  Use this command to download all the files:
    ```
    git clone [https://github.com/exmprison/AI-work.git](https://github.com/exmprison/AI-work.git)
    ```
5.  This will create a new folder named `AI-work`.
6.  Take the `key.txt` file you created and place it inside the `AI-work` folder.
7.  Go to `chrome://extensions` in your Chrome browser and turn on **Developer mode**.
8.  Click "**Load unpacked**" and select the `AI-work` folder.

***

### 6. Usage
1.  Go to a website with a quiz or questions you want to solve.
2.  Click the new **AI Quiz Solver** icon in your Chrome toolbar.
3.  A small window will open with two buttons: "**Solve with Flash**" and "**Solve with Pro**".
4.  Choose the model you want to use.
5.  The extension will start working, and the status will change to "Solving...".
6.  When it's done, it will show you the result.

***

### 7. Troubleshooting
* **Error: Cannot read properties of undefined**: This usually means the AI has blocked the content due to safety concerns. Try the other model or check the quiz for any sensitive topics.
* **"Error: API call failed"**: Make sure your `key.txt` file has the correct API key inside.
* **Extension not loading**: Make sure **Developer mode** is turned on in your Chrome extensions page.

***

### 8. Download and Contribute
You can get the files from the GitHub page: [https://github.com/exmprison/AI-work/tree/main](https://github.com/exmprison/AI-work/tree/main). You can also help improve the extension by reporting bugs or suggesting new features!
