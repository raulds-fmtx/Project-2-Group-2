const fs = require("fs");
const path = require("path");

const deleteFile = (filePath) => {
  console.log(__dirname);
  fs.unlink(path.join(__dirname, "..", filePath), (err) => {
    if (err) {
      console.error(`Failed to delete file: ${filePath}`, err);
    } else {
      console.log(`Successfully deleted file: ${filePath}`);
    }
  });
};

module.exports = deleteFile;
