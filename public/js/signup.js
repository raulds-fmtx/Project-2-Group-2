document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Create a FormData object from the form
    const formData = new FormData();
    formData.append("username", document.querySelector("#username").value.trim());
    formData.append("password", document.querySelector("#password").value.trim());
    formData.append("image", document.querySelector("#profile_pic").files[0]);

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to sign up");
    }
  });
});

const fileInput = document.querySelector("#profile_pic");
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector(".file-name");
    fileName.textContent = fileInput.files[0].name;
  }
};
