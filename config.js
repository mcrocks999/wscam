/**
 * @name Port
 * @description Port to serve web server on
 * @default 3000
 */
const port = 3000;

/**
 * @name WebRoot
 * @description Web root on ExpressJS
 * @default /
 */
const webroot = '/';

/**
 * @name Interval
 * @description Interval at which to capture an image
 * @default 4000
 */
const interval = 4000;

module.exports = { port, webroot, interval };