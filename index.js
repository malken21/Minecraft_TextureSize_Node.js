const path = require('path');

const fe = require("./file");

const dirPath = path.resolve(__dirname, 'textures');
const fileList = fe.listFiles(dirPath);

console.log(dirPath);

const { size } = require("./Config.json");


const sharp = require('sharp');

fileList.forEach(async file => {
    if (!file.endsWith(".png")) return;

    const buffer = await sharp(file).toBuffer();

    const image = sharp(buffer);
    image.resize(size, null);

    image.toFile(file)
        .then(info => console.log(info))
        .catch(error => console.log(error));
});