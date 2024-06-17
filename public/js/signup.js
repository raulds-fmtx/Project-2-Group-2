document.getElementById("signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = document.getElementById("signup-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const error = await response.json();
      alert(`Failed to sign up: ${error.message}`);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("An error occurred. Please try again.");
  }
});
