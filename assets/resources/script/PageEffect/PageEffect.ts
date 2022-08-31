const { ccclass, property } = cc._decorator;

@ccclass
export default class customPageview extends cc.Component {

    onLoad() {
    }

    onEnable() {
    }

    onDisable() {
    }

    btnClose() {
        UiMgr.close(this)
    }
}