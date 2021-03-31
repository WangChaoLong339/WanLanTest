const { ccclass, property } = cc._decorator;

@ccclass
export class GlobalMessage extends cc.Component {
    // 自增ID
    msgID: number
    // 监听者列表
    msgList: any
    // 事件列表
    listenerMap: object
    onLoad() {
        window.GlobalMsg = this

        this.msgID = 0
        this.msgList = []
        this.listenerMap = {}
    }

    // 增加消息监听
    addListener(msgType, callback, target) {
        // 回调对象
        let msgListener = {
            callback: callback,
            target: target,
        };

        let listener = this.listenerMap[msgType];
        if (listener != null) {
            listener.push(msgListener);
        } else {
            this.listenerMap[msgType] = [msgListener];
        }
    }

    // 发消息
    postMsg(msgType, time, msgData) {
        this.msgID++;
        if (this.msgID > 100000000) {
            this.msgID = 1;
        }
        // 事件对象
        var msgEvent = {
            id: this.msgID,
            msgType: msgType,
            data: msgData,
            time: time, // 毫秒
        };
        this.msgList.push(msgEvent);
        return this.msgID;
    }

    // 删除一条消息
    deleteMsg(msgID) {
        for (let index = 0; index < this.msgList.length; index++) {
            if (this.msgList[index].msgID == msgID) {
                this.msgList.splice(index, 1);
                break;
            }
        }
    }

    // 删除回调,删除该消息类型的所有回调
    deleteListenerByType(msgType) {
        if (this.listenerMap[msgType]) {
            delete this.listenerMap[msgType];
        }
    }

    // 删除回调,删除该消息类型的一个回调
    deleteListenerByTarget(msgType, target) {
        let listener = this.listenerMap[msgType];
        if (listener != null) {
            for (let index = 0; index < listener.length; index++) {
                if (listener[index].target === target) {
                    listener.splice(index, 1);
                    break;
                }
            }
        }
    }

    // 更新队列
    update(dt) {
        if (this.msgList.length > 0) {
            for (let i = 0; i < this.msgList.length; i++) {
                let msg = this.msgList[i];
                msg.time -= dt;
                if (msg.time < 0) {
                    let listener = this.listenerMap[msg.msgType];
                    if (listener != null) {
                        for (let j = 0; j < listener.length; j++) {
                            listener[j].callback.call(listener[j].target, msg);
                        }
                    }
                    this.msgList.splice(i, 1);
                    i--;
                }
            }
        }
    }
};