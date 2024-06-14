document.addEventListener("DOMContentLoaded", (event) => {
  const socket = io();
  const room = `private_${Math.min(currentUserId, otherUserId)}_${Math.max(
    currentUserId,
    otherUserId
  )}`;

  socket.emit("join room", room);

  const form = document.getElementById("chat-form");
  const input = document.getElementById("m");
  const messages = document.getElementById("messages");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit("chat message", { room, msg: input.value });
      input.value = "";
    }
  });

  socket.on("chat message", (data) => {
    if (data.room === room) {
      const item = document.createElement("li");
      item.textContent = data.msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
});
