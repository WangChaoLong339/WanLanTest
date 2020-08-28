const Min_Multiple = 1.5
const Max_Multiple = 5

cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        mask: cc.Node,
        mirrorBg: cc.Node,
        slider: cc.Node,
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    },

    onEnable() {
        this.bg.on('touchstart', this.touchStart, this)
        this.bg.on('touchmove', this.touchMove, this)
    },

    onDisable() {
        this.bg.off('touchstart', this.touchStart, this)
        this.bg.off('touchmove', this.touchMove, this)
    },

    touchStart(e) {
        let pos = this.node.convertToNodeSpaceAR(e.getLocation())
        this.mask.setPosition(pos)
        this.setMirrirBg()
    },

    touchMove(e) {
        let pos = this.node.convertToNodeSpaceAR(e.getLocation())
        this.mask.setPosition(pos)
        this.setMirrirBg()
    },

    sliderMove(e) {
        this.multiple = Min_Multiple + e.progress * (Max_Multiple - Min_Multiple)
        this.setMirrirBg()
    },

    onenter() {
        this.multiple = Min_Multiple
        this.setMirrirBg()
    },

    setMirrirBg() {
        // 显示当前放大镜的倍数
        this.slider.getChildByName('val').getComponent(cc.Label).string = `放大倍数:${this.multiple.toFixed(2).toString()}`
        // 设置放大镜的倍数
        this.mirrorBg.width = this.bg.width
        this.mirrorBg.height = this.bg.height
        this.mirrorBg.scaleX = this.multiple
        this.mirrorBg.scaleY = this.multiple
        // 设置背景图的位置
        this.mirrorBg.x = -this.mask.x * this.multiple
        this.mirrorBg.y = -this.mask.y * this.multiple
    },

    btnClose() {
        this.node.active = false
    },
});
