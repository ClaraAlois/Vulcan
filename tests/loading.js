// Remember to offset paths by their parent since we are in ./tests/
const { performance } = xrequire('perf_hooks');
const logger          = xrequire('./managers/LogManager').getInstance();
const Vulcan          = xrequire('./structures/classes/Vulcan');

// Hack connect *dab*
Vulcan.prototype.connect = () => console.log('[DISCORD CONNECT REMOVED DURING LOAD TESTING]');

logger.plain(
`=======================================
  Vulcan Loading Process Test [START]   
=======================================`
);

let t0 = performance.now();
xrequire('./bot.js');

logger.plain(
`=======================================
   Vulcan Loading Process Test [END]   
   Time: ${performance.now() - t0}ms
=======================================`
);
