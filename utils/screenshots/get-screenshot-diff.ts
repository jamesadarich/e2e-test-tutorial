

import { exists, mkdir } from "fs";

import pixelmatch from "pixelmatch";
import { Page } from "puppeteer";
import { PNG } from "pngjs";

import { loadImage } from "./load-image";
import { writeImage } from "./write-image";

async function pathExists(path: string) {
    return new Promise(resolve => {
        exists(path, resolve);
    });
}

async function createDirectory(path: string) {
    return new Promise(resolve => {
        mkdir(path, resolve);
    });
}

export async function getScreenshotDiff(page: Page, pageName: string) {
    const paths = pageName.split("/");
    paths.pop();
    const pagePath = paths.join("/");

    if (await pathExists(pagePath) === false) {
        await createDirectory(pagePath);
    }

    await page.screenshot({
        path: `${pageName}.actual.png`,
        fullPage: true
    });

    const actualPng = await loadImage(`${pageName}.actual.png`);
    const expectedPng = await loadImage(`${pageName}.expected.png`);

    const diffPng = new PNG({
        width: expectedPng.width,
        height: expectedPng.height
    });

    const diffPixels = pixelmatch(
        expectedPng.data,
        actualPng.data,
        diffPng.data,
        expectedPng.width,
        expectedPng.height,
        { threshold: 0.1 }
    );

    await writeImage(`${pageName}.diff.png`, diffPng);

    return {
        percentageDiff: diffPixels / (expectedPng.height * expectedPng.width)
    };
}
