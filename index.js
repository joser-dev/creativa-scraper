const { chromium } = require('playwright');
const websites = require('./websites.json');
const yargsOptions = require('./config/yargs');
const yargs = require('yargs');

yargs.command(yargsOptions);


async function takeScreenshot(page, { fileName, width, height } ) {
    await page.setViewportSize({ width, height, deviceScaleFactor : 1 });
    await page.screenshot({path: `screenshots/${width}x${height}/${fileName}.jpeg`});
}

chromium.launch().then(async browser => {
    const page = await browser.newPage();
    await page.setDefaultTimeout(0);
    const brokeLinks = [];
    for (const ws of websites) {
        try {
            await page.goto(ws.url);
            await page.waitForTimeout(1000);
            await takeScreenshot(page, {
                fileName: `${ws.name}`,
                width: yargs.argv.vw,
                height: yargs.argv.vh
            });
        } catch (error) {
            brokeLinks.push({ name: ws.name, url: ws.url });
            console.log(error);
        }
    }
    await browser.close();
    console.table(brokeLinks);
});