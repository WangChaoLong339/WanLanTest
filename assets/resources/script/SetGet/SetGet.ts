const { ccclass, property } = cc._decorator;

@ccclass
export default class SetGet extends cc.Component {

    @property(cc.Label)
    val: cc.Label = null

    @property
    _width = 100

    get width() {
        return this._width
    }
    set width(value) {
        this._width = value
    }

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    }

    onenter() {
        this.val.string = this.width.toString()
    }

    btnChange() {
        this.width++
        this.val.string = this.width.toString()
    }

    btnClose() {
        UiMgr.close(this)
    }
}
