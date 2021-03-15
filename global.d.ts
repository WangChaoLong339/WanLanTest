// 手动
import { UiManager } from './assets/resources/extend/UiManager'

declare global {
    var UiMgr: UiManager

    namespace cc {
        export interface Node {
            onenter: Function,
            oneleave: Function,
        }
    }
}