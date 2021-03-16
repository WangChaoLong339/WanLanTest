const CALC_RECT_WIDTH = 20
const CLEAR_LINE_WIDTH = 20

cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Mask,
        graphicsNode: cc.Node,
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    },

    onEnable() {
        this.graphicsNode.on(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this)
        this.graphicsNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this)
        this.graphicsNode.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this)
        this.graphicsNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this)
    },

    onDisable() {
        this.graphicsNode.off(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this)
        this.graphicsNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this)
        this.graphicsNode.off(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this)
        this.graphicsNode.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this)
    },

    touchStartEvent(e) {
        let point = this.graphicsNode.convertToNodeSpaceAR(e.getLocation())
        this.tempDrawPoints.push(point)
        this.clearMask(point)
    },

    touchMoveEvent(e) {
        let point = this.graphicsNode.convertToNodeSpaceAR(e.getLocation())
        this.tempDrawPoints.push(point)
        this.clearMask(point)
    },

    touchEndEvent(e) {
        // this.tempDrawPoints = []
    },

    onenter() {
        this.tempDrawPoints = []
    },

    clearMask(pos) {
        // this.mask._clippingStencil.drawCircle(pos, CLEAR_LINE_WIDTH, 360, 10, null, CLEAR_LINE_WIDTH, cc.color(255, 255, 255, 255))
        // return
        let stencil = this.mask._clippingStencil
        if (this.tempDrawPoints.length == 1) {
            let pos = this.tempDrawPoints.shift()
            stencil.drawDot(pos, CLEAR_LINE_WIDTH, cc.color(255, 255, 255, 255))
        } else if (this.tempDrawPoints.length > 1) {
            stencil._drawSegments(this.tempDrawPoints, CLEAR_LINE_WIDTH, cc.color(255, 255, 255, 255))
            this.tempDrawPoints = []
        }
    },

    btnReset() {
        this.tempDrawPoints = []
        let stencil = this.mask._clippingStencil
        stencil.clear()
    },

    btnClose() {
        UiMgr.close(this)
    },
})
