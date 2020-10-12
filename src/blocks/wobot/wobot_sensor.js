const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const Timer = require('../../util/timer');
const Commands = require('./comm/commands');
const PortProxy = require('./comm/port_proxy.js');


class WobotSensorBlocks {
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
            sensing_touch_button: this.touch_button,

            sensing_gray_detected_line: this.gray_detected_line,
            sensing_gray_value: this.gray_value,
            sensing_flame_value: this.flame_value,
            sensing_temperature_value: this.temperature_value,
            sensing_humidity_value: this.humidity_value,
            sensing_volume_value: this.volume_value,
            sensing_ambient_light_value: this.ambient_light_value,

            sensing_ultrasonic_detection_distance: this.ultrasonic_detection_distance,
            sensing_gas_pressure: this.gas_pressure,
            
            sensing_infrared_receiver: this.infrared_receiver,
            sensing_infrared: this.infrared_value,
            sensing_potentiometer: this.potentiometer,
            sensing_bluetooth_receiver: this.bluetooth_receiver,
            sensing_bluetooth_stick: this.bluetooth_stick,
            sensing_jointed_arm: this.jointed_arm,
            sensing_key_button: this.key_button,
            sensing_gyroscope: this.gyroscope,
            sensing_limit_switch: this.limit_switch,
            sensing_water_temperature: this.water_temperature,
            sensing_analog_input:this.analog_input,

            motion_more: () => {}
        };
    }

    /**
     * 单灰度检测到(黑|白)线
     */
    gray_detected_line(args, util){
        let data = Commands.gray_detected_line(args.PORT, args.LINE);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueBool(ret);
            return value;
        }
    }

    //获取单灰度传感器数值
    gray_value(args, util){
        let data =  Commands.gray_value(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }

    //获取火焰传感器数值
    flame_value(args, util){
        let data =  Commands.flame_value(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }

    //获取温度传感器数值
    temperature_value(args, util){
        let data =  Commands.temperature_value(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }

    //获取湿度传感器数值
    humidity_value(args, util){
        let data =  Commands.humidity_value(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }

    //获取声音传感器数值
    volume_value(args, util) {

        let data =  Commands.volume_value(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }

    //获取环境光传感器数值
    ambient_light_value(args, util) {
        let data =  Commands.ambient_light_value(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }

    //获取超声传感器检测距离
    ultrasonic_detection_distance(args, util) {
        let data =  Commands.ultrasonic_detection_distance(args.PORT);
        let ret = PortProxy.request(data, 200, util);

        if(ret != null)
        {
            let value = Commands.getValueFloat(ret);
            return value;
        }
    }

    //获取气压传感器数值
    gas_pressure(args, util) {
        let data =  Commands.gas_pressure(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    //红外接收器
    infrared_receiver(args, util) {
        let data =  Commands.infrared_receiver(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    //红外传感器
    infrared_value(args, util) {
        let data =  Commands.infrared_value(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    //电位器
    potentiometer(args, util) {
        let data =  Commands.potentiometer(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    ///蓝牙接收器
    bluetooth_receiver(args, util) {
        let data =  Commands.bluetooth_receiver();
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    ///蓝牙摇杆
    bluetooth_stick(args, util) {
        let data =  Commands.bluetooth_stick(args.KEY);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    //摇杆
    jointed_arm(args, util) {
        let data =  Commands.jointed_arm(args.PORT, args.AXIS);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    //触摸开关
    touch_button(args, util) {
        let data =  Commands.touch_button(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueBool(ret);
            return value;
        }
    }
    //按键开关
    key_button(args, util) {
        let data =  Commands.key_button(args.PORT, args.KEY);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueBool(ret);
            return value;
        }
    }
    //陀螺仪
    gyroscope(args, util) {
        let data =  Commands.gyroscope(args.PORT, args.AXIS);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }

    //限位开关
    limit_switch(args, util) {
        let data =  Commands.limit_switch(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueBool(ret);
            return value;
        }
    }
    //水温传感器
    water_temperature(args, util) {
        let data =  Commands.water_temperature(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
    //模拟输入
    analog_input(args, util) {
        let data =  Commands.analog_input(args.PORT);
        let ret = PortProxy.request(data, 200, util);
        if(ret != null)
        {
            let value = Commands.getValueInt32(ret);
            return value;
        }
    }
}

module.exports = WobotSensorBlocks;
