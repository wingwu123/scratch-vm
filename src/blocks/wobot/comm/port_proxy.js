
const Cast = require('../../../util/cast');
const MathUtil = require('../../../util/math-util');
const Timer = require('../../../util/timer');

class PortProxy {
    constructor (channel) {

        this.channel = channel;
        this.data = null;
        this.wirteCount = 0;
        this.readCount = 0;
    }

    setChannel(channel) {
        this.channel = channel;
        console.info("PortProxy setChannel ");
    }

    wirte (cmd) {
        console.info("PortProxy wirte ", this.wirteCount++);
        let timer = new Timer();
        timer.start();
        let done = false;

        this.channel.wirte(cmd).then(() =>{
            done = true;
            console.info("PortProxy wirte done ", done, timer.timeElapsed());
        })
        .catch(err => {
            done = true;
            console.info("PortProxy wirte done ", done, err);
        });
        
        while(!done && timer.timeElapsed() < 200){

        }

        console.info("PortProxy wirte done ", done, timer.timeElapsed());
    }

    request(cmd, timeout = 0, util = null) {
        
        if(!!util && timeout > 0) {
            if(this.waitFirst(util)) {
                this.wirte(cmd);
                this.beginWait(timeout, util);
            }
            else{
                let data = this.waitRespones(util);
                return data;
            }
        }
        else{
            this.wirte(cmd);
        }

        return null;
    }

    hasData() {
        return this.channel.hasData;
    }

    getData() {
        let data = this.channel.getData();
        console.info("PortProxy getData ", data, this.readCount++);
        return data;
    }

    waitFirst(util) {
        let ret = typeof(util.stackFrame.timer) == "undefined";
        console.info("waitFirst", util.stackFrame.timer, ret);
        return ret;
    }

    beginWait(duration, util) {
        util.stackFrame.timer = new Timer();
        util.stackFrame.timer.start();
        util.stackFrame.duration = duration;
        util.yield();
    }

    waitRespones(util) {

        const timeElapsed = util.stackFrame.timer.timeElapsed();
        if (timeElapsed < util.stackFrame.duration) {
            if (this.hasData()) {
                util.stackFrame.duration = 0;
                return this.getData();
            }

            util.yield();
        }

        return null;
    }

}

let portProxy = new PortProxy();

module.exports = portProxy;
