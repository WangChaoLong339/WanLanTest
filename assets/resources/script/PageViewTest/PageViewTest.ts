import PageViewExtend from "../../extend/PageViewExtend";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PageViewTest extends cc.Component {

    @property(cc.Node)
    pageView: cc.Node = null

    pVComponent: PageViewExtend
    onLoad() {
        this.node.onenter = this.onenter.bind(this)
        this.node.onleave = this.onleave.bind(this)
        this.pVComponent = this.pageView.getComponent('PageViewExtend')
    }

    offset: number
    onenter() {
        this.offset = 0

        this.pVComponent.removeAllPage()
    }

    onleave() {
    }

    // 头部添加
    btnUnshift() {
        this.pVComponent.unshift((pageItem) => { pageItem.PathChild('val', cc.Label).string = `第${this.offset}页` })
        this.offset++
    }

    // 尾部添加
    btnPush() {
        this.pVComponent.push((pageItem) => { pageItem.PathChild('val', cc.Label).string = `第${this.offset}页` })
        this.offset++
    }

    // 头部删除
    btnShift() {
        this.pVComponent.shift()
    }

    // 尾部删除
    btnPop() {
        this.pVComponent.pop()
    }

    btnClose() {
        UiMgr.close(this)
    }
}
