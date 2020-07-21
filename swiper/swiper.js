// let op = {
//     scrollX: true
// }

function Swiper(el, option) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.option = option
    this.contentEl = this.el.children[0]
    this.childrenEl = this.contentEl.children
    this.css = null
    this.btn = 0
    this.transiotn = false
    this.onTransition = null

    this.initCss()
    this.Event()

}
// onTransition
Swiper.prototype.Event = function () {
    this.onTransition = function () {
        if (!this.transiotn) return
        this.transiotn = false
        Array.prototype.forEach.call(this.childrenEl,(element,index)=>{
            element.classList.remove('nextCss','nextActionCss','prevCss','prevActionCss','actionCss')
            if(index === this.btn){
                element.classList.add('actionCss')
            }
        })
        
    }
    this.el.addEventListener('transitionend', this.onTransition.bind(this))
}
// remove
Swiper.prototype.removeEvent = function () {
    this.el.removeEventListener('transitionend',this.onTransition.bind(this))
}


Swiper.prototype.initCss = function () {
    // el
    this.el.classList.add('crash-scroll')
    //content defCss
    this.contentEl.classList.add('contentDefCss')

    // children deCss
    Array.prototype.forEach.call(this.childrenEl, (element) => {
        element.classList.add('chilDefCss')
    })

    // action
    this.childrenEl[this.btn].classList.add('actionCss')
}
// 下一页
Swiper.prototype.next = function () {
    if(this.transiotn) return 

    this.transiotn = true
    let len = this.childrenEl.length - 1
    let oldBtn = this.btn
    

    if (this.btn === len) {
        this.btn = 0
        //
        this.childrenEl[this.btn].classList.add('nextCss')
        this.childrenEl[oldBtn].classList.add('nextActionCss')
    } else {
        this.btn++
        //
        this.childrenEl[this.btn].classList.add('nextCss')
        this.childrenEl[oldBtn].classList.add('nextActionCss')
    }


}

// 上一页
Swiper.prototype.prev = function () {
    if(this.transiotn) return 

    this.transiotn = true
    let len = this.childrenEl.length - 1
    let oldBtn = this.btn
    //
    if(this.btn === 0){
        this.btn = len
        //
        this.childrenEl[oldBtn].classList.add('prevActionCss')
        this.childrenEl[this.btn].classList.add('prevCss')
    }else{
        this.btn--
        //
        this.childrenEl[oldBtn].classList.add('prevActionCss')
        this.childrenEl[this.btn].classList.add('prevCss')

    }



}
// change
Swiper.prototype.onChange = function () {

}