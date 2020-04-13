const http = require('http');

/**
 * Send a list of files to analyze to the ml server. The server
 * should respond with the total number of events that occurred.
 * @param {Object} fileData   The array of filenames and the directory they are located
 * @returns {Promise<string>}
 */
exports.postFileNames = (fileData) => {
  return new Promise(((resolve, reject) => {
    const timestamp = new Date(
      fileData.filenames[0].substring(
        fileData.dir.length + 7, fileData.filenames[0].length - 4
      )
    );
    const req = http.request({
      host: process.env.ML_HOST,
      port: process.env.ML_PORT,
      path: '/',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }, res => {
      if (res.statusCode !== 200) {
        reject(res);
      } else {
        res.on('data', event => {
          resolve({ event, timestamp });
        });
      }
    });

    req.on('error', err => {
      reject(err);
    });

    req.write(JSON.stringify(fileData.filenames));
    req.end();
  }));
};
