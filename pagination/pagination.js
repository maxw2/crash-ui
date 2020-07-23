// let op = {
//     total: 500,             // 总条数
//     pageSize: 10            // 每页条数
// }


function Pagination(el, option) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.option = option
    this.onClick = null
    this.eventFn = []
    this.$data = {
        current: 1,
        currentNum: null,    // 总页数,
        currentArr: []       // 显示的页码
    }
    this.$dom = {
        contentEl: null,
        childrenArr: [],
        arrowArr: [],
        FLArr: [],
        buttonArr: []
    }
    // data
    this.initData()
    this.getCurrnetArr()
    // create
    this.createNPElement()
    this.createFLElement()
    this.createArrowElement()
    this.createPageElement()
    // css
    this.createElementCss()
    // event
    this.event()
    // set
    this.setCurrentArr()
    console.log(this)

}

Pagination.prototype.initData = function () {
    this.$data.currentNum = this.option.total / this.option.pageSize
}
// 创建CurrentArr数组
Pagination.prototype.getCurrnetArr = function () {
    let arr = []
    let current = this.$data.current
    let currentNum = this.$data.currentNum
    // 计算页数

    if (currentNum <= 5) {
        for(let i = 1;i <= currentNum;i++){
            arr.push(i)
        }
        arr.unshift(false)
        arr.push(false)
    }

    else {
        // 首先计算current左右的页数
        arr.push(current)

        // 左侧
        if (current > 4) {
            arr.unshift(true, current - 2, current - 1)
            // 靠近左面
        } else {
            // 一把梭
            arr = []
            for (let i = 1; i < 6; i++) {
                arr.push(i)
            }
            arr.unshift(false)
            arr.push(true)
        }

        // 右侧
        if (current < currentNum - 3 && arr.length !== 7) {
            arr.push(current + 1, current + 2, true)

            // 靠近右边    
        } else if (arr.length !== 7) {
            // 一把梭
            arr = []
            for (let i = currentNum; i > currentNum - 5; i--) {
                arr.unshift(i)
            }
            arr.unshift(true)
            arr.push(false)

        }

        // 添加首页数和尾页数 跳转箭头
        // 是否为首
        // if(arr)


    }
    this.$data.currentArr = arr


}
// 调用CurrentArr数组 渲染元素
Pagination.prototype.setCurrentArr = function () {
    this.getCurrnetArr()
    // css
    this.$data.currentArr.forEach((val, index, arr) => {
        if (index === 0 || index === arr.length - 1 && typeof val === 'boolean') {
            if (val) {
                let obj = this.$dom.childrenArr[index]

                obj['button'].classList.remove('notAllowed')
                obj['arrow'].classList.remove('hidden')
                obj['fl'].classList.remove('hidden')
            } else {
                let obj = this.$dom.childrenArr[index]
                // 略复杂
                if (index === 0) {
                    if (this.$data.current === 1) {
                        obj['button'].classList.add('notAllowed')
                    } else {
                        obj['button'].classList.remove('notAllowed')
                    }
                } else if (index === arr.length - 1) {
                    if (this.$data.current === this.$data.currentNum) {
                        obj['button'].classList.add('notAllowed')
                    } else {
                        obj['button'].classList.remove('notAllowed')
                    }
                } else {
                    obj['button'].classList.add('notAllowed')
                }
                obj['arrow'].classList.add('hidden')
                obj['fl'].classList.add('hidden')

            }
        } else {
            this.$dom.childrenArr[index].innerText = val
            // data-num
            this.$dom.childrenArr[index].setAttribute('data-num', val)
            // 
            if (Number(this.$dom.childrenArr[index].getAttribute('data-num')) === this.$data.current) {
                this.$dom.childrenArr[index].classList.add('actionCss')
            } else {
                this.$dom.childrenArr[index].classList.remove('actionCss')
            }

        }

    })


}
// 修改current 
Pagination.prototype.setCurrent = function (num) {
    this.$data.current = Number(num)
    // 执行事件
    this.eventFn.forEach(fn=>{
        fn(this.$data.current)
    })
}



/**
 * 
 */
