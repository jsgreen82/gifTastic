/*Before you can make any part of our site work, you need to create an array of strings, 
each one related to a topic that interests you. Save it to a variable called topics. 

Your app should take the topics in this array and create buttons in your HTML.

Try using a loop that appends a button for each string in the array.

When the user clicks on a button, the page should grab 10 static, 
non-animated gif images from the GIPHY API and place them on the page. 

When the user clicks one of the still GIPHY images, the gif should animate. 
If the user clicks the gif again, it should stop playing.

Under every gif, display its rating (PG, G, so on). 

This data is provided by the GIPHY API.
Only once you get images displaying with button presses should you move on to the next step.

Add a form to your page takes the value from a user input box and adds it into your topics array. 
Then make a function call that takes each topic in the array remakes the buttons on the page.*/

//Initial array of topics
var topics = ["baseball", "hiking", "reading", "legos", "comedy", "true crime"];

// Looping through the array of topics
  function renderButtons() {
     $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {

          // dynamicaly generate buttons for each topic in the array
          var a = $("<button>");
          // Adding a class of gif to our button
          a.addClass("gif");
          // Adding a data-attribute
          a.attr("data-gif", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
}
        // This function handles events where a button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding input from the textbox to our array
        topics.push(gif);
    $("#gif-form").trigger("reset");
        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
      });


      // Adding a click event listener to all elements with a class of "gif"
      $(document).on("click", ".gif", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    
    $(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
  
  });

function displayGifInfo() {
var gif = $(this).attr("data-gif");
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8xqPt5eVMwfbO21qGs3GoxcwdSTUlXGC&q=" + gif + "&limit=10&offset=0&rating=PG&lang=en";

  // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
       // erasing anything in this div id so that it doesnt keep any from the previous click
      //$("#gif-view").empty();
        var results = response.data; 
        
        for (var i=0; i < results.length; i++){
      //div for the gifs to go into
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            var gifImage = $("<img>");
      // still image stored into src of image
            gifImage.attr("src", results[i].images.fixed_height_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
           
       // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
     // adding div of gifs to gifsView div
            $("#gif-view").prepend(gifDiv);
        }
    
    });

        };