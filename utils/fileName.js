document.addEventListener('DOMContentLoaded', (event) => {

  const fileInput = document.querySelector("#file-js input[type=file]");
  if (fileInput) {
    fileInput.onchange = () => {
      console.log("File input changed");

      if (fileInput.files.length > 0) {
        const fileName = document.querySelector("#file-js .file-name");
        if (fileName) {
          fileName.textContent = fileInput.files[0].name;
          console.log("File name updated to: " + fileInput.files[0].name);
        } else {
          console.error("File name element not found");
        }
      }
    };
  } else {
    console.error("File input not found");
  }
});
