const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const Timer = require('../../util/timer');
const Commands = require('./comm/commands');
const PortProxy = require('./comm/port_proxy.js');


class WobotLooksBlocks {
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
            looks_set_emotion: this.set_emotion,
            looks_off_emotion: this.off_emotion,
            looks_set_symbol: this.set_symbol,
            looks_custom_led_matrix: this.set_symbol_cust,
            looks_off_led_matrix: this.off_led_matrix,
            looks_set_digital_tube: this.set_digital_tube,
            looks_clear_digital_tube: this.clear_digital_tube,
            looks_set_led_light_rgb: this.set_led_light_rgb,

            looks_set_led_light_color: this.set_led_light_color,
            looks_off_led_light: this.off_led_light,

            looks_integrated_led: this.set_Integrated_led,
            looks_led_strip: this.set_led_strip,

            motion_more: () => {}
        };
    }

    /**
     * 设置情感屏
     */
    set_emotion(args, util){
        let data = Commands.set_emotion(args.EMOTION_ID, args.LEFT_PORT, args.RIGHT_PORT);
        PortProxy.request(data);
    }

    //关闭情感屏
    off_emotion(args, util){
        let data =  Commands.off_emotion(args.LEFT_PORT, args.RIGHT_PORT);
        PortProxy.request(data);
    }

    //设置情感屏 符号
    set_symbol(args, util){
        let data =  Commands.set_symbol(args.SYMBOL, args.PORT);
        PortProxy.request(data);
    }

    matrixConvert(matrix) {
        if (!matrix || typeof matrix != 'string') {
            matrix = '';
        }
        while (matrix.length < 64) {
            matrix += '0';
        }

        let rows = [];
        let from = 0;
        while (from < 64) {
            rows.push(matrix.substr(from, 8));
            from += 8;
        }

        let rets = [];
        let mask = 1;
        let val = 0;

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            val = 0;
            mask = 1;
            for (let col = row.length - 1; col >= 0; col--) {
                val = val | (row[col] == '0' ? 0 : mask);
                mask *= 2;
            }
            rets.push(val);
        }

        return rets;
    }

    //自定义情感屏
    set_symbol_cust(args, util){
        let dataArray = this.matrixConvert(args.MATRIX);
        let data =  Commands.set_symbol_cust(args.PORT, dataArray);
        PortProxy.request(data);
    }

    //关闭情感屏
    off_led_matrix(args, util){
        let data =  Commands.off_led_matrix(args.PORT);
        PortProxy.request(data);
    }

    //设置数码管
    set_digital_tube(args, util) {

        let data =  Commands.set_digital_tube(args.PORT, args.VALUE);
        PortProxy.request(data);
    }

    //清空数码管
    clear_digital_tube(args, util) {
        let data =  Commands.clear_digital_tube(args.PORT, args.STATUS);
        PortProxy.request(data);
    }

    // 设置LED RGB
    set_led_light_rgb(args, util) {
        let data =  Commands.set_led_light_rgb(args.PORT,args.R, args.G, args.B);
        PortProxy.request(data);
    }

    // 设置LED 颜色
    set_led_light_color(args, util) {
        let data =  Commands.set_led_light_color(args.PORT, args.COLOR);
        PortProxy.request(data);
    }
    // 关闭LED
    off_led_light(args, util) {
        let data =  Commands.off_led_light(args.PORT);
        PortProxy.request(data);
    }
    // 设置集成LED 灯
    set_Integrated_led(args, util) {
        let data =  Commands.set_Integrated_led(args.PORT, args.LED_ID,args.R, args.G, args.B);
        PortProxy.request(data);
    }
    
    // 设置LED灯带
    set_led_strip(args, util) {
        let data =  Commands.set_led_strip(args.PORT, args.LED_ID,args.R, args.G, args.B);
        PortProxy.request(data);
    }
}

module.exports = WobotLooksBlocks;
