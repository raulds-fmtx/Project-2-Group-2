document.querySelectorAll(".edit-post-btn").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-id");
    const title = prompt("Enter new title");
    const content = prompt("Enter new content");

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to update post.");
      }
    }
  });
});
