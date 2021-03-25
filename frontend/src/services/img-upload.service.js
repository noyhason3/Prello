import axios from 'axios';



// AXIOS
export const uploadImg = async (file) => {
    // Defining our variables
    const UPLOAD_PRESET = 'ifat-unsigned' // Insert yours
    const CLOUD_NAME = 'ifats-cloud' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', file)
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    console.log('uploadImg -> FORM_DATA', FORM_DATA)
    // Sending a post method request to Cloudniarys' API
    try {
        const res = await axios.post(UPLOAD_URL, FORM_DATA)
        return res.data;
    } catch (err) {
        console.error('ERROR!', err)
    }
}

export const getImgColors = async (selector) => {
    const element = document.querySelector(selector)
    element.addEventListener('load', () => {
        var colors = getColors(draw(element))
        console.log(colors)
        return colors

    })
}

function draw(img) {
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas)
    var c = canvas.getContext('2d');
    c.width = canvas.width = img.width;
    c.height = canvas.height = img.height;
    c.clearRect(0, 0, c.width, c.height);
    c.drawImage(img, 0, 0, img.width, img.height);
    return c; // returns the context
}

// returns a map counting the frequency of each color
// in the image on the canvas
function getColors(c) {
    var col, colors = {};
    var pixels, r, g, b, a;
    r = g = b = a = 0;
    pixels = c.getImageData(0, 0, c.width, c.height);
    for (var i = 0, data = pixels.data; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3]; // alpha
        // skip pixels >50% transparent
        if (a < (255 / 2))
            continue;
        col = rgbToHex(r, g, b);
        if (!colors[col])
            colors[col] = 0;
        colors[col]++;
    }
    return colors;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}