cc.Class({
    extends: cc.Component,

    properties: {
        mirrorNode: cc.Node,
        circleNode: cc.Sprite,
        cameraNode: cc.Camera,
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    },

    onEnable() {
        this.node.on('touchstart', this.touchStart, this)
        this.node.on('touchmove', this.touchMove, this)
    },

    onDisable() {
        this.node.off('touchstart', this.touchStart, this)
        this.node.off('touchmove', this.touchMove, this)
    },

    touchStart(e) {
    },

    touchMove(e) {
    },

    onenter() {
        this.initCamera()
    },

    initCamera() {
        let size = cc.view.getVisibleSize()
        let texture = new cc.RenderTexture()
        texture.initWithWidthAndHeight(size.width, size.height)
        // texture._contentSize.width = size.width
        // texture._contentSize.height = size.height
        let spriteFrame = new cc.SpriteFrame()
        spriteFrame.setTexture(texture)
        this.cameraNode.targetTexture = texture
        this.circleNode.spriteFrame = spriteFrame
    },

    btnClose() {
        this.node.active = false
    },
});
