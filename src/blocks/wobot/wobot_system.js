
const Commands = require('./comm/commands');
const PortProxy = require('./comm/port_proxy.js');


class WobotSystem {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            motion_more: () => {}
        };
    }

    /**
     * 停止模块
     */
    stop_module(moduleId){
        let data = Commands.stop_module(moduleId);
        let ret = PortProxy.request(data);
    }

}

module.exports = WobotSystem;
