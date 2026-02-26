$( "#clickme" ).on( "click", function() {
  $( "#book" ).animate({
    opacity: 0.25,
    left: "+=50",
    height: "toggle"
  }, 5000, function() {
    // Animation complete.
  });
});
$( "p" ).animate({
  height: 200,
  width: 400,
  opacity: 0.5
}, 1000, "linear", function() {
  alert( "all done" );
});