/* This file is loaded via npm script */
const os   = require('os');
const path = require('path');

global.__basedir = path.join(__dirname, '..', '..');

// Rate limits (Discord)
global.RateLimits = { };
global.RateLimits.reactions = 250;

// Absolute path version of node's 'require()'
global.xrequire = (...module) => {
    if (module[0] && module[0].startsWith('.')) {
        return require(path.resolve(...module));
    }

    return require(module[0]);
};

global.xrequire.cache = require.cache;
global.xrequire.main  = require.main;

global.xrequire.resolve = (request, options = null) => {
    if (request.startsWith('.')) {
        return require.resolve(path.resolve(request), options);
    }

    return require.resolve(request, options);
};

global.xrequire.resolve.paths = (request) => {
    if (request.startsWith('.')) {
        return require.resolve.paths(path.resolve(request));
    }

    return require.resolve.paths(request);
};

global.PrintHistory = [];
global.oldLog       = console.log;
global.print        = console.log = function () {
    if (global.PrintHistory > 100) {
        global.PrintHistory = [];
    }

    global.PrintHistory.push([...arguments].join(', '));
    global.oldLog.apply(console, arguments);
};

global.platform  = os.platform();
global.isLinux   = global.platform === 'linux';
global.isWindows = global.platform === 'win32';

global.extendPrototype = (prototype, propertyName, value) => {
    // Being explicit
    Object.defineProperty(prototype, propertyName, {
        enumerable  : false,
        configurable: false,
        writable    : false,
        value
    });
};

