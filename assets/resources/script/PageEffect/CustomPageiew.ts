enum Direction {
    UP,
    DOWN
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class customPageview extends cc.Component {

    @property(cc.Node)
    touch: cc.Node = null

    @property(cc.Node)
    content: cc.Node = null

    @property(cc.Node)
    item: cc.Node = null

    data = []
    maxY = 804
    minY = -804
    onLoad() {
        this.data = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }

    onEnable() {
        this.touch.on('touchstart', this._touchstart, this)
        this.touch.on('touchmove', this._touchmove, this)
        this.touch.on('touchend', this._touchend, this)
        this.touch.on('touchcancel', this._touchend, this)

        this.initItem()
    }

    onDisable() {
        this.touch.off('touchstart', this._touchstart, this)
        this.touch.off('touchmove', this._touchmove, this)
        this.touch.off('touchend', this._touchend, this)
        this.touch.off('touchcancel', this._touchend, this)
    }

    canTouch = true
    moving = false
    _touchstart() {
        if (this.moving) { return }

        this.canTouch = true
    }

    _touchmove(e) {
        if (!this.canTouch) { return }

        let lastOffset = e.touch._point.y - e.touch._prevPoint.y
        let totalOffset = e.touch._point.y - e.touch._startPoint.y

        if (Math.abs(totalOffset) < this.item.height / 2.5) {
            for (let i = 0; i < this.content.children.length; i++) {
                let item = this.content.children[i]
                item.y += lastOffset
            }
            return
        }

        this.canTouch = false

        // up
        if (totalOffset > 0) {
            let offsetY = this.getMoveOffset(Direction.UP, this.content.children[0])
            for (let i = 0; i < this.content.children.length; i++) {
                let item = this.content.children[i]
                let endY = item.y + offsetY
                cc.error(`up to ${endY}`)
                cc.tween(item)
                    .to(0.2, { y: endY, scale: endY == 0 ? 1 : 0.8 })
                    .call(() => {
                        if (item.y == this.item.height * 3) {
                            item.y = -this.item.height * 2
                        }
                        if (i == this.content.children.length - 1) {
                            this.setupItem(Direction.UP)
                        }
                    })
                    .start()
            }
        }

        // down
        if (totalOffset < 0) {
            let offsetY = this.getMoveOffset(Direction.DOWN, this.content.children[0])
            for (let i = 0; i < this.content.children.length; i++) {
                let item = this.content.children[i]
                let endY = item.y + offsetY
                cc.error(`down to ${endY} `)
                cc.tween(item)
                    .to(0.2, { y: endY, scale: endY == 0 ? 1 : 0.8 })
                    .call(() => {
                        if (item.y == -this.item.height * 3) {
                            item.y = this.item.height * 2
                        }
                        if (i == this.content.children.length - 1) {
                            this.setupItem(Direction.DOWN)
                        }
                    })
                    .start()
            }
        }
    }

    _touchend(e) {
        if (!this.canTouch) { return }

        this.moving = true

        let totalOffset = e.touch._point.y - e.touch._startPoint.y
        for (let i = 0; i < this.content.children.length; i++) {
            let item = this.content.children[i]
            cc.tween(item)
                .by(0.2, { y: -totalOffset })
                .delay(0.2)
                .call(() => { this.moving = false })
                .start()
        }
    }

    initItem() {
        let mid = Math.floor(this.content.childrenCount / 2)
        this.content.EachChild((it, idx) => {
            it.y = (mid - idx) * this.item.height
            it.scale = idx == mid ? 1 : 0.9
        })

        let i = this.data.length - 2
        this.content.EachChild((it, idx) => {
            it.PathChild('val', cc.Label).string = `page:${this.data[i]}`
            it.idx = i
            i = (i + 1) % this.data.length
        })
    }

    setupItem(d: Direction) {
        if (d == Direction.UP) {
            this.content.EachChild((it, idx) => {
                if (it.y == this.minY) {
                    it.idx = (it.idx + this.content.childrenCount) % this.data.length
                    it.PathChild('val', cc.Label).string = `page:${this.data[it.idx]}`
                }
            })
        } else {
            this.content.EachChild((it, idx) => {
                if (it.y == this.maxY) {
                    it.idx = (it.idx + this.data.length - this.content.childrenCount) % this.data.length
                    it.PathChild('val', cc.Label).string = `page:${this.data[it.idx]}`
                }
            })
        }
    }

    getMoveOffset(d: Direction, item: cc.Node): number {
        let y = 0
        if (d == Direction.UP) {
            if (item.y > 0) {
                y = item.height - item.y % item.height
            } else {
                y = Math.abs(item.y) % item.height
            }
            cc.error(`上 当前y:${item.y}, 移动:${y}`)
        } else if (d == Direction.DOWN) {
            if (item.y > 0) {
                y = -item.y % item.height
            } else {
                y = -(item.height - (Math.abs(item.y) % item.height))
            }
            cc.error(`下 当前y:${item.y}, 移动:${y}`)
        }
        return y
    }

    update(e) {
    }
}