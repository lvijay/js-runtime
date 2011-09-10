A simple JavaScript script for understanding the JavaScript runtime.
It serves as a poor man's JavaScript runtime environment.

This script runs in Mozilla's Rhino JavaScript implementation which
can be download at [http://www.mozilla.org/rhino/download.html]().

The implementation is inefficient and that's to keep it simple.  It
uses no locks and exactly 2 primitives from the native environment:
[java.lang.Thread#yield][1] and [java.io.PrintStream#println][2].

As of this first version, the interpreter quits if there are no tasks
left to perform.

[1]: http://download.oracle.com/javase/6/docs/api/java/lang/Thread.html#yield()
[2]: http://download.oracle.com/javase/6/docs/api/java/io/PrintStream.html#println(java.lang.Object)

Execution
---------

At the command prompt, do:

    $ java -jar js.jar runtime.js
