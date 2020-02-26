import { createWriteStream } from "fs";

import { PNG } from "pngjs";

export async function writeImage(path: string, png: PNG) {
    return new Promise((resolve, reject) => {
        png
            .pack()
            .pipe(createWriteStream(path))
            .on("finish", resolve)
            .on("error", reject);
    });
}
