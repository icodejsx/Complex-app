export default class Search {
    //    1. select dom element and keep track of any usefull data
    constructor() {
        this.headerSearchIcon = document.querySelector('.header-search-icon')
        this.events()
    }
    // 2.Events 
    events() {
        this.headerSearchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.openOverlay();
        })
    }

    // 3. methods
    openOverlay() {
        alert('open overlay just ran')
    }
}