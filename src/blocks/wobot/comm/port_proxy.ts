
import Timer from '../../../util/timer';
import {Barrier} from './barrier';

class PortProxy {
    private channel : any;
    private wirteCount : number = 0;
    private readCount : number = 0;
    private _promise: Promise<boolean>;

    constructor (channel? : any) {

        this.channel = channel;
        this.wirteCount = 0;
        this.readCount = 0;
    }

    setChannel(channel) {
        this.channel = channel;
        console.info("PortProxy setChannel ");
    }

    async wirte (cmd) {
        console.info("PortProxy wirte ", this.wirteCount++);

        let barrier = new Barrier();

        let timer = new Timer();
        timer.start();

        let handle = setTimeout(() => {
            barrier.open();
        }, 200);

        this.channel.wirte(cmd).then(() =>{

            console.info("PortProxy wirte done ", timer.timeElapsed());
            barrier.open();
        })
        .catch(err => {
            console.info("PortProxy wirte done ", err);
            barrier.open();
        });
        
        await barrier.wait();

        clearTimeout(handle);

        console.info("PortProxy wirte done ", timer.timeElapsed());
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
            if (portProxy.hasData) {
                util.stackFrame.duration = 0;
                return portProxy.getData();
            }

            util.yield();
        }

        return null;
    }

}

let portProxy = new PortProxy();

export default portProxy;
