const STATUS = {
    NONE: 0,
    RUN: 1,
    PAUSE: 2,
}

const SPEED = 1

const { ccclass, property } = cc._decorator;

@ccclass
export default class Lerp extends cc.Component {

    @property(cc.Node)
    transform: cc.Node = null
    @property(cc.Node)
    from: cc.Node = null
    @property(cc.Node)
    to: cc.Node = null
    @property(cc.Label)
    controlVal: cc.Label = null
    @property(cc.Node)
    touch: cc.Node = null
    @property(cc.Graphics)
    graphics: cc.Graphics = null

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    }

    onEnable() {
        this.touch.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this)
    }

    onDisable() {
        this.touch.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this)
    }

    touchEndEvent(e) {
        let pos = this.node.convertToNodeSpaceAR(e.touch._point)
        this.startPos = this.transform.getPosition()
        this.endPos = pos
        this.runTime = 0
        this.updateGraphics()
    }

    status: any
    runTime: any
    startPos: cc.Vec2
    endPos: cc.Vec2
    onenter() {
        this.runTime = 0
        this.status = STATUS.NONE
        this.startPos = this.from.getPosition()
        this.endPos = this.to.getPosition()

        this.transform.setPosition(this.startPos)
        this.updateControlStatus()
        this.updateGraphics()
    }

    updateControlStatus() {
        switch (this.status) {
            case STATUS.NONE:
                this.controlVal.string = '开始'
                break
            case STATUS.RUN:
                this.controlVal.string = '暂停'
                break
            case STATUS.PAUSE:
                this.controlVal.string = '继续'
                break
        }
    }

    updateGraphics() {
        this.graphics.clear()
        this.graphics.moveTo(this.startPos.x, this.startPos.y)
        this.graphics.lineTo(this.endPos.x, this.endPos.y)
        this.graphics.stroke()
    }

    getLerpPosition(t) {
        if (t <= 0) { return this.startPos }
        if (t >= 1) { return this.endPos }
        let x = 0, y = 0
        x = (this.endPos.x - this.startPos.x) * t + this.startPos.x
        y = (this.endPos.y - this.startPos.y) * t + this.startPos.y
        return cc.v2(x, y)
    }

    btnControl() {
        this.status = this.status == STATUS.RUN ? STATUS.PAUSE : STATUS.RUN
        this.updateControlStatus()
    }

    btnCLose() {
        UiMgr.close(this)
    }

    update(dt) {
        if (this.status != STATUS.RUN) { return }
        this.runTime += dt * SPEED
        this.transform.setPosition(this.getLerpPosition(this.runTime))
    }
}
