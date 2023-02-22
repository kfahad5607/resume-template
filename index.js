const puppeteer = require('puppeteer');

(async () => {

  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url = 'http://127.0.0.1:5500/index.html'; 

  // Open URL in current page
  await page.goto(website_url, { waitUntil: 'networkidle0' }); 

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

// Downlaod the PDF
  const pdf = await page.pdf({
    path: 'static/docs/result.pdf',
    margin: { top: '0px', right: '10px', bottom: '0px', left: '10px' },
    printBackground: true,
    format: 'A4',
    scale: 0.9,
  });

  // Close the browser instance
  await browser.close();
})();

// visit this website and merge the pages
// https://avepdf.com/convert-to-one-page-pdf