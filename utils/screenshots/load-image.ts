import { createReadStream } from "fs";

import { PNG } from "pngjs";

export async function loadImage(path: string) {

    return new Promise<PNG>((resolve, reject) => {
        const stream = createReadStream(path);

        const png = stream.pipe(new PNG());

        png.on("parsed", () => { resolve(png); stream.close(); });
        png.on("error", () => { reject(); stream.close(); });
        png.on("close", () => { stream.close(); });
    });
}
