// Student name: Nargiz Guliyeva
// Course name: Creating anf Exploring Software Environments 
// with Script and Node.js
// Type:Final Project
// Title: Sentiment Analysis with JavaScript

// Description: Frontend is a JavaScript file(.js) that handles interaction on the web page (index.html).

// Create async function to perform asynchronous operations
async function analyzeSentiment() {
    
    // Get the user input. NOTE: "getElementByID" is a method in Document Object Model (DOM)
    // This method returns a reference to the element with a unique id attribute that is given
    // as an argument 
    const urlInput = document.getElementById('textInput').value;
   
    // Get result container element 
    const resultContainer = document.getElementById('result');

    // Clear previous results
    resultContainer.innerHTML = ''; 

    // "try" is a part of the exception handling. In this case it will 
    // run the block as normal, but in case of exception  it will pass the error object onto 
    // "catch" block.
    try {

        //"fetch"funtction makes an asych HTTP request to the backend server.
        // This method returns a promises that resolves to the response returned from the URL.
        const response = await fetch('http://localhost:3000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlInput }), 
        });

        // Check for the HTTP request
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error('Error:', error.message);
        resultContainer.innerHTML = `<p>An error occurred during analysis.</p>`;
    }
}

function displayResult(data) {
    const resultContainer = document.getElementById('result');
    const sentimentScore = data.score;
    const sentimentType = getSentimentType(sentimentScore);
    const backgroundColor = getBackgroundColor(sentimentScore);
    const sentimentMessage = getSentimentMessage(sentimentScore);

    const resultHTML = `
        <p style="background-color: ${backgroundColor};">Sentiment Score: ${sentimentScore}</p>
        <p style="background-color: ${backgroundColor};">General Sentiment: ${sentimentMessage}</p>
    `;

    resultContainer.innerHTML = resultHTML;
}

// Create a function using "if" method to show the score of the analysis
function getSentimentType(score) {
    if (score > 0) {
        return 'Positive';
    } else if (score < 0) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
}

// Create the function that in addition to the text
// will also display the score and change the color 
// of the background depending on the type of the message
function getBackgroundColor(score) {
    if (score > 0) {
        return 'green'; // Positive sentiment
    } else if (score < 0) {
        return 'red'; // Negative sentiment
    } else {
        return 'grey'; // Neutral sentiment
    }
}

// Create the function to display the message on the type of the 
// text in the link
function getSentimentMessage(score) {
    if (score > 0) {
        return 'Positive';
    } else if (score < 0) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
}


//Reference:
// 1. Jones, D. (2017). JavaScript: Novice to Ninja. SitePoint Pty Ltd.

// 2. How Much JavaScript is Required to Become Front End Developer?, 
// Retrieved from https://www.geeksforgeeks.org/how-much-javascript-is-required-to-become-front-end-developer/

//3. Sentiment Analysis using JavaScript and API, 
// Retrieved from https://www.geeksforgeeks.org/sentiment-analysis-using-javascript-and-api/

//4. JavaScript if, else, and else if, 
// Retrieved from https://www.w3schools.com/js/js_if_else.asp

//5. JavaScript Async, Retrieved from https://www.w3schools.com/js/js_async.asp