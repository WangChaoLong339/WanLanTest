export class Constant {
    /* 红  cc.color(255, 0, 0) */
    /* 橙  cc.color(255, 125, 0) */
    /* 黄  cc.color(255, 255, 0) */
    /* 绿  cc.color(0, 255, 0) */
    /* 青  cc.color(0, 255, 255) */
    /* 蓝  cc.color(0, 0, 255) */
    /* 紫  cc.color(255, 0, 255) */

    TestCase = [
        { name: 'Scraping', describe: '刮刮卡' },
        { name: 'CoinFly', describe: '飞金币' },
        { name: 'Magnifier', describe: '放大镜' },
        { name: 'Lerp', describe: '插值运动' },
        { name: 'Block', describe: '色块复位' },
        { name: 'SetGet', describe: '属性设置' },
        { name: 'BlockHome', describe: '色块归位' },
        { name: 'PageViewTest', describe: '动态添加翻页容器' },
        { name: 'PageViewLoop', describe: '翻页容器循环' },
        { name: 'Shader', describe: '着色器' },
        { name: 'PageEffect', describe: '翻页特效' },
        { name: 'Web', describe: '网页测试' },
    ]
}

window.Constant = new Constant()