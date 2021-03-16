cc.Class({
    extends: cc.Component,

    properties: {
        coinRoot: cc.Node,
        coinItem: cc.Node,
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    },

    onenter() {
        this.coinPool = new cc.NodePool()

        this.coinRoot.removeAllChildren()
    },

    setCoinPool(count) {
        for (let i = 0; i < count; i++) {
            let coin = cc.instantiate(this.coinItem)
            this.coinPool.put(coin)
        }
    },

    /**
     * @param { cc.Vec2 } pos 圆心点
     * @param { Number } r 半径
     * @param { Number } count 生成点的数量
     * @param { Number } offset 点的偏移量
     * @returns { cc.Vec2[] } 生成点的坐标
     */
    calculatePoints(pos, r, count, offset) {
        let points = []
        // 弧度 = 角度 × π ÷ 180°
        let radian = Math.round(360 / count) * Math.PI / 180
        for (let i = 0; i < count; i++) {
            let x = pos.x + r * Math.cos(i * radian)
            let y = pos.y + r * Math.sin(i * radian)
            points.push(cc.v2(x + (Math.random() > 0.5 ? Math.random() * offset : -Math.random() * offset), y + (Math.random() > 0.5 ? Math.random() * offset : -Math.random() * offset)))
        }
        return points
    },

    /**
     * @param { Number } coinCount 金币数量
     * @param { cc.Vec2 } startPos 起点位置
     * @param { cc.Vec2 } endPos 终点位置
     */
    playCoinFlyAnim(coinCount, startPos, endPos) {
        // 确保内存池数量足够
        let size = this.coinPool.size()
        let needCount = coinCount > size ? coinCount - size : 0
        this.setCoinPool(needCount)

        let points = this.calculatePoints(startPos, 150, 10, 10)

        for (let i = 0; i < points.length; i++) {
            let coin = this.coinPool.get()
            coin.active = true
            coin.parent = this.coinRoot
            coin.setPosition(startPos)
        }

        for (let i = points.length - 1; i >= 0; i--) {
            let rIndex = Math.floor(Math.random() * (i + 1));
            let temp = points[rIndex];
            points[rIndex] = points[i];
            points[i] = temp;
        }

        this.coinRoot.children.forEach((it, idx) => {
            it.runAction(cc.sequence(
                cc.moveTo(0.3, points[idx]),
                cc.delayTime(idx * 0.01),
                cc.moveTo(0.5, endPos),
                cc.callFunc(() => { it.parent = null; this.coinPool.put(it) })
            ))
        })
    },

    btnFly() {
        let coinCount = Math.random() * 15 + 10
        let startPos = this.node.getChildByName('startPos').position
        let endPos = this.node.getChildByName('endPos').position

        this.playCoinFlyAnim(coinCount, startPos, endPos)
    },

    btnClose() {
        UiMgr.close(this)
    },
})
