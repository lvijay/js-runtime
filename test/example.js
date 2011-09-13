(function(runtime) {
  var setTimeout = runtime.setTimeout;
  var console = runtime.console;
  
  // example code
  setTimeout(function() {
    var timer = setTimeout(function() {
      console.log('you will never see this');
    }, 2000);
    setTimeout(function() {
      console.log('started earlier, finished later');
      timer.cancel();
    }, 1500);
    setTimeout(function() {
      console.log('started later, finished earlier');
    }, 1000);
  }, 100);

  // start the interpreter
  runtime.start();
})(runtime);

/* example.js ends here*/
