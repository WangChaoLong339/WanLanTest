const testList = [
    { name: 'Scraping', describe: '刮刮卡' },
    { name: 'CoinFly', describe: '飞金币' },
    { name: 'Magnifier', describe: '放大镜' },
    { name: 'Lerp', describe: '插值运动' },
    { name: 'Block', describe: '色块复位' },
]


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ScrollView)
    scorllview: cc.ScrollView = null
    @property(cc.Node)
    item: cc.Node = null

    lastPbName: String
    onLoad() {
        this.scorllview.content.removeAllChildren()
        for (let i = 0; i < testList.length; i++) {
            let item: any = cc.instantiate(this.item)
            item.parent = this.scorllview.content
            item.idx = i
            item.getChildByName('val').getComponent(cc.Label).string = testList[i].describe
        }

        this.lastPbName = ''
    }

    showPrefab(name) {
        let pb: any = this.node.getChildByName(name)
        if (pb) {
            pb.active = true
            pb.onenter()
            return
        }
        cc.resources.load(`prefab/${name}/${name}`, null, (err, prefab) => {
            if (err) return cc.error(err)
            pb = cc.instantiate(prefab)
            pb.parent = this.node
            pb.active = true
            pb.onenter()
        })
    }

    btnItem(e) {
        let idx = e.target.idx

        this.showPrefab(testList[idx].name)
    }
}
