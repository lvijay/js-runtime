/**
 * runtime.js - implements a simple, single-threaded JavaScript
 * environment in JavaScript.
 *
 * Released in public domain.  Do what you will.  As with all other
 * Free Software projects, this comes with NO WARRANTY.  Use at your
 * own peril.
 */
var context = {};

(function(who) {
  var queue = [];
  
  var setTimeout = function(task, timeout) {
    var now = new Date().getTime();
    var end = now + timeout;

    var self = function() {
      var now = new Date().getTime();
      if (now >= end) {
        queue.push(task);
      } else {
        java.lang.Thread.currentThread().yield();
        queue.push(self);
      }
    };

    queue.push(self);
  };

  var executor = function(executor, queue) {
    while (true) {
      if (queue.length === 0) {
        // all tasks completed
        break;
      }

      var task = queue.shift();

      if (typeof task === 'function') {
        try { task.call(who) } catch (e) {}
      }
    }
  };

  who.start = function() {
    console.log('starting...');
    executor.call(who, executor, queue);
  };

  who.setTimeout = setTimeout;
})(context);

// Define this because Rhino doesn't
this.console = {log: function(x) {java.lang.System.out.println(x);}};

this.setTimeout = context.setTimeout;

// example code
context.setTimeout(function() {
  setTimeout(function() {
    console.log('started earlier, finished later');
  }, 2000);
  setTimeout(function() {
    console.log('started later, finished earlier');
  }, 1000);
}, 100);

// start the interpreter
context.start();

/* runtime.js ends here */
