const express = require('express')
const app = express()
const puppeteer = require('puppeteer');
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors())
app.use(bodyParser.json())

app.post('/', (req, res) => {
  screenshot('http://localhost:5174', '')
})

app.listen(process.env.PORT || 443, () => {
  console.log(`App listen on port ${process.env.PORT}`)
})

async function screenshot(url, token){
  // Create a browser instance
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });

  // Create a new page
  const page = await browser.newPage();
  await page.evaluateOnNewDocument (
  token => {
      localStorage.clear();
      localStorage.setItem('access_token', token);
  }, token);
  // Website URL to export as pdf
  const websiteUrl = `${url}`;

  // Open URL in current page
  await page.goto(websiteUrl, { waitUntil: 'networkidle0' });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  const screenshot = await page.screenshot({
    encoding: 'base64',
    fullPage: true
  })

  // Close the browser instance
  await browser.close();

  return screenshot
}

