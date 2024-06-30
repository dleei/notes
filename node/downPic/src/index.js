import puppeteer from 'puppeteer-core'

const targetUrl = 'https://www.rrdynb.com/index.html'
const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const toPage = async () => {
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: false,
    defaultViewport: null,
  })
  const page = await browser.newPage()
  await page.goto(targetUrl)
 const titles = await page.$$eval('.col-sm-4 .stui-vodlist__box a',(ele)=> {
   return ele.map(item => item.getAttribute('title'))
  })
  console.log(titles);
}

toPage()
