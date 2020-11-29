const header = document.querySelector('.header')
const navButton = document.querySelector('#navButton')
const nav = document.querySelector('.header__nav')
const userSection = document.querySelector('.user__div')
const actionSection = document.querySelector('.actions__div')
let profileImage = document.querySelector('.profile__image')
let tabNavProfileContainer = document.querySelector('.nav-user__profile')
let tabNavProfileContainerClassList = tabNavProfileContainer.classList

let config = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

let callback = (entries) => {

    entries.forEach(entry => {
        let screenSize = window.screen.width
        if (screenSize >= 768 && entry.intersectionRatio === 0) {
            tabNavProfileContainerClassList.add('nav-user__profile--flex')
            console.log(entry.intersectionRatio);
        } else {
            tabNavProfileContainerClassList.remove('nav-user__profile--flex')
        }
    });
};
let observer = new IntersectionObserver(callback, config);

observer.observe(profileImage)
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