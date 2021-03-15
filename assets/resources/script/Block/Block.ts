const BLOCK_CONFIG = [
    { Size: 600 / 4, Count: 4, ColorCount: 4 },
    { Size: 600 / 6, Count: 6, ColorCount: 9 },
]

const BASE_IDX = [
    [
        [0, 1, 4, 5],
        [1, 2, 5, 6],
        [2, 3, 6, 7],
        [4, 5, 8, 9],
        [5, 6, 9, 10],
        [6, 7, 10, 11],
        [8, 9, 12, 13],
        [9, 10, 13, 14],
        [10, 11, 14, 15],
    ],
    [
        [0, 1, 6, 7],
        [1, 2, 7, 8],
        [2, 3, 8, 9],
        [3, 4, 9, 10],
        [4, 5, 10, 11],
        [6, 7, 12, 13],
        [7, 8, 13, 14],
        [8, 9, 14, 15],
        [9, 10, 15, 16],
        [10, 11, 16, 17],
        [12, 13, 18, 19],
        [13, 14, 19, 20],
        [14, 15, 20, 21],
        [15, 16, 21, 22],
        [16, 17, 22, 23],
        [18, 19, 24, 25],
        [19, 20, 25, 26],
        [20, 21, 26, 27],
        [21, 22, 27, 28],
        [22, 23, 28, 29],
        [24, 25, 30, 31],
        [25, 26, 31, 32],
        [26, 27, 32, 33],
        [27, 28, 33, 34],
        [28, 29, 34, 35],
    ],
]

const RESULT_IDX = [
    [
        [0, 1, 4, 5],
        [2, 3, 6, 7],
        [8, 9, 12, 13],
        [10, 11, 14, 15],
    ],
    [
        [0, 1, 6, 7],
        [2, 3, 8, 9],
        [4, 5, 10, 11],
        [12, 13, 18, 19],
        [14, 15, 20, 21],
        [16, 17, 22, 23],
        [24, 25, 30, 31],
        [26, 27, 32, 33],
        [28, 29, 34, 35],
    ],
]

