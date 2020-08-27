// let arr = [{
//     el:'',
//     animateCss:''
// }]
// https://github.com/animate-css/animate.css
import 'animate.css'


function ScrollAnimate(option, global) {
    this.$option = option
    this.$global = null
    if (global) {
        this.$global = typeof global === 'string' ? document.querySelector(global) : global
    } else {
        this.$global = window
    }

    this.$data = []
    this.eventScroll = null

    this.initDom()
    this.onEvent()

}

ScrollAnimate.prototype.initDom = function () {
    //
    this.$global.style.position = 'relative'

    this.$data = this.$option.map(obj => {
        // el
        let el = typeof obj.el === 'string' ? document.querySelector(obj.el) : obj.el

        return {
            el: el,                                         // 
            animateCss: obj.animateCss,                     //
            top: el.getBoundingClientRect().top,            // 
            left: el.getBoundingClientRect().left,           //
            offsetTop: el.offsetTop,
            offsetLeft: el.offsetLeft
        }

    })

}

ScrollAnimate.prototype.onEventScroll = function () {
    // let el = ev.currenttarget
    let globalTop = this.$global.scrollTop + this.$global.clientHeight + 30

    this.$data.forEach((val, index, arr) => {
        let el = val.el
        let offsetTop = val.offsetTop
        let animateCssArr = val.animateCss
        // 判断高度
        if (globalTop > offsetTop) {
            // 添加class
            animateCssArr.forEach(val => {
                el.classList.add(val)
            })
            // animateend 事件
            el.onanimateend = function () {
                animateCssArr.forEach(val => {
                    el.classList.remove(val)
                })
                el.onanimateend = null
            }
            arr.splice(index, 1)
        }

    })
}

// 
// 添加事件
ScrollAnimate.prototype.onEvent = function () {
    this.eventScroll = this.throttle(this.onEventScroll, 100)
    this.$global.addEventListener('scroll', this.eventScroll)

}
// 移除事件
ScrollAnimate.prototype.remove = function () {
    this.$global.cancelEventListener('scroll', this.eventScroll)
}
// 节流
ScrollAnimate.prototype.throttle = function (fn, time) {
    let date = Date.now()
    return () => {
        let newDate = Date.now()
        if (newDate - date > time) {
            date = newDate
            fn.call(this)
        }
    }
}


export default ScrollAnimate