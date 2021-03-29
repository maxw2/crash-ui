import './scroll.css'
/**
 * 
 * @param el 
 * @param options 
 */

interface DOM {
    content: {
        el: any,
        width: number,
        height: number,
        x: number,
        y: number
    },
    children: [{
        el: HTMLElement,
        width: number,
        height: number,
        x: number,
        y: number
    }]
}

interface POS {
    x?: number
    y?: number
    isDown: boolean
    downX?: number
    downY?: number
    moveX?: number
    moveY?: number
}

interface OP {
    scrollX?: true,
    midd: boolean
}

class Scroll {
    $el: HTMLElement
    $op: OP
    $dom: DOM
    $pos: POS
    constructor(ele: string | HTMLElement, opt: OP) {
        this.$el = typeof ele === 'string' ? document.querySelector(ele) : ele
        this.$op = opt
        this.initDom()
        this.initEvent()
        console.log(this)
    }


    /**
     * 初始化DOM
     */
    initDom() {
        const contentEl = this.$el.children[0]
        const chidlrenEL = contentEl.children

        // 
        this.$el.classList.add('crash-scroll')
        contentEl.classList.add('contentDefCss')
        // 
        this.$dom = {
            content: {
                el: contentEl,
                width: contentEl.clientWidth,
                height: contentEl.clientHeight,
                x: contentEl.clientLeft,
                y: contentEl.clientTop
            },
            children: Array.prototype.map.call(chidlrenEL, (ele: HTMLElement) => {
                // css
                ele.classList.add('contentDefCss')
                return {
                    el: ele,
                    width: ele.clientWidth,
                    height: ele.clientHeight,
                    x: ele.offsetLeft,
                    y: ele.offsetTop
                }
            })
        }

    }

    /**
     * 初始化Event
     */
    initEvent() {
        this.$pos = {
            isDown: false,
            x: 0,
            y: 0,
        }

        this.$el.addEventListener('mousedown', this.onEventDown.bind(this))
        this.$el.addEventListener('mousemove', this.onEventMove.bind(this))
        this.$el.addEventListener('mouseup', this.onEventUp.bind(this))
        this.$el.addEventListener('mouseleave', this.onEventUp.bind(this))
        this.$el.addEventListener('transitionend', this.onTransitionEnd.bind(this))
    }


    // down
    onEventDown(ev: MouseEvent) {
        this.$pos.isDown = true
        this.$pos.downX = ev.clientX
        this.$pos.downY = ev.clientY
        this.$dom.content.el.style.transition = ``
    }

    // move
    onEventMove(ev: MouseEvent) {
        if (!this.$pos.isDown) return

        if (this.$pos.moveX | this.$pos.moveY) {
            this.$pos.x += ev.clientX - this.$pos.moveX
            this.$pos.y += ev.clientY - this.$pos.moveY
        } else {
            this.$pos.x += this.$pos.downX - ev.clientX
            this.$pos.y += this.$pos.downY - ev.clientY
        }

        this.$pos.moveX = ev.clientX
        this.$pos.moveY = ev.clientY

        this.setPos(this.$pos.x, this.$pos.y)



    }

    // up
    onEventUp() {
        if (!this.$pos.isDown) return
        this.$pos.isDown = false
        this.$pos.moveX = null
        this.$pos.moveY = null
        this.Ease()


    }

    // transitionEnd
    onTransitionEnd() {
        const contentEl = this.$dom.content.el
        contentEl.style.transition = ``

    }


    /**
     * @name 移动元素
     * @param x 
     * @param y 
     */
    setPos(x: number, y?: number) {
        const contentEl = this.$dom.content.el

        if (this.$op.scrollX) {
            contentEl.style.transform = `translate(${x}px,0px) translateZ(0px)`
        } else {
            contentEl.style.transform = `translate(0px,${y}px) translateZ(0px)`
        }

    }

    // 
    Ease() {
        let btn = false
        const contentEl = this.$dom.content.el
        const childLen = this.$dom.children.length
        contentEl.style.transition = `ease 0.5s transform`

        // X 大于 左边距 或 右边距
        if (this.$pos.x > 0) {
            this.$pos.x = 0
            this.setPos(this.$pos.x, this.$pos.y)
            return
        } else if (this.$pos.x < -this.$dom.children[childLen - 1].x) {
            this.$pos.x = -this.$dom.children[childLen - 1].x
            this.setPos(this.$pos.x, this.$pos.y)
            return
        }



        this.$dom.children.forEach((obj, index, array) => {
            if (btn) return
            const width = obj.width
            const x = obj.x
            // 
            if (this.$pos.x < -x && this.$pos.x > -(x + width / 2)) {
                this.$pos.x = -x
                btn = true
                this.setPos(this.$pos.x, this.$pos.y)
            } else if (this.$pos.x < -(x + width / 2) && this.$pos.x > -(x + width) ) {
                this.$pos.x = -(x + width)
                btn = true
                this.setPos(this.$pos.x, this.$pos.y)
            }

        
        })

    }

}

export default Scroll