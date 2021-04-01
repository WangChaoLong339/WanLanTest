const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ScrollView)
    scorllview: cc.ScrollView = null
    @property(cc.Node)
    item: cc.Node = null

    onLoad() {
        // 创建测试用例
        this.createExampleCase()
    }

    createExampleCase() {
        this.scorllview.content.removeAllChildren()
        for (let i = 0; i < Constant.TestCase.length; i++) {
            let item: any = cc.instantiate(this.item)
            item.parent = this.scorllview.content
            item.idx = i
            item.getChildByName('val').getComponent(cc.Label).string = Constant.TestCase[i].describe
        }
    }

    btnItem(e) {
        let idx = e.target.idx
        UiMgr.open(Constant.TestCase[idx].name)
    }
}
