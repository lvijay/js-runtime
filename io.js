/**
 * io.js - simple IO handler.
 *
 * Released in public domain.  Do what you will.  As with all other
 * Free Software projects, this comes with NO WARRANTY.  Use at your
 * own peril.
 */
(function(runtime) {
  /**
   * Read a file and invoke callback.
   *
   * @param filename - file string description.
   * @param callback - a two argument function(err, data).  err is
   *                   non-null if there was an error, data is the
   *                   file contents.
   */
  var readFile = function(filename, callback) {
    if (!callback) return;
    var isRunning = new java.util.concurrent.atomic.AtomicBoolean(true);
    var run = function() {
      try {
        var fin = new java.io.FileInputStream(new java.io.File(filename));
        var out = new java.io.ByteArrayOutputStream();
        var data;

        while ((data = (fin.read())) >= 0) {
          out.write(data);
        }

        var contents = new java.lang.String(out.toByteArray());

        runtime.addTask(function() {
          callback(null, contents);
        });
      } catch (e) {
        runtime.addTask(function() {callback(e);});
      } finally {
        isRunning.set(false);
      }
    };

    // keep the event loop alive while this runs
    var task = function() {
      if (isRunning.get()) {
        java.lang.Thread.yield();
        runtime.addTask(task);
      }
    };

    var t = new java.lang.Thread(run);
    t.setDaemon(true);
    t.start();

    runtime.addTask(task);
  };

  runtime.readFile = readFile;
})(runtime);

/* io.js ends here */
