//Start Buttons 
var startButtons = ["cars", "party", "sunrise", "mario", "battle ship", "cats"];

//console.log(startButtons);

//API function with get method 
function displayGifInfo(){

    var x = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=nGRHI520AT1WFvkqme8BAaFebF4OYIiA&limit=10";

    //AJAX get method
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .done(function(response) {

    //console.log("logging");
    //console.log(response.data);

    var results = response.data;
    //loop for amount of gifs
    for (var i = 0; i < results.length; i++){
        //Placing Varibles 
        var rating = results[i].rating;
        var p = $("<p>").text("Rating " + rating);
        var gifDiv = $("<div class='gifs'>");
        var image = $("<img>");
        //Gif Images
        image.attr({
            "src": results[i].images.fixed_height.url,
            "data-still": results[i].images.fixed_height_still.url,
            "data-animate": results[i].images.fixed_height.url,
            
            
            
        })
        //append and prepend 
        gifDiv.append(image);
        gifDiv.append(p);
        $("#gif-dump").prepend(gifDiv);
    };
    });
};
//generate buttons for list
function renderButtons() {
    $("#button-form").empty();
    for ( var j = 0; j < startButtons.length; j++) {
            var a = $("<button>");
            a.addClass("gif-btn")
            a.attr("data-name", startButtons[j]);
            a.text(startButtons[j]);
            $("#button-form").append(a);

    }
}
//user text input on click
$("#userSubmit").on("click", function(event){
    event.preventDefault();
    var gif = $("#userText").val().trim();
    startButtons.push(gif);
    renderButtons();

});

//buttons on click
$(document).on("click", ".gif-btn", displayGifInfo);
renderButtons();


//gif on click for pause and play
$(document).on("click", "img", function(){
    var state = $(this).attr("data-state");
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }
});



