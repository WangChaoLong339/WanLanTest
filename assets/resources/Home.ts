const testList = [
    { name: 'Scraping', describe: '刮刮卡' },
    { name: 'CoinFly', describe: '飞金币' },
    { name: 'Magnifier', describe: '放大镜' },
    { name: 'Lerp', describe: '插值运动' },
    { name: 'Block', describe: '色块复位' },
    { name: 'SetGet', describe: '属性设置' },
    { name: 'BlockHome', describe: '色块归位' },
]

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
        for (let i = 0; i < testList.length; i++) {
            let item: any = cc.instantiate(this.item)
            item.parent = this.scorllview.content
            item.idx = i
            item.getChildByName('val').getComponent(cc.Label).string = testList[i].describe
        }
    }

    btnItem(e) {
        let idx = e.target.idx
        UiMgr.open(testList[idx].name)
    }
}
