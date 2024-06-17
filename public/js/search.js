$(document).ready(function () {
  $("#user-search").autocomplete({
    source: "/api/users/search",
    minLength: 2,
    select: function (event, ui) {
      window.location.href = `/user/${ui.item.value}`;
    },
  });
});
