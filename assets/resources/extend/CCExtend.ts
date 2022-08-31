cc.Node.prototype.PathChild = function (path, componentName?) {
    let names = path.split('/')

    let node = null
    for (let i = 0; i < names.length; i++) {
        if (node) {
            node = node.getChildByName(names[i])
        } else {
            node = this.getChildByName(names[i])
        }
    }

    if (componentName) {
        return node.getComponent(componentName)
    }
    return node
}

cc.Node.prototype.EachChild = function (cb) {
    this.children.forEach((child, idx) => {
        cb(child, idx)
    })
}

cc.Color.prototype.VIOLET = cc.color(255, 0, 255)