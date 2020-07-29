
function Rate(el) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.$dom = {
        contentEl: null,
        contentArr: [],
        arrowArr: [],
    }
    this.$data = {
        arrowClientXArr: []
    }
    this.dataArr = []
    this.btn = undefined
    this.onChangeFn = []


    // dom
    this.createLi()
    this.craeteContent()
    this.initDom()
    // css
    this.initCss()
    // data
    this.initData()
    // event
    this.Event()

    // console.log(this)
}


// dom
Rate.prototype.initDom = function () {
    this.el.appendChild(this.$dom.contentEl)

    this.$dom.arrowArr.forEach((el, index) => {
        this.dataArr.push(index)
    })

}

Rate.prototype.initCss = function () {
    // el
    this.el.classList.add('crash-rate')
    // content
    this.$dom.contentEl.classList.add('contentDefCss')
    // contentArr
    this.$dom.contentArr.forEach(el => {
        el.classList.add('liDefCss')
    })
    // arrowHalf
    this.$dom.arrowArr.forEach(arr => {
        // half
        arr[0].classList.add('arrowHalfDefCss')
        // full
        arr[1].classList.add('arrowDefCss')
    })


}

// data
Rate.prototype.initData = function () {
    this.$dom.contentArr.forEach(el => {
        let Rect = el.getBoundingClientRect()

        let obj = {
            left: Rect.left,
            right: Rect.right,
            mid: Rect.left + Rect.width / 2
        }

        this.$data.arrowClientXArr.push(obj)
    })

}


// ul
Rate.prototype.craeteContent = function () {
    let el = document.createElement('ul')

    this.$dom.contentArr.forEach(element => {
        el.appendChild(element)
    })

    this.$dom.contentEl = el
}
// li
Rate.prototype.createLi = function () {
    let elArr = []

    for (let i = 0; i < 5; i++) {
        let el = document.createElement('li')
        // data-num
        el.setAttribute('data-num', i)
        el.setAttribute('data-star', i + 0.5)
        let arrowArr = this.createArrow(i)
        arrowArr.forEach(ele => {
            el.appendChild(ele)
        })

        this.$dom.arrowArr.push(arrowArr)
        elArr.push(el)
    }

    this.$dom.contentArr = elArr


}

Rate.prototype.createArrow = function (index) {
    let arrowArr = []
    for (let i = 0; i < 2; i++) {
        let el = document.createElement('span')
        el.innerHTML = `<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>`
        arrowArr.push(el)
    }


    return arrowArr

}

Rate.prototype.Event = function () {
    this.$dom.contentArr.forEach(el => {
        el.addEventListener('mousemove', this.onMouseMove.bind(this))
        el.addEventListener('mouseleave', this.onMouseLeave.bind(this))
        el.addEventListener('click', this.onClick.bind(this))
    })


}

Rate.prototype.remove = function () {
    this.$dom.contentArr.forEach(el => {
        el.removeEventListener('mousemove', this.onMouseMove.bind(this))
        el.removeEventListener('mouseleave', this.onMouseLeave.bind(this))
        el.removeEventListener('click', this.onClick.bind(this))
    })
    this.onChangeFn = []
}

// mouseMove
Rate.prototype.onMouseMove = function (ev) {
    let el = ev.currentTarget
    let left = ev.clientX
    let dataNum = el.getAttribute('data-num')

    this.$dom.arrowArr.forEach((arr, index) => {
        // dataNum 之前的添加
        if (index < dataNum) {
            arr[1].classList.add('actionArrow')
        }
        // dataNum 之后的删除
        else {
            arr[0].classList.remove('actionArrow')
            arr[1].classList.remove('actionArrow')
        }
    })


    // full
    if (left > this.$data.arrowClientXArr[dataNum].mid) {
        this.$dom.arrowArr[dataNum][0].classList.remove('actionArrow')
        this.$dom.arrowArr[dataNum][1].classList.add('actionArrow')
    }
    // half 
    else {
        this.$dom.arrowArr[dataNum][0].classList.add('actionArrow')
        this.$dom.arrowArr[dataNum][1].classList.remove('actionArrow')
    }

}

// mouseLeave
Rate.prototype.onMouseLeave = function (ev) {

    this.$dom.arrowArr.forEach((arr, index) => {
        // this.btn 没有设定值 归零
        if (typeof this.btn === 'undefined') {
            arr[0].classList.remove('actionArrow')
            arr[1].classList.remove('actionArrow')
        }
        // 数量之之前的star
        else if (index < this.btn) {
            arr[0].classList.remove('actionArrow')
            arr[1].classList.add('actionArrow')
        }
        // 数量之后的Star 
        else if (index >= Math.ceil(this.btn)) {
            arr[0].classList.remove('actionArrow')
            arr[1].classList.remove('actionArrow')


        }

        // this.btn 当前的star 判断是half or full
        if (Number(index) === Math.floor(this.btn)) {
            if (this.btn / index > 1) {
                arr[0].classList.add('actionArrow')
                arr[1].classList.remove('actionArrow')
            }
        }



    })








}
// mouseClick
Rate.prototype.onClick = function (ev) {
    let el = ev.currentTarget
    let dataNum = el.getAttribute('data-num')
    let dataStar = Number(el.getAttribute('data-star'))
    let left = ev.clientX
    // console.log(dataNum)
    // console.log(dataStar)
    if (!dataNum) return


    //  start
    // dataStar[0/0.5/1/1.5]
    if (left > this.$data.arrowClientXArr[dataNum].mid) {
        dataStar += 0.5
    }

    if (this.btn === dataStar) {
        this.setBtn(undefined)
    } else {
        this.setBtn(dataStar)
    }

}

// onChange
Rate.prototype.onChange = function (fn) {
    this.onChangeFn.push(fn)
}

// setBtn
Rate.prototype.setBtn = function (num) {
    this.btn = num

    this.onChangeFn.forEach(fn=>{
        fn(this.btn)
    })

}

export default Rate