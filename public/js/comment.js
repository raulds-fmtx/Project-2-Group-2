document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.querySelector("#comment-form");

  if (commentForm) {
    commentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const commentText = document.querySelector("#comment-text").value.trim();
      const postId = window.location.toString().split("/").pop();

      if (commentText) {

        const response = await fetch(`/api/comments`, {
          method: "POST",
          body: JSON.stringify({
            post_id: postId,
            comment_text: commentText,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          document.location.reload();
        } else {
          alert("Failed to add comment.");
        }
      }
    });
  }
});
