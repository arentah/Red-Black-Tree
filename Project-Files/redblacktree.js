/**
 * Created by Aren on 10/14/2017.
 */


// Testing if jQuery is functioning properly
// window.onload = function() {
//     if (window.jQuery) {
//         // jQuery is loaded
//         alert("Yeah!");
//     } else {
//         // jQuery is not loaded
//         alert("Doesn't Work");
//     }
// };

$(document).ready(function(){


    $('#insert').on('input', function(){ //insert function
        let text = $('#insert').val();
        let display = $('#output');
        text = parseInt(text, 10); //remove leading zeros
        if(isNaN(text)){ //check if input is not a number
            display.text(0);
        }
        else{
            display.text(text);

        }
    });

});


// window.onload = function () {
//
// };