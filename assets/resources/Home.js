const testList = [
    { name: 'Scraping', describe: '刮刮卡' },
    { name: 'CoinFly', describe: '飞金币' },
]

cc.Class({
    extends: cc.Component,

    properties: {
        scorllview: cc.ScrollView,
        item: cc.Node,
    },

    onLoad() {
        this.scorllview.content.removeAllChildren()
        for (let i = 0; i < testList.length; i++) {
            let item = cc.instantiate(this.item)
            item.parent = this.scorllview.content
            item.idx = i
            item.getChildByName('val').getComponent(cc.Label).string = testList[i].describe
        }

        this.lastPbName = ''
    },

    showPrefab(name) {
        let pb = this.node.getChildByName(name)
        if (pb) {
            pb.active = true
            pb.onenter()
            return
        }
        cc.loader.loadRes(`prefab/${name}/${name}`, null, (err, prefab) => {
            if (err) return cc.error(err)
            pb = cc.instantiate(prefab)
            pb.parent = this.node
            pb.active = true
            pb.onenter()
        })
    },

    btnItem(e) {
        let idx = e.target.idx

        this.showPrefab(testList[idx].name)
    },
});
