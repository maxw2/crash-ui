
function Tabs(el) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el

    this.$dom = {
        titleEl: null,
        linkEl: null,
        contentEl: null,
        titleArr: [],
        contentArr: []
    }
    this.btnNum = 0
    // data
    this.initData()
    // create
    this.createLink()
    //  css
    this.initCss()
    //  event
    this.Event()
    // render
    this.setRender(null, this.btnNum)


    // console.log(this)

}
Tabs.prototype.initData = function () {

    this.$dom.titleEl = this.el.children[0]
    this.$dom.contentEl = this.el.children[1]
    //
    this.$dom.titleArr = this.$dom.titleEl.children
    this.$dom.contentArr = this.$dom.contentEl.children

}

Tabs.prototype.createLink = function () {
    let el = document.createElement('div')
    // class
    el.classList.add('linkDefCss')

    this.$dom.titleEl.appendChild(el)
    this.$dom.linkEl = el
}

Tabs.prototype.initCss = function () {
    //  el
    this.el.classList.add('crash-tabs')
    //  title
    this.$dom.titleEl.classList.add('titleDefCss')

    // content
    this.$dom.contentEl.classList.add('contentDefCss')

    // titleTabs
    Array.prototype.forEach.call(this.$dom.titleArr, (el, index) => {
        el.setAttribute('data-num', index)
    })

    // children
    Array.prototype.forEach.call(this.$dom.contentArr, (el, index) => {
        el.classList.add('childrenDefCss')
    })

}

// setCss
Tabs.prototype.setRender = function (oldNum, newBtn) {
    // title 
    if (oldNum) this.$dom.titleArr[oldNum].classList.remove('titleAction')
    this.$dom.titleArr[newBtn].classList.add('titleAction')
    // link
    let Rect = this.$dom.titleArr[this.btnNum].getBoundingClientRect()
    this.$dom.linkEl.style.width = Rect.width + 'px'
    this.$dom.linkEl.style.left = this.$dom.titleArr[this.btnNum].offsetLeft + 'px'
    // content
    if (oldNum || oldNum === 0) this.$dom.contentArr[oldNum].classList.remove('contentAction')
    this.$dom.contentArr[newBtn].classList.add('contentAction')

}


// Event
Tabs.prototype.Event = function () {
    this.$dom.titleEl.addEventListener('click', this.onClick.bind(this))
}

// onClikc
Tabs.prototype.onClick = function (ev) {
    let targetEl = ev.target
    let btnNum = targetEl.getAttribute('data-num')

    if (!btnNum || Number(btnNum) === this.btnNum) return
    let oldNum = this.btnNum
    this.btnNum = btnNum

    this.setRender(oldNum, this.btnNum)


}