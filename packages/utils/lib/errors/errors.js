"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarning = void 0;
function logWarning(...args) {
    if (!(typeof process === 'object' && process.env['NEAR_NO_LOGS'])) {
        console.warn(...args);
    }
}
exports.logWarning = logWarning;
