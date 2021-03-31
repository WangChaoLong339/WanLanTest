const { ccclass, property } = cc._decorator;

@ccclass
export default class Templete extends cc.Component {

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
        this.node.onleave = this.onleave.bind(this)
    }

    onenter() {
    }

    onleave() {
    }

    btnClose() {
        UiMgr.close(this)
    }
}
