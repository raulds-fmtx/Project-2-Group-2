document.querySelector("#new-post-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("title", document.querySelector("#post-title").value.trim());
  formData.append("content", document.querySelector("#post-content").value.trim());
  formData.append("image", document.querySelector("#post-image").files[0]);

  const response = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to create post");
  }
});

const fileInput = document.querySelector("#file-js input[type=file]");
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector("#file-js .file-name");
    fileName.textContent = fileInput.files[0].name;
  }
};
