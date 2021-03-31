// 手动
import { UiManager } from './assets/resources/extend/UiManager'
import { GlobalMessage } from './assets/resources/extend/GlobalMessage'

declare global {
    var UiMgr: UiManager
    var GlobalMsg: GlobalMessage

    namespace cc {
        export interface Node {
            onenter: Function,
            onleave: Function,

            PathChild: Function,
            EachChild: Function,
        }
    }
}