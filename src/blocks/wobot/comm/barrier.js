"use strict";
exports.__esModule = true;
exports.Barrier = void 0;
var Barrier = /** @class */ (function () {
    function Barrier() {
        var _this = this;
        this._isOpen = false;
        this._promise = new Promise(function (c, e) {
            _this._completePromise = c;
        });
    }
    Barrier.prototype.isOpen = function () {
        return this._isOpen;
    };
    Barrier.prototype.open = function () {
        this._isOpen = true;
        this._completePromise(true);
    };
    Barrier.prototype.wait = function () {
        return this._promise;
    };
    return Barrier;
}());
exports.Barrier = Barrier;
