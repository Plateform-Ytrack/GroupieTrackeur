let links = document.querySelectorAll('.link')

links[0].addEventListener('click', () => {
    if (links[0].classList[1] != 'active') {
        for (let link of links) {
            link.style.width = "60px"
            link.classList.remove('active')
        }
        let link = links[0]
        link.classList.add('active')
        let activeWidth = link.clientWidth
        link.style.width = activeWidth + "px"
    }
})
links[1].addEventListener('click', () => {
    if (links[1].classList[1] != 'active') {
        for (let link of links) {
            link.style.width = "60px"
            link.classList.remove('active')
        }
        let link = links[1]
        link.classList.add('active')
        let activeWidth = link.clientWidth
        link.style.width = activeWidth + "px"
    }
})
links[2].addEventListener('click', () => {
    if (links[2].classList[1] != 'active') {
        for (let link of links) {
            link.style.width = "60px"
            link.classList.remove('active')
        }
        let link = links[2]
        link.classList.add('active')
        let activeWidth = link.clientWidth
        link.style.width = activeWidth + "px"
    }
})
links[3].addEventListener('click', () => {
    if (links[3].classList[1] != 'active') {
        for (let link of links) {
            link.style.width = "60px"
            link.classList.remove('active')
        }
        let link = links[3]
        link.classList.add('active')
        let activeWidth = link.clientWidth
        link.style.width = activeWidth + "px"
    }
})
