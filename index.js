const puppeteer = require("puppeteer");

const docHeight = () => {
  const body = document.body
  const html = document.documentElement;

  let height =  Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  height = parseInt(height * 0.9) ;

  return height + 'px';
}

(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url = "http://127.0.0.1:5500/index.html";

  // Open URL in current page
  await page.goto(website_url, { waitUntil: "networkidle0" });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // const height_weight_ratio = await page.evaluate( () => window.innerHeight / window.innerWidth)
  // let height = parseInt('10.8cm') * height_weight_ratio
  // const scale = 1/height_weight_ratio;
  let height = await page.evaluate(docHeight);
  
  // height += 'px'
  // console.log("height ", height);


  // Downlaod the PDF
  const pdf = await page.pdf({
    path: "static/docs/resume.pdf",
    margin: { top: "0px", right: "10px", bottom: "0px", left: "10px" },
    printBackground: true,
    // format: "A4",
    height: height,
    scale: 0.9,
    // preferCSSPageSize: false,
  });

  // Close the browser instance
  await browser.close();
})();

// visit this website and merge the pages
// https://avepdf.com/convert-to-one-page-pdf


