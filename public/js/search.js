$(function () {
    $("#user-search").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/api/users/search-users",
                dataType: "json",
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(data); // Pass the formatted data directly to response
                },
                error: function () {
                    console.error("Error fetching search results.");
                }
            });
        },
        focus: function (event, ui) {
            $("#user-search").val(ui.item.label); // Set the input value to the username
            return false;
        },
        select: function (event, ui) {
            $("#user-search").val(ui.item.label); // Set the input value to the username

            // Display the user card
            var userCard = `
                <div class="card chatCard">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img class="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="User Image" />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-6">${ui.item.label}</p>
                                <button class="button is-primary" id="followBtn">Follow '${ui.item.label}'</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $("#user-cards-container").html(userCard);

            return false;
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {
        // Render each item in the autocomplete dropdown
        return $("<li>")
            .append(`
                <div class="card chatCard">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <img class="is-rounded" src="https://bulma.io/assets/images/placeholders/128x128.png" alt="User Image" />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-6">${item.label}</p>
                                <button class="button is-primary" id="followBtn">Follow '${item.label}'</button>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            .appendTo(ul);
    };
});
