A simple JavaScript script for understanding the JavaScript runtime.
It functions as a poor man's JavaScript runtime environment.

I wrote it as a way to understand how node.js works and to answer the
question: is it possible to have a completely single-threaded
implementation of node.js.  The answer, as it turns out, is yes and
the implementation is quite simple.

This script runs in Mozilla's Rhino JavaScript implementation which
can be download at [http://www.mozilla.org/rhino/download.html]().
Extract the file `js.jar` from the downloaded archive.  `js.jar`
contains the JavaScript interpreter.

The code is written for clarity, not efficiency.  <strike>It uses no
locks and is single threaded.</strike> The API provides no locks and
the event loop execution is single-threaded.  Don't write anything CPU
intensive because even a simple `setTimeout` operation uses 100% CPU.

As of this version, the interpreter quits if there are no more tasks.

Execution
---------

At the command prompt:

    $ java -jar js.jar -e "load('runtime.js'); load('lib.js'); load('example.js');"

Details
-------

* `runtime.js` - contains the core event loop.  _Really_ short.
* `lib.js` - contains a few "libraries" built on top of the runtime.
* `io.js` - provides an api to read a file.  Tested for text files.
* `test/example.js` - a few simple examples that execute in the
  provided runtime using the functions defined in `lib.js`.
* `test/io-example.js` - test file for `io.js`.  Prints its own
  contents to the terminal.

License
-------

The code is in public domain.  Do what you will.  As with all other
Free Software licences, it comes with NO WARRANTY.  Use at your own
peril.
