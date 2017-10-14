/**
 * Created by Aren on 10/14/2017.
 */

console.log("Hello World!");

window.onload = function() {
    if (window.jQuery) {
        // jQuery is loaded
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
};

