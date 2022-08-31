const { ccclass, property } = cc._decorator;

@ccclass
export default class PageViewLoop extends cc.Component {

    @property(cc.PageView)
    pageView: cc.PageView = null

    @property(cc.Node)
    pageViewItem: cc.Node = null

    data = []
    currIdx = 2
    onLoad() {
        window['aaa'] = this.pageView

        this.node.onenter = this.onenter.bind(this)
        this.node.onleave = this.onleave.bind(this)
        this.pageView.node.on(cc.Node.EventType.TOUCH_START, () => { this.autoScroll(false) })
        this.pageView.node.on(cc.Node.EventType.TOUCH_END, () => { this.autoScroll(true) })
        this.pageView.node.on(cc.Node.EventType.TOUCH_CANCEL, () => { this.autoScroll(true) })
        this.pageView.node.on("scroll-ended", (e) => {
            let currPageIdx = this.pageView.getCurrentPageIndex()
            let pages = this.pageView.getPages()
            if (currPageIdx == 3) {
                this.currIdx = (this.currIdx + 1) % this.data.length
                let page = pages[0]
                this.pageView.removePage(page)
                this.pageView.addPage(page)
            } else if (currPageIdx == 1) {
                this.currIdx = (this.currIdx - 1 + this.data.length) % this.data.length
                let page = pages[pages.length - 1]
                this.pageView.removePage(page)
                this.pageView.content.insertChild(page, 0);
                // this.pageView.insertPage(page, 0)
            }
            this.pageView.content.x = -1000
            this.pageView.setCurrentPageIndex(2)
            this.setupPageItem()
        })
    }

    onenter(data = [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        this.data = data
        // this.pageView.scrollToPage(2, 0)
        this.pageView.content.x = -1000
        this.pageView.setCurrentPageIndex(2)
        this.setupPageItem()
        this.autoScroll(true)
    }

    onleave() {
    }

    autoScroll(status) {
        return
        if (status) {
            this.node.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(3),
                cc.callFunc(() => {
                    let currPageIdx = this.pageView.getCurrentPageIndex()
                    this.pageView.scrollToPage(currPageIdx + 1, 0.5)
                }),
            )))
        } else {
            this.node.stopAllActions()
        }
    }

    setupPageItem() {
        this.pageView.content.children.forEach((it, idx) => {
            let d = this.data[(this.currIdx + idx + this.data.length - 4) % this.data.length]
            it.PathChild('val', cc.Label).string = `val: ${d}`
        })
    }

    btnClose() {
        UiMgr.close(this)
    }
}
