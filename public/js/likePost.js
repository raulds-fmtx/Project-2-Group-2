document.querySelectorAll(".like-btn").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/like/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const { numLikes, liked } = await response.json();
      document.querySelector(`#like-count-${id}`).textContent = `${numLikes} likes`;

      // Toggle button state
      if (liked) {
        event.target.textContent = "Liked";
      } else {
        event.target.textContent = "Like";
      }
    } else {
      alert("Login to leave a like.");
    }
  });
});
