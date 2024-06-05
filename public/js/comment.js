document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.querySelector("#comment-form");

  if (commentForm) {
    commentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const commentText = document
        .querySelector('textarea[name="comment_text"]')
        .value.trim();
      const postId = window.location.pathname.split("/").pop(); // Assumes the post ID is the last part of the URL

      if (commentText) {
        const response = await fetch(`/api/comments`, {
          method: "POST",
          body: JSON.stringify({
            comment_text: commentText,
            post_id: postId,
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
