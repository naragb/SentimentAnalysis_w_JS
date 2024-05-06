// Student name: Nargiz Guliyeva
// Course name: Creating anf Exploring Software Environments 
// with Script and Node.js
// Type:Final Project
// Title: Sentiment Analysis with JavaScript

// Description: Backend  is a Node.js script to perform sentiment analysis

// NOTE: Run the following command in the terminal to intall Node.js packages:
// `npm install express puppeteer sentiment body-parser`


// Import libraries and modules
// require() method takes the file that contains the module as an argument 
// and returns the function that was exported 
const express = require('express');
const puppeteer = require('puppeteer');
const Sentiment = require('sentiment');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of the Express application
const app = express();

// Create an instance of the sentiment class
const sentiment = new Sentiment();

// Enable CORS and JSON 
app.use(cors());
app.use(bodyParser.json());

//Define a POST endpoint for '/analyze' route
app.post('/analyze', async (req, res) => {
    const url = req.body.url;

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);


        // Extract the text from the webpage
        const text = await page.$eval('*', (el) => el.innerText);
        
        // Analyze the extracted text
        const result = sentiment.analyze(text);

        await browser.close();

        res.json({ score: result.score });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred during analysis.' });
    }
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server and log a message 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//Reference: 

// 1.  Jones, D. (2017). JavaScript: Novice to Ninja. SitePoint Pty Ltd.

// 2. What is Sentiment Analysis? 
//Retrieved from https://aws.amazon.com/what-is/sentiment-analysis/

//3. NPM: Sentiment, 
// Retrieved from https://www.npmjs.com/package/sentiment

// 4. Sentiment Analysis using JavaScript and API, 
// Retrieved from https://www.geeksforgeeks.org/sentiment-analysis-using-javascript-and-api/

// 5. Web Scraping and Sentiment Analysis with Javascript, 
// Retrieved from https://www.youtube.com/watch?v=w6ECXzSJdnQ

//6. Express app.listen() Function, 
// Retrieved from https://www.geeksforgeeks.org/express-js-app-listen-function/q

//7. Understanding process.env.PORT in Node.js
// Retrieved from https://developerport.medium.com/understanding-process-env-port-in-node-js-e09aef80384c
