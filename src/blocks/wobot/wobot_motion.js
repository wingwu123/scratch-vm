const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const Timer = require('../../util/timer');
const Commands = require('./comm/commands');
const PortProxy = require('./comm/port_proxy.js');


class WobotMotionBlocks {
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
            motion_set_encoder_motor: this.set_encoder_motor,
            motion_set_dc_motor: this.set_dc_motor,
            motion_smart_servo_angle: this.set_smart_servo_angle,
            motion_smart_servo: this.set_smart_servo,
            motion_servo: this.set_servo,
            motion_step_motor: this.set_step_motor,
            motion_set_electromagnet: this.set_electromagnet,
            motion_set_digital_output: this.set_digital_output,
            motion_more: () => {}
        };
    }

    /**
     * 
     */
    set_encoder_motor(args, util){
        let data = Commands.set_encoder_motor(args.MOTOR_ID, args.PORT, args.POWER);
        PortProxy.request(data);
    }

    set_dc_motor(args, util){
        let data =  Commands.set_dc_motor(args.MOTOR_ID, args.PORT, args.POWER);
        PortProxy.request(data);
    }

    //设置智能舵机角度
    set_smart_servo_angle(args, util){
        let data =  Commands.set_smart_servo_angle(args.SERVO_ID, args.SPEED, args.ANGLE);
        PortProxy.request(data);
    }

    //设置智能舵机速度
    set_smart_servo(args, util){
        let data =  Commands.set_smart_servo(args.SERVO_ID, args.SPEED);
        PortProxy.request(data);
    }

    //设置舵机
    set_servo(args, util){
        let data =  Commands.set_servo(args.SERVO_PORT, args.SPEED, args.ANGLE);
        PortProxy.request(data);
    }

    //设置步进电机
    set_step_motor(args, util) {

        let data =  Commands.set_step_motor(args.PORT, args.POWER, args.STEPS);
        PortProxy.request(data);
    }

    //设置电磁铁
    set_electromagnet(args, util) {
        let data =  Commands.set_electromagnet(args.PORT, args.STATUS);
        PortProxy.request(data);
    }

    //设置数字输出
    set_digital_output(args, util) {
        let data =  Commands.set_digital_output(args.PORT, args.STATUS);
        PortProxy.request(data);
    }
}

module.exports = WobotMotionBlocks;
