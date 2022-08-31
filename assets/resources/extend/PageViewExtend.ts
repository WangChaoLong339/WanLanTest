const { ccclass, property } = cc._decorator;

@ccclass
export default class PageViewExtend extends cc.PageView {

    @property(cc.Node)
    pageItem: cc.Node = null

    // 头部添加
    unshift(cb?) {
        let pageItem = cc.instantiate(this.pageItem)
        cb && cb(pageItem)
        this.insertPage(pageItem, 0)
    }

    // 尾部添加
    push(cb?) {
        let pageItem = cc.instantiate(this.pageItem)
        cb && cb(pageItem)
        this.addPage(pageItem)
    }

    // 头部删除
    shift() {
        if (this.getPages().length > 0) {
            this.removePageAtIndex(0)
        }
    }

    // 尾部删除
    pop() {
        if (this.getPages().length > 0) {
            this.removePageAtIndex(this.getPages().length - 1)
        }
    }

    // 删除所有分页
    removeAllPage() {
        this.removeAllPages()
    }
}
