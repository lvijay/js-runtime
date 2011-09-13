/**
 * io-example.js - test the IO handler.
 *
 * Released in public domain.  Do what you will.  As with all other
 * Free Software projects, this comes with NO WARRANTY.  Use at your
 * own peril.
 */
load('../runtime.js');
load('../io.js');
load('../lib.js');

runtime.readFile('io-example.js', function(err, data) {
  if (err) {
    print(err);
    return;
  }

  print(data);
});

runtime.start();

/* io-example.js ends here */
