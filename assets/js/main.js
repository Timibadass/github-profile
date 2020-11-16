const header = document.querySelector('.header')
const navButton = document.querySelector('#navButton')
const nav = document.querySelector('.header__nav')
const userSection = document.querySelector('.user__div')
const actionSection = document.querySelector('.actions__div')

navButton.addEventListener('click', (e) => { toggleNav(e) })

function toggleNav(e) {
    e.preventDefault()
    let headerClassList = header.classList
    let navClassList = nav.classList
    let userSectionClassList = userSection.classList
    let actionSectionClassList = actionSection.classList
    if (headerClassList.value.includes('header--open')) {
        headerClassList.remove('header--open')
        navClassList.remove('mobile__nav--visible')
        userSectionClassList.remove('mobile__nav--visible-flex')
        actionSectionClassList.remove('mobile__nav--visible-flex')
    } else {
        headerClassList.add('header--open')
        navClassList.add('mobile__nav--visible')
        userSectionClassList.add('mobile__nav--visible-flex')
        actionSectionClassList.add('mobile__nav--visible-flex')
    }


}