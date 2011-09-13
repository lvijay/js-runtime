A simple JavaScript script for understanding the JavaScript runtime.
It functions as a poor man's JavaScript runtime environment.

I wrote it as a way to understand how node.js works and to answer the
question: is it possible to have a completely single-threaded
implementation of node.js.  The answer, as it turns out, is yes and
the implementation is quite simple.

This script runs in Mozilla's Rhino JavaScript implementation which
can be download at [http://www.mozilla.org/rhino/download.html]().

The code is written for clarity, not efficiency.  It uses no locks and
is single threaded.  Don't write anything CPU intensive because even a
simple `setTimeout` operation uses 100% CPU.

As of this first version, the interpreter quits if there are no more
tasks.

Execution
---------

At the command prompt:

    $ java -jar js.jar -e "load('runtime.js'); load('lib.js'); load('example.js');"

Details
-------

* `runtime.js` - contains the core event loop.  *Really* short.
* `lib.js` - contains a few "libraries" built on top of the runtime.
* `example.js` - a few simple examples that execute in the provided
  runtime using the functions defined in `lib.js`.

License
-------

The code is in public domain.  Do what you will.  As with all other
Free Software licences, it comes with NO WARRANTY.  Use at your own
peril.
