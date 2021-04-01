// 手动
import { UiManager } from "./assets/resources/extend/UiManager"
import { Message } from "./assets/resources/extend/Message"
import { Constant } from "./assets/resources/extend/Constant"

declare global {
    export var UiMgr: UiManager
    export var Message: Message
    export var Constant: Constant

    namespace cc {
        export interface Node {
            // node active change to true
            onenter: Function,
            // node active change to false
            onleave: Function,

            PathChild: Function,
            EachChild: Function,
        }

        export interface Color {
            VIOLET: cc.Color,
        }
    }
}