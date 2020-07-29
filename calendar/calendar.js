import './calendar.css'

function Calendar(el) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.$Date = new Date()
    this.$data = {
        todayDate: new Date(),
        year: null,       // 年份
        month: null,        // 月份
        dateNum: null,       // 总天数
        today: null,        // 今天日期
        day: null,           // 星期数
        beforeDataNum: null, // 上月总天数
        fristDay: null      // 本月第一天的星期数    

    }
    this.$dom = {
        contentEl: null,
        // header
        headerEl: null,
        headerNameEl: null,
        arrowEl: [],
        doubleArrowEl: [],
        // body
        bodyEl: null,
        tableEl: null,
        theadEl: null,
        tbodyEl: null,
        //
        tdElArr: [],
        // actionEl
        actionEl: null
    }
    this.$dataArr = []
    // 选中的日期
    this.actionDate = null
    //
    this.onChangeArr = []
    //
    this.initData()
    this.ininDateArr()
    // create 
    this.createHeader()
    this.createBody()
    this.createContent()
    // css
    this.createElementCss()
    // render
    this.renderTdEl()
    // event
    this.Event()



    // console.log(this)
}
// initData
Calendar.prototype.initData = function () {
    let _Date = this.$data.todayDate
    this.$data.year = _Date.getFullYear(),
        this.$data.month = _Date.getMonth(),
        this.$data.dateNum = new Date(this.$data.year, this.$data.month + 1, 0).getDate()
    this.$data.today = _Date.getDate()
    this.$data.day = _Date.getDay()
    this.$data.beforeDataNum = new Date(this.$data.year, this.$data.month, 0).getDate()
    this.$data.fristDay = new Date(this.$data.year, this.$data.month, 1).getDay()

}
// initDateArr
Calendar.prototype.ininDateArr = function () {
    this.$dataArr = []
    // 一共六行
    // 
    for (let i = 0; i < this.$data.dateNum; i++) {
        this.$dataArr.push(i + 1)
    }
    // 补充首行
    for (let i = 0; i < this.$data.fristDay - 1; i++) {
        this.$dataArr.unshift(this.$data.beforeDataNum - i)
    }
    // 补完尾数
    for (let i = 1; this.$dataArr.length < 6 * 7; i++) {
        this.$dataArr.push(i)
    }


}


/**********
 * CREATE *
 **********/

// create content
Calendar.prototype.createContent = function () {
    let el = document.createElement('div')
    el.appendChild(this.$dom.headerEl)
    el.appendChild(this.$dom.bodyEl)

    this.$dom.contentEl = el
    this.el.appendChild(this.$dom.contentEl)

}
/**
 * header
 */
// create header
Calendar.prototype.createHeader = function () {
    let el = document.createElement('div')

    // 
    this.createArrow()
    this.createDoubleArrow()
    this.createHeaderName()
    //
    for (let i = 0; i < 3; i++) {
        if (i === 1) {
            el.appendChild(this.$dom.headerNameEl)
        } else if (i === 0) {
            el.appendChild(this.$dom.doubleArrowEl[0])
            el.appendChild(this.$dom.arrowEl[0])
        } else if (i === 2) {
            el.appendChild(this.$dom.arrowEl[1])
            el.appendChild(this.$dom.doubleArrowEl[1])
        }
    }
    this.$dom.headerEl = el


}

// create arrow
Calendar.prototype.createArrow = function () {
    let element = []

    for (let i = 0; i < 2; i++) {
        let el = document.createElement('div')
        if (i === 0) {
            el.setAttribute('data-button', 'arrowLeft')
            el.innerHTML = `<svg data-button="prev" viewBox="64 64 896 896" focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>`
        } else {
            el.setAttribute('data-button', 'arrowRight')
            el.innerHTML = `<svg data-button="next" viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>`
        }

        element.push(el)
    }

    this.$dom.arrowEl = element

}

