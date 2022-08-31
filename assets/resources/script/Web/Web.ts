const { ccclass, property } = cc._decorator;

@ccclass
export default class Templete extends cc.Component {

    @property(cc.WebView)
    webview: cc.WebView = null

    onLoad() {
        this.node.onenter = this.onenter.bind(this)
        this.node.onleave = this.onleave.bind(this)

        window.web = this.webview
    }

    onenter() {
        this.webview.enabled = true
        // this.webview.url = `https://www.baidu.com`

        let p = window.document.getElementsByTagName('p')

        window.iframe = window.document.getElementsByTagName('iframe')[0]
        iframe.setAttribute('scrolling', 'no')
    }

    onleave() {
    }

    btnClose() {
        UiMgr.close(this)
    }
}
