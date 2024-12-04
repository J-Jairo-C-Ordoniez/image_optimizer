import fse from "fs-extra";
import imagemin from "imagemin";
import imageminGifSide from "imagemin-gifsicle";
import imageminJpegTran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";


let inputFolder = "img_opt/src";
let outputFolder = "img_opt/opt"
let targetWidth = 1920

async function processImg() {
    try {
        let files = await fse.readdir(inputFolder)
        for (const file of files) {
            let inputPath = `${inputFolder}/${file}`
            let outputPath = `${outputFolder}/${file}`
            await sharp(inputPath).resize(targetWidth).toFile(outputPath)
            await imagemin([outputPath], {
                destination: outputFolder,
                pluggins: [
                    imageminGifSide(),
                    imageminJpegTran(),
                    imageminPngquant(),
                    imageminSvgo(),
                    imageminWebp({quality: 80})
                ]
            })
        }
        console.log('Terminamos la optimización')
    } catch (error) {
        console.log(error)
    }
}

processImg()