// create doubleArrow
Calendar.prototype.createDoubleArrow = function () {
    let element = []
    for (let i = 0; i < 2; i++) {
        let el = document.createElement('div')
        if (i === 0) {
            el.setAttribute('data-button', 'doubleArrowLeft')
            el.innerHTML = `<svg data-arrow="left" viewBox="64 64 896 896" focusable="false" class="" data-icon="double-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path></svg>`
        } else {
            el.setAttribute('data-button', 'doubleArrowRight')
            el.innerHTML = `<svg data-arrow="right" viewBox="64 64 896 896" focusable="false" class="" data-icon="double-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path></svg>`
        }
        element.push(el)
    }

    this.$dom.doubleArrowEl = element

}

// create headerName 
Calendar.prototype.createHeaderName = function () {
    let el = document.createElement('div')
    this.$dom.headerNameEl = el
}

/**
 * body
 */
// create body
Calendar.prototype.createBody = function () {
    let el = document.createElement('div')
    //
    this.createTable()
    //
    el.appendChild(this.$dom.tableEl)

    this.$dom.bodyEl = el

}
// create table
Calendar.prototype.createTable = function () {
    let el = document.createElement('table')

    this.createThead()
    this.createTbody()

    this.$dom.tableEl = el

    this.$dom.tableEl.appendChild(this.$dom.theadEl)
    this.$dom.tableEl.appendChild(this.$dom.tbodyEl)
}
// create thead
Calendar.prototype.createThead = function () {
    let el = document.createElement('thead')
    let data = ['一', '二', '三', '四', '五', '六', '日']

    let trEl = document.createElement('tr')

    data.forEach(val => {
        let thEl = document.createElement('th')
        thEl.innerText = val
        trEl.appendChild(thEl)
    })

    el.appendChild(trEl)
    this.$dom.theadEl = el

}

// create tbody
Calendar.prototype.createTbody = function () {
    let el = document.createElement('tbody')
    let trEl = null
    this.$dom.tdElArr = this.$dataArr.map((val, index) => {
        if (index % 7 === 0) trEl = document.createElement('tr')
        let tdEl = document.createElement('td')
        let div = document.createElement('div')
        tdEl.appendChild(div)
        trEl.appendChild(tdEl)
        el.appendChild(trEl)
        return div

    })
    this.$dom.tbodyEl = el

}

// CSS
Calendar.prototype.createElementCss = function () {
    // el
    this.el.classList.add('crash-calendar')
    // content
    this.$dom.contentEl.classList.add('contentDefCss')
    // header
    this.$dom.headerEl.classList.add('headerDefCss')
    this.$dom.headerNameEl.classList.add('headerNameDefCss')
    this.$dom.arrowEl.forEach(el => {
        el.classList.add('arrowDefCss')
    })
    this.$dom.doubleArrowEl.forEach(el => {
        el.classList.add('arrowDefCss')
    })
    // body
    this.$dom.bodyEl.classList.add('bodyDefCss')
    this.$dom.tableEl.classList.add('tableDefCss')

}


// 更新数据
Calendar.prototype.setDataArr = function () {
    this.initData()
    this.ininDateArr()
}
// 更新视图数据
Calendar.prototype.renderTdEl = function () {
    this.$dom.headerNameEl.innerText = `${this.$data.year}年 ${this.$data.month + 1}月`
    // 更新数据与CSS
    this.$dataArr.forEach((val, index) => {
        this.$dom.tdElArr[index].innerText = val
        // 上月
        if (index < this.$data.fristDay - 1) {
            // data-date
            if (this.$data.month !== 0) {
                this.$dom.tdElArr[index].setAttribute('data-date', `${this.$data.year}-${this.$data.month}-${val}`)
            } else {
                this.$dom.tdElArr[index].setAttribute('data-date', `${this.$data.year - 1}-${12}-${val}`)
            }
            // css
            this.$dom.tdElArr[index].classList.add('picker-cell')
            // todayCss actionCss
            this.$dom.tdElArr[index].classList.remove('todayDefCss')
            this.$dom.tdElArr[index].classList.remove('actionDefCss')
        }
        // 下月
        else if (index > this.$data.dateNum + this.$data.fristDay - (this.$data.fristDay === 0 ? 1 : 2)) {
            // data-date
            if (this.$data.month !== 11) {
                this.$dom.tdElArr[index].setAttribute('data-date', `${this.$data.year}-${this.$data.month + 2}-${val}`)
            } else {
                this.$dom.tdElArr[index].setAttribute('data-date', `${this.$data.year + 1}-${1}-${val}`)
            }
            // css
            this.$dom.tdElArr[index].classList.add('picker-cell')
            // todayCss actionCss
            this.$dom.tdElArr[index].classList.remove('todayDefCss')
            this.$dom.tdElArr[index].classList.remove('actionDefCss')
        }
        else {
            // data-date
            this.$dom.tdElArr[index].setAttribute('data-date', `${this.$data.year}-${this.$data.month + 1}-${val}`)
            // css
            this.$dom.tdElArr[index].classList.remove('picker-cell')
            // todayCss actionCss
            this.$dom.tdElArr[index].classList.remove('todayDefCss')
            this.$dom.tdElArr[index].classList.remove('actionDefCss')
        }

        // today
        if (this.$dom.tdElArr[index].getAttribute('data-date') === `${this.$Date.getFullYear()}-${this.$Date.getMonth() + 1}-${this.$Date.getDate()}`) {
            this.$dom.tdElArr[index].classList.add('todayDefCss')
        }
        // 选中的action
        if (this.actionDate === this.$dom.tdElArr[index].getAttribute('data-date')) {
            this.$dom.actionEl = this.$dom.tdElArr[index]
            this.$dom.tdElArr[index].classList.add('actionDefCss')
        }

    })


}