// 创建页符元素
Pagination.prototype.createPageElement = function () {
    // createContent
    this.$dom.contentEl = document.createElement('ul')
    // childrenArr
    this.$dom.childrenArr = this.$data.currentArr.map((val, index) => {
        if (typeof val === 'number') {
            let el = document.createElement('li')
            let text = document.createTextNode(val)
            el.setAttribute('data-num', val)
            el.appendChild(text)
            return el
        } else if (typeof val === 'boolean') {
            if (index === 0) {
                // return [this.$dom.buttonArr[0], this.$dom.FLArr[0], this.$dom.arrowArr[0]]
                return {
                    button: this.$dom.buttonArr[0],
                    arrow: this.$dom.arrowArr[0],
                    fl: this.$dom.FLArr[0]
                }
            } else {
                // return [this.$dom.arrowArr[1], this.$dom.FLArr[1], this.$dom.buttonArr[1]]
                return {
                    button: this.$dom.buttonArr[1],
                    arrow: this.$dom.arrowArr[1],
                    fl: this.$dom.FLArr[1],
                }
            }

        }

    })

    // render 渲染
    this.$dom.childrenArr.forEach((element, index) => {
        if (typeof element === 'object' && element.button) {
            if (index === 0) {
                this.$dom.contentEl.appendChild(element['button'])
                this.$dom.contentEl.appendChild(element['fl'])
                this.$dom.contentEl.appendChild(element['arrow'])
            } else {
                this.$dom.contentEl.appendChild(element['arrow'])
                this.$dom.contentEl.appendChild(element['fl'])
                this.$dom.contentEl.appendChild(element['button'])
            }
        }
        else {
            this.$dom.contentEl.appendChild(element)
        }

    })
    this.el.appendChild(this.$dom.contentEl)

}
// 创建翻页元素
Pagination.prototype.createArrowElement = function () {
    let elementArr = []
    let doubleArr = this.createDoubleArrowElement()
    for (let i = 0; i < 2; i++) {
        let arrowEl = document.createElement('div')
        let arrowText = document.createTextNode('•••')
        // data-arrow
        if (i === 0) {
            arrowEl.setAttribute('data-arrow', 'left')
            arrowEl.appendChild(doubleArr[0])
        } else {
            arrowEl.setAttribute('data-arrow', 'right')
            arrowEl.appendChild(doubleArr[1])
        }

        arrowEl.appendChild(arrowText)
        elementArr.push(arrowEl)
    }
    this.$dom.arrowArr = elementArr
}
//
Pagination.prototype.createDoubleArrowElement = function () {
    let elementArr = []
    let svgLeft = `<svg data-arrow='left' viewBox="64 64 896 896" focusable="false" class="" data-icon="double-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path></svg>`
    let svgRight = `<svg data-arrow='right' viewBox="64 64 896 896" focusable="false" class="" data-icon="double-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path></svg>`

    for (let i = 0; i < 2; i++) {
        let el = document.createElement('span')
        el.classList.add('doubleArrowCss')
        if (i === 0) {
            el.setAttribute('data-arrow','left')
            el.innerHTML = svgLeft
        } else {
            el.setAttribute('data-arrow','right')
            el.innerHTML = svgRight
        }
        elementArr.push(el)
    }
    return elementArr
}
// 创建首页 尾页
Pagination.prototype.createFLElement = function () {
    let element = []

    for (let i = 0; i < 2; i++) {
        let el = document.createElement('li')
        let text = null
        // data-num
        if (i === 0) {
            el.setAttribute('data-num', 1)
            text = document.createTextNode(1)
        } else {
            el.setAttribute('data-num', this.$data.currentNum)
            text = document.createTextNode(this.$data.currentNum)
        }

        el.appendChild(text)
        element.push(el)
    }

    this.$dom.FLArr = element
}
// 创建上一页 下一页
Pagination.prototype.createNPElement = function () {
    let element = []
    for (let i = 0; i < 2; i++) {
        let el = document.createElement('li')
        let text = null
        // data-botton
        if (i === 0) {
            el.setAttribute('data-button', 'prev')
            el.innerHTML = `<svg data-button='prev' viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>`
            // text = document.createTextNode('<')
            el.classList.add('buttonDefCss')
        } else {
            el.setAttribute('data-button', 'next')
            el.innerHTML = `<svg data-button='next' viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>`
            // text = document.createTextNode('>')
            el.classList.add('buttonDefCss')
        }

        // el.appendChild(text)
        element.push(el)
    }

    this.$dom.buttonArr = element

}
// 添加Css
Pagination.prototype.createElementCss = function () {
    // el
    this.el.classList.add('crash-pagination')
    // content 
    this.$dom.contentEl.classList.add('contentDefCss')
    // children
    this.$dom.childrenArr.forEach(ele => {
        if (!ele.button) {
            ele.classList.add('chilDefCss')
        }
    })
    // FLArr
    this.$dom.FLArr.forEach(ele => {
        ele.classList.add('chilDefCss')
    })
    // arrow
    this.$dom.arrowArr.forEach((ele, index) => {
        if (index === 0) {
            ele.classList.add('arrowLeftDefCss')
        }
        if (index === 1) {
            ele.classList.add('arrowRightDefCss')
        }

    })
    // NP
    this.$dom.buttonArr.forEach(ele => {
        ele.classList.add('chilDefCss')
    })


}

/**
 * 
 */
Pagination.prototype.event = function () {
    this.onClick = function (ev) {
        let el = ev.target
        let current = this.$data.current
        // 
        if (el.classList.contains('notAllowed')) return

        // data button
        if (el.getAttribute('data-button')) {
            let dataButton = el.getAttribute('data-button')
            // 上一页
            if (dataButton === 'prev') {
                if (current === 1) return
                this.setCurrent(current - 1)
                // 下一页
            } else if (dataButton === 'next') {
                if (current === this.$data.currentNum) return
                this.setCurrent(current + 1)
            }

        }
        // data arrow
        if (el.getAttribute('data-arrow')) {
            let dataArrow = el.getAttribute('data-arrow')
            // 向前五页
            if (dataArrow === 'left') {
                if (current <= 6) {
                    this.setCurrent(1)
                } else {
                    this.setCurrent(current - 5)
                }
            } else if (dataArrow === 'right') {
                if (current > this.$data.currentNum - 5) {
                    this.setCurrent(this.$data.currentNum)
                } else {
                    this.setCurrent(current + 5)
                }
            }
        }
        // data num
        if (el.getAttribute('data-num')) {
            let dataNum = el.getAttribute('data-num')

            if (Number(dataNum) === current) return
            this.setCurrent(dataNum)

        }

        // 渲染
        this.setCurrentArr()

    }
    this.$dom.contentEl.addEventListener('click', this.onClick.bind(this))
}
Pagination.prototype.remove = function () {
    this.$dom.contentEl.removeEventListener('click', this.onClick.bind(this))
    this.eventFn = []
}
//
Pagination.prototype.onChange = function (fn) {
    if(typeof fn === 'function'){
        this.eventFn.push(fn)
    }
}
