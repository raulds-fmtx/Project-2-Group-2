document.getElementById("add-post-btn").addEventListener("click", async () => {
  const title = prompt("Enter post title");
  const content = prompt("Enter post content");

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to add post.");
    }
  }
});
