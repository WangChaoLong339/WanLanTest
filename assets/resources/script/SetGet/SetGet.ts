const { ccclass, property } = cc._decorator;

@ccclass
export default class SetGet extends cc.Component {

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    }

    onenter() {
    }

    btnClose() {
        this.node.active = false
        UiMgr.close(this)
    }
}
