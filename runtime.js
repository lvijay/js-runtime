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
  
  var executor = function(executor, queue) {
    while (true) {
      if (queue.length === 0) {
        // all tasks completed
        break;
      }

      var task = queue.shift();

      if (typeof task === 'function') {
        try { task.call(task); } catch (e) {}
      }
    }
  };

  who.start = function() {
    executor.call(who, executor, queue);
  };

  who.addTask = function(task) {
    queue.push(task);
  };
})(context);

// Define a simple logging utility
console = {
  log: function(x) {
    context.addTask(function() {
      print(x);
    });
  }};

// define a setTimeout utility
function setTimeout(task, timeout) {
  var now = new Date().getTime();
  var end = now + timeout;
  var cancelled = false;

  var self = function() {
    var now = new Date().getTime();
    if (now >= end) {
      context.addTask(task);
    } else {
      if (cancelled) return;
      java.lang.Thread.currentThread().yield();
      context.addTask(self);
    }
  };

  context.addTask(self);

  return {
    cancel: function() {cancelled = true;}
  };
};

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
context.start();

/* runtime.js ends here */