// 修改年份
Calendar.prototype.setDate = function (year, month) {
    this.$data.todayDate = new Date(year, month)
    this.setDataArr()
    this.renderTdEl()
}

/*********
 * EVENT *
 *********/
// change事件
Calendar.prototype.onChange = function (fn) {
    this.onChangeArr.push(fn)
}

Calendar.prototype.Event = function () {
    // arrow
    this.$dom.arrowEl.forEach(el => {
        el.addEventListener('click', this.onClickArrow.bind(this))
    })
    this.$dom.doubleArrowEl.forEach(el => {
        el.addEventListener('click', this.onClickArrow.bind(this))
    })
    //

    this.$dom.tableEl.addEventListener('click', this.onClickAction.bind(this))


}

Calendar.prototype.remove = function () {
    // arrow
    this.$dom.arrowEl.forEach(el => {
        el.removeEventListener('click', this.onClickArrow.bind(this))
    })
    this.$dom.doubleArrowEl.forEach(el => {
        el.removeEventListener('click', this.onClickArrow.bind(this))
    })
    //
    this.$dom.tableEl.removeEventListener('click', this.onClickAction.bind(this))

    this.onChangeArr = []

}

// arrowEvent
Calendar.prototype.onClickArrow = function (ev) {
    let el = ev.currentTarget
    let dataButton = el.getAttribute('data-button')
    if (dataButton === 'arrowLeft') {
        if (this.$data.month !== 0) {
            this.setDate(this.$data.year, this.$data.month - 1)
        } else {
            this.setDate(this.$data.year - 1, 11)
        }

    } else if (dataButton === 'arrowRight') {
        if (this.$data.month !== 12) {
            this.setDate(this.$data.year, this.$data.month + 1)
        } else {
            this.setDate(this.$data.year + 1, 0)
        }

    } else if (dataButton === 'doubleArrowLeft') {
        this.setDate(this.$data.year - 1, this.$data.month)
    } else if (dataButton === 'doubleArrowRight') {
        this.setDate(this.$data.year + 1, this.$data.month)
    }

}

// actionEvent
Calendar.prototype.onClickAction = function (ev) {
    let el = ev.target
    let dataDate = el.getAttribute('data-date')
    if (!dataDate) return
    // 如果点击的是上个月或下个月
    if (el.classList.contains('picker-cell')) {
        let data = dataDate.split('-')
        this.actionDate = dataDate
        // this.$dom.actionEl = el

        this.setDate(data[0], data[1] - 1)
        // 
        this.onChangeArr.forEach(fn => {
            fn(this.actionDate)
        })

        return
    }

    // actionEl
    if (this.$dom.actionEl) this.$dom.actionEl.classList.remove('actionDefCss')
    el.classList.add('actionDefCss')
    this.$dom.actionEl = el
    this.actionDate = dataDate

    this.onChangeArr.forEach(fn => {
        fn(this.actionDate)
    })


}

export default Calendar