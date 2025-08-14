# README: AI Quiz Solver Chrome Extension

### Table of Contents
1. [Introduction](#1-introduction)
2. [How It Works](#2-how-it-works)
3. [Features](#3-features)
4. [Prerequisites](#4-prerequisites)
5. [Installation](#5-installation)
6. [Usage](#6-usage)
7. [Troubleshooting](#7-troubleshooting)
8. [Download and Contribute](#8-download-and-contribute)

***

### 1. Introduction
The **AI Quiz Solver** is a Chrome extension designed to help you solve quizzes and questions on any webpage. It works by analyzing the text and interactive elements on a page, and then using a powerful AI model (Google's Gemini) to determine the correct answers. The extension then automatically interacts with the page to fill in the answers for you.

***

### 2. How It Works
The extension operates in three main steps:
1.  **Scraping**: When you click the "Solve" button, the extension scrapes all the visible text and interactive elements (like buttons and input fields) from the current webpage.
2.  **AI Analysis**: The scraped data is sent to the Gemini AI model, which analyzes the content to identify questions and select the correct answers. The model returns a list of actions to be performed on the page.
3.  **Automation**: The extension then takes the list of actions from the AI and automatically clicks the correct buttons or types text into the appropriate fields, solving the quiz for you.

***

### 3. Features
* **Dual Model Support**: Choose between **Gemini 2.5 Flash** for fast and efficient solving or **Gemini 2.5 Pro** for more complex and accurate problem-solving.
* **Automatic Interaction**: The extension automatically performs the necessary clicks and text inputs.
* **User-Friendly Interface**: A simple popup with a clear status message.

***

### 4. Prerequisites
Before you can use the extension, you need a Google API key from Google AI Studio.

#### How to Get Your API Key 🔑
1.  Go to the Google AI Studio page: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2.  Click the "**Get API key**" or "**Create API key**" button.
3.  If prompted, click "**Create with new project**".
4.  Copy the generated API key.
5.  Create a file named `key.txt` in your extension's main folder.
6.  Paste the copied API key into this file.

***

### 5. Installation
There are two ways to install this extension.

#### A. Download Zipped Files
1.  Download the zipped extension files directly.
2.  Unzip the folder.
3.  Go to your Chrome browser and navigate to `chrome://extensions`.
4.  In the top-right corner, turn on **Developer mode**. 
5.  Click the "**Load unpacked**" button that appears.
6.  Select the folder where you unzipped the extension files. The extension will now be installed and ready to use.

#### B. Clone with Git
1.  **Download Git for Windows**: If you don't have Git installed, go to [https://git-scm.com/download/win](https://git-scm.com/download/win) and follow the installation instructions.
2.  **Open Git Bash**: Open the Git Bash application on your computer.
3.  **Clone the Repository**: Navigate to the directory where you want to save the extension and use the following command to download all the files:
    ```
    git clone [https://github.com/exmprison/AI-work.git](https://github.com/exmprison/AI-work.git)
    ```
4.  Follow steps 3-6 from the "Download Zipped Files" section to load the extension in Chrome.

***

### 6. Usage
1.  Go to a quiz or page with questions you want to solve.
2.  Click on the **AI Quiz Solver** extension icon in your Chrome toolbar.
3.  A popup will appear with two buttons: "**Solve with Flash**" and "**Solve with Pro**".
4.  Choose your preferred model.
5.  The extension will analyze the page, and the status box will show "Solving...".
6.  Once complete, the status box will update with the result.

***

### 7. Troubleshooting
* **Error: Cannot read properties of undefined (reading '0')**: This usually means the AI has blocked the content of the page due to safety concerns. Try the Pro model, or check your page content for anything that might be flagged.
* **"Error: API call failed"**: Double-check that your API key is correct and that it has not been revoked.
* **"Error: API Key is missing"**: Ensure you have created and saved your API key in a file named `key.txt` in the root of the extension folder.
* **Extension not loading**: Make sure **Developer mode** is enabled on the `chrome://extensions` page.

***

### 8. Download and Contribute
You can download the files or clone the repository from the following GitHub link: [https://github.com/exmprison/AI-work/tree/main](https://github.com/exmprison/AI-work/tree/main). Feel free to contribute by opening an issue or submitting a pull request!
