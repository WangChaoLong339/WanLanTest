const { ccclass, property } = cc._decorator;

@ccclass
export class UiManager extends cc.Component {

    @property(cc.Node)
    uiLayer: cc.Node = null;

    @property(cc.Node)
    propLayer: cc.Node = null;

    uiPrefabCache: Object
    propPrefabCache: Object
    onLoad() {
        window.UiMgr = this

        this.uiPrefabCache = {}
        this.propPrefabCache = {}
    }

    open(name, args?) {
        cc.log(`open prefab: ${name}`)
        let pb = this.uiPrefabCache[name]
        if (pb) {
            pb.active = true
            pb.onenter && pb.onenter(args)
        } else {
            cc.resources.load(`prefab/${name}/${name}`, cc.Prefab, (err, prefab) => {
                if (err) return cc.error(err)
                pb = cc.instantiate(prefab)
                pb.parent = this.node
                this.uiPrefabCache[name] = pb
                pb.active = true
                pb.onenter && pb.onenter(args)
            })
        }
    }

    close(args) {
        let name = args
        if (typeof args == 'object') {
            name = args.node.name
        }

        cc.log(`close prefab: ${name}`)
        let panel = this.uiPrefabCache[name]
        if (panel) {
            panel.onleave && panel.onleave()
            panel.active = false
        }
    }
}