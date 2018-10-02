const puppeteer = require('puppeteer');
var config = require('config');
const {performance} = require('perf_hooks');

async function run () {
    const t0 = performance.now();
    const browser = await puppeteer.launch();
    const t1 = performance.now();
    console.log('browser launch in ' + (t1 - t0) + ' ms');
    const page = await browser.newPage();
    const t2 = performance.now();
    console.log('page launch in ' + (t2 - t1) + ' ms');
    await page.goto(config.get('url'));
    const t3 = performance.now();
    console.log('page open in ' + (t3 - t2) + ' ms');
    await page.screenshot({path: './screenshots/screenshot1.png'});
    console.log('screenshot 1 done');
    var t5 = performance.now();
    try {
        // Will throw err if element is not present and visible.
        await page.waitForSelector("li:nth-child(2)", {
            visible: true
        });
        const t4 = performance.now();
        console.log('page download in ' + (t4 - t3) + ' ms');
        await page.click("li:nth-child(2)");
        t5 = performance.now();
        console.log('page open in ' + (t5 - t4) + ' ms');
    } catch(err) {
        console.log(err);
    }
    await page.screenshot({path: './screenshots/screenshot2.png'});
    console.log('screenshot 2 done');
    var t7 = performance.now();
    try {
        // Will throw err if element is not present and visible.
        await page.waitForSelector("#next", {
            visible: true
        });
        const t6 = performance.now();
        console.log('item page open in ' + (t6 - t5) + ' ms');
        await page.click(".cart-button");
        t7 = performance.now();
        console.log('start item add in ' + (t7 - t6) + ' ms');
    } catch(err) {
        console.log(err);
    }
    var t8 = performance.now();
    try {
        // Will throw err if element is not present and visible.
        await page.waitForSelector(".cart-button.delete", {
            visible: true
        });
        t8 = performance.now();
        console.log('item add in ' + (t8 - t7) + ' ms');
    } catch(err) {
        console.log(err);
    }
    await page.goto(config.get('checkout'));
    const t9 = performance.now();
    console.log('item add in ' + (t9 - t8) + ' ms');
    await page.screenshot({path: './screenshots/screenshot3.png'});
    console.log('screenshot 3 done');
    browser.close();
    console.log('browser close');
}
run();