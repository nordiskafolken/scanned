const http = require('http');
const fs = require('fs');

function saveFile (url, imagePath) {
  const destPath = imagePath.split('.jpg')[0] + '.ocr.txt';
  const file = fs.createWriteStream(destPath);
  const request = http.get(url, response => {
    response.pipe(file);
    console.log('Saved to ' + destPath);
  });
}

function ocrImage (imageData, imagePath) {
  console.log('OCRing...');
  const authBase = new Buffer('jeremykarlsson:AD3CD929-F6F6-44AF-9F93-A915DF635A48').toString('base64');

  // An object of options to indicate where to post to
  var options = {
    host: 'www.ocrwebservice.com',
    port: '80',
    path: '/restservices/processDocument?language=swedish&outputformat=txt',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(imageData),
      'Authorization': `Basic ${authBase}`
    }
  };

  // console.log(options);
  // return;

  // Set up the request
  var request = http.request(options, res => {
    res.on('data', chunk => {
      const data = JSON.parse(chunk);

      if (data.OutputFileUrl) {
        saveFile(data.OutputFileUrl, imagePath);
      } else {
        console.log('An error occured when OCRing ' + imagePath);
        console.log(data.ErrorMessage);
      }
    });
  });

  // post the data
  request.write(imageData);
  request.end();
}

function processImageFile (imagePath) {
  console.log(`Processing ${imagePath}`);

  // This is an async file read
  fs.readFile(imagePath, (err, imageData) => {
    if (err) {
      // If this were just a small part of the application, you would
      // want to handle this differently, maybe throwing an exception
      // for the caller to handle. Since the file is absolutely essential
      // to the program's functionality, we're going to exit with a fatal
      // error instead.
      console.log("FATAL An error occurred trying to read in the file: " + err);
      process.exit(-2);
    }

    // Make sure there's data before we post it
    if (imageData) {
      ocrImage(imageData, imagePath);
    } else {
      console.log("No data to post");
      process.exit(-1);
    }
  });
}

const imagePaths = process.argv.slice(2, process.argv.length);

imagePaths.forEach(imagePath => processImageFile(imagePath));