const IDX_TO_COLOR = [
    cc.color(255, 0, 0),
    cc.color(0, 255, 0),
    cc.color(0, 0, 255),
    cc.color(255, 255, 0),
    cc.color(255, 0, 255),
    cc.color(0, 255, 255),
    cc.color(255, 192, 203),
    cc.color(25, 25, 112),
    cc.color(32, 178, 170),
]

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    changeBtnContent: cc.Node = null
    @property(cc.Node)
    changeBtn: cc.Node = null
    @property(cc.Node)
    itemContent: cc.Node = null
    @property(cc.Node)
    item: cc.Node = null
    @property(cc.Toggle)
    toggle1: cc.Toggle = null
    @property(cc.Label)
    cumulativeLabel: cc.Label = null
    @property(cc.Node)
    gameResult: cc.Node = null
    @property(cc.Label)
    gameResultLabel: cc.Label = null

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
    }

    selectIdx: any
    cumulative: 0
    countdownTimer: any
    blockColor: any
    onenter() {
        this.selectIdx = 0
        this.countdownTimer = null
        this.cumulative = 0

        this.toggle1.check()
        this.cumulativeLabel.string = `游戏用时:${this.cumulative}s`
        this.itemContent.removeAllChildren()
        this.hideGameResult()
    }

    checkEvent(e, data) {
        this.selectIdx = parseInt(data)
    }

    generateDatas() {
        this.blockColor = []
        let count = BLOCK_CONFIG[this.selectIdx].ColorCount
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < 4; j++) {
                this.blockColor.push(i)
            }
        }
    }

    outOfOrder() {
        for (let i = 0; i < this.blockColor.length; i++) {
            let idx = Math.floor(Math.random() * this.blockColor.length)
            if (idx != i) {
                let temp = this.blockColor[idx]
                this.blockColor[idx] = this.blockColor[i]
                this.blockColor[i] = temp
            }
        }
    }

    generateItems() {
        this.itemContent.removeAllChildren()
        for (let i = 0; i < this.blockColor.length; i++) {
            let cloneItem = cc.instantiate(this.item)
            cloneItem.width = cloneItem.height = BLOCK_CONFIG[this.selectIdx].Size
            cloneItem.x = (i % BLOCK_CONFIG[this.selectIdx].Count - BLOCK_CONFIG[this.selectIdx].Count / 2 + 0.5) * cloneItem.width
            cloneItem.y = (BLOCK_CONFIG[this.selectIdx].Count / 2 - Math.floor(i / BLOCK_CONFIG[this.selectIdx].Count) - 0.5) * cloneItem.height
            cloneItem.parent = this.itemContent
        }
    }

    generateButtons() {
        this.changeBtnContent.removeAllChildren()
        let btnCount = BLOCK_CONFIG[this.selectIdx].Count - 1
        let btnSize = BLOCK_CONFIG[this.selectIdx].Size
        for (let i = 0; i < btnCount * btnCount; i++) {
            let cloneItem: any = cc.instantiate(this.changeBtn)
            cloneItem.width = cloneItem.height = 150//btnSize
            cloneItem.x = ((i % btnCount) - Math.floor(btnCount / 2)) * btnSize
            cloneItem.y = (btnCount - Math.ceil(btnCount / 2) - Math.floor(i / btnCount)) * btnSize
            cloneItem.idx = i
            cloneItem.parent = this.changeBtnContent
        }
    }

    changeData(offset) {
        // 获取需要交换数据色块的下标数据
        let changeIdxs = BASE_IDX[this.selectIdx][offset]
        if (changeIdxs.length != 4) { return }
        let temp = this.blockColor[changeIdxs[0]]
        this.blockColor[changeIdxs[0]] = this.blockColor[changeIdxs[2]]
        this.blockColor[changeIdxs[2]] = this.blockColor[changeIdxs[3]]
        this.blockColor[changeIdxs[3]] = this.blockColor[changeIdxs[1]]
        this.blockColor[changeIdxs[1]] = temp
    }

    updateItems() {
        if (this.blockColor.length != this.itemContent.childrenCount) { return cc.error('数据出错') }

        this.itemContent.children.forEach((it, idx) => { it.children[0].color = IDX_TO_COLOR[this.blockColor[idx]] })
    }

    countdownStart() {
        this.cumulative = 0
        clearInterval(this.countdownTimer)
        this.countdownTimer = setInterval(() => {
            this.cumulative++
            this.cumulativeLabel.string = `游戏用时:${this.cumulative}s`
        }, 1000)
    }

    tryGameOver() {
        for (let i = 0; i < RESULT_IDX[this.selectIdx].length; i++) {
            let d0 = this.blockColor[RESULT_IDX[this.selectIdx][i][0]]
            let d1 = this.blockColor[RESULT_IDX[this.selectIdx][i][1]]
            let d2 = this.blockColor[RESULT_IDX[this.selectIdx][i][2]]
            let d3 = this.blockColor[RESULT_IDX[this.selectIdx][i][3]]
            if (d0 != d1 || d1 != d2 || d2 != d3) { return }
        }

        this.showGameResult()
    }

    showGameResult() {
        clearInterval(this.countdownTimer)
        this.gameResultLabel.string = `游戏结束,总共用时:${this.cumulative}s.`
        this.gameResult.active = true
    }

    hideGameResult() {
        this.gameResult.active = false
    }

    btnStart() {
        // 生成数据
        this.generateDatas()
        // 乱序
        this.outOfOrder()
        // 生成色块
        this.generateItems()
        // 生成按钮
        this.generateButtons()
        // 刷新界面
        this.updateItems()
        // 开启计时器
        this.countdownStart()
    }

    btnChangeBtn(e) {
        // 交换数据
        this.changeData(e.target.idx)
        // 刷新界面
        this.updateItems()
        // 检测结束
        this.tryGameOver()
    }

    btnRestart() {
        this.hideGameResult()
        this.btnStart()
    }

    btnClose() {
        // 这里比较特殊 有一个定时器需要关闭
        clearInterval(this.countdownTimer)
        cc.log(typeof this)
        UiMgr.close(this)
    }
}
