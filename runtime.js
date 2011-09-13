/**
 * runtime.js - implements a simple, single-threaded JavaScript
 * environment in JavaScript.
 *
 * Released in public domain.  Do what you will.  As with all other
 * Free Software projects, this comes with NO WARRANTY.  Use at your
 * own peril.
 */
var runtime = {};

(function(runtime) {
  var queue = new java.util.concurrent.LinkedBlockingQueue();
  
  var executor = function(executor, queue) {
    while (true) {
      if (queue.isEmpty()) {
        // all tasks completed
        break;
      }

      var task = queue.take();

      if (typeof task === 'function') {
        try { task.call(task); } catch (e) {}
      }
    }
  };

  runtime.start = function() {
    executor.call(runtime, executor, queue);
  };

  runtime.addTask = function(task) {
    queue.offer(task);
  };
})(runtime);

/* runtime.js ends here */
