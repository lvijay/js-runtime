/**
 * lib.js - some basic libraries built on top of runtime.js.
 *
 * Released in public domain.  Do what you will.  As with all other
 * Free Software projects, this comes with NO WARRANTY.  Use at your
 * own peril.
 */
(function(runtime) {
  // A simple logging utility
  var console = {
    log: function(x) {
      runtime.addTask(function() {
        print(x);
      });
    }
  };

  // a cancellable timer
  var setTimeout = function(task, timeout) {
    var now = new Date().getTime();
    var end = now + timeout;
    var cancelled = false;

    var self = function() {
      var now = new Date().getTime();
      if (now >= end) {
        runtime.addTask(task);
      } else {
        if (cancelled) return;
        java.lang.Thread.currentThread().yield();
        runtime.addTask(self);
      }
    };

    runtime.addTask(self);

    return {
      cancel: function() {cancelled = true;}
    };
  };

  runtime.console = console;
  runtime.setTimeout = setTimeout;
})(runtime);

/* lib.js ends here */
