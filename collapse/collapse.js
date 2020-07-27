
function Collapse(el) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.$dom = {
        contentArr: [],
        titleArr: [],
        contextArr: [],
        arrowArr: []
    }
    this.$data = {
        contextHeightArr: []
    }
    this.btnNum = 0


    this.initData()
    this.initCss()
    this.setCss(null, this.btnNum)
    // 
    this.Event()

}

Collapse.prototype.initData = function () {
    // contentEl
    this.$dom.contentArr = this.el.children
    // content
    Array.prototype.forEach.call(this.$dom.contentArr, (el, index) => {
        let children = el.children
        this.$dom.titleArr.push(children[0])
        this.$dom.arrowArr.push(this.createArrow())
        this.$dom.contextArr.push(children[1])

        // appendChild Arrow
        this.$dom.titleArr[index].appendChild(this.$dom.arrowArr[index])
    })

    // context 
    Array.prototype.forEach.call(this.$dom.contextArr, (el) => {
        let Rect = el.getBoundingClientRect()
        this.$data.contextHeightArr.push(Rect.height)
    })

}

// arrow
Collapse.prototype.createArrow = function () {
    let el = document.createElement('span')
    let svg = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="transform: rotate(90deg);"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>`

    el.innerHTML = svg
    return el
}


Collapse.prototype.initCss = function () {
    this.el.classList.add('crash-collapes')

    Array.prototype.forEach.call(this.$dom.contentArr, (el, index) => {
        // content
        el.classList.add('contentDefCss')
        // title
        this.$dom.titleArr[index].classList.add('titleDefCss')
        this.$dom.titleArr[index].setAttribute('data-num', index)
        // arrow
        this.$dom.arrowArr[index].classList.add('arrowDefCss')
        // context
        this.$dom.contextArr[index].classList.add('contextDefCss')
        // this.$dom.contextArr[index].style.height = this.$data.contextHeightArr[index] + 'px'


    })


}

// setCss
Collapse.prototype.setCss = function (oldNum, newNum) {
    let oldN = Number(oldNum)
    let newN = Number(newNum)

    // 相同
    if (typeof oldNum !== 'object' && oldN === newN) {

        if (this.$dom.arrowArr[newN].classList.contains('arrowAction')) {

            this.$dom.arrowArr[newN].classList.remove('arrowAction')
            this.$dom.contextArr[newN].style = ''

        } else {

            this.$dom.arrowArr[newN].classList.add('arrowAction')
            this.$dom.contextArr[newN].style.height = this.$data.contextHeightArr[newN] + 'px'
        }

    } else {
        // arrow
        if (typeof oldN === 'number') this.$dom.arrowArr[oldN].classList.remove('arrowAction')
        this.$dom.arrowArr[newN].classList.add('arrowAction')
        // context 
        if (typeof oldN === 'number') this.$dom.contextArr[oldN].style.height = '0px'
        this.$dom.contextArr[newN].style.height = this.$data.contextHeightArr[newN] + 'px'
    }





}

// Event 
Collapse.prototype.Event = function () {
    this.el.addEventListener('click', this.onClick.bind(this))
}

// onClick 
Collapse.prototype.onClick = function (ev) {
    let target = ev.target
    let btnNum = target.getAttribute('data-num')
    if (!btnNum) return
    let oldNum = this.btnNum
    this.btnNum = btnNum

    this.setCss(oldNum, this.btnNum)

}

