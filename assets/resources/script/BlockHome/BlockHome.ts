// 瓶子最大数量
const Max_Bottle_Count = 3
// 单个瓶子最大容量
const Max_Bottle_Volume = 5

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockHome extends cc.Component {

    @property(cc.Node)
    bottleContent: cc.Node = null

    @property(cc.Node)
    bottleItem: cc.Node = null

    @property(cc.Node)
    blockItem: cc.Node = null

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
        this.node.onleave = this.onleave.bind(this)

        this.bottleContent.removeAllChildren()
        this.createBlockPool()
    }

    blockPool: cc.NodePool
    createBlockPool() {
        this.blockPool = new cc.NodePool()

        let blockItem = this.blockItem
        // get overwrite
        this.blockPool.get = function () {
            var last = this._pool.length - 1
            if (last < 0) {
                return cc.instantiate(blockItem)
            } else {
                // Pop the last object in pool
                var obj = this._pool[last]
                this._pool.length = last

                // Invoke pool handler
                var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null
                if (handler && handler.reuse) {
                    handler.reuse.apply(handler, arguments)
                }
                return obj
            }
        }
    }

    onenter() {
        this.createBottle()
    }

    onleave() {
    }

    createBottle() {
        for (let i = 0; i < Max_Bottle_Count; i++) {
            let cloneBottle = cc.instantiate(this.bottleItem)
            cloneBottle.x = (i - 1) * 200
            cloneBottle.parent = this.bottleContent
        }
    }

    btnBlockItem(e) {
    }

    btnClose() {
        UiMgr.close(this)
    }
}
