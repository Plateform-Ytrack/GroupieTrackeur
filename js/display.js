console.log("Script display loaded")

fetch("api/artists")
    .then((response) => response.json())
    .then(loadData)

function loadData(artists) {
    for (artist of artists) {
        makeCard(artist)
    }
}

function makeCard(artist) {
    let members
    let beforeMembers = document.createElement('p')
    beforeMembers.className = 'beforeMembers'
    if (artist.members.length == 1) {
        let p = document.createElement('p')
        p.innerText += artist.members[0]
        members = p
        beforeMembers.innerText += "Full Name :"

    } else {
        let list = document.createElement('ul')
        for (member of artist.members) {
            let line = document.createElement('li')
            line.innerText += member
            list.appendChild(line)
        }
        members = list
        beforeMembers.innerText += "Members :"

    }
    members.classList.add('members')

    let card = document.createElement('div')
    card.className = 'card'
    let url = "url('" + artist.image + "')"
    //card.style.background = url
    // card.style.backgroundRepeat = "no-repeat"
    // card.style.backgroundSize = "contain"
    // card.style.backgroundPosition = "0 20%"
    let image = document.createElement('img')
    image.className = 'image'
    image.setAttribute("src", artist.image)
    let beforeDate = document.createElement('p')
    beforeDate.innerText += "Creation date :"
    beforeDate.className = 'beforeDate'

    let firstAlbum = document.createElement('p')
    firstAlbum.innerText += artist.firstAlbum
    firstAlbum.className = 'firstAlbum'
    let beforeAlbum = document.createElement('p')
    beforeAlbum.innerText += "First Album :"
    beforeAlbum.className = 'beforeAlbum'

    let creationDate = document.createElement('p')
    creationDate.innerText += artist.creationDate 
    creationDate.className = 'creationDate'
    card.setAttribute("onclick", "cardOnClick(this)")
    let text = document.createElement('div')
    text.className = 'text'
    let textContent = document.createElement('div')
    textContent.className = 'text-content'
    let title = document.createElement('h1')
    title.innerText += artist.name
    title.className = 'title'
    let bodyText = document.createElement('div')
    bodyText.className = 'body-text'

    let buttonForm = document.createElement('form')
    buttonForm.setAttribute("method", "post")
    buttonForm.setAttribute("action", "/button")
    let datesButton = document.createElement('button')
    datesButton.innerText += "Dates"
    datesButton.className = 'datesButton'
    datesButton.setAttribute("name", "dates")
    datesButton.setAttribute("value", artist.id)
    let locationButton = document.createElement('button')
    locationButton.innerText += "Location"
    locationButton.className = 'locationButton'
    locationButton.setAttribute("name", "location")
    locationButton.setAttribute("value", artist.id)
    buttonForm.appendChild(datesButton)
    buttonForm.appendChild(locationButton)

    card.appendChild(text)
    card.appendChild(image)
    card.appendChild(beforeMembers)
    card.appendChild(members)
    text.appendChild(textContent)
    textContent.appendChild(title)
    textContent.appendChild(bodyText)
    card.appendChild(beforeDate)
    card.appendChild(creationDate)
    card.appendChild(beforeAlbum)
    card.appendChild(firstAlbum)
    // card.appendChild(datesButton)
    // card.appendChild(locationButton)
    card.appendChild(buttonForm)
    card.innerHTML += `<svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 35" width="30"><path d="M5 30L50 5l45 25" fill="none" stroke="#000" stroke-width="5"/></svg>`
    document.querySelector('.cards').appendChild(card)

    let svg = document.querySelectorAll('.chevron')[document.querySelectorAll('.chevron').length - 1]
    //document.querySelectorAll('.card')[document.querySelectorAll('.card').length - 1].insertBefore(members, svg)
    
}

function cardOnClick(el) {
    el.classList.toggle('expanded')
    el.querySelector('.text').classList.toggle('displayed')
    el.querySelector('.members').classList.toggle('displayed')
    el.querySelector('.image').classList.toggle('expanded')
    el.querySelector('.beforeMembers').classList.toggle('displayed')
    el.querySelector('.beforeDate').classList.toggle('displayed')
    el.querySelector('.creationDate').classList.toggle('displayed')
    el.querySelector('.beforeAlbum').classList.toggle('displayed')
    el.querySelector('.firstAlbum').classList.toggle('displayed')
    el.querySelector('.datesButton').classList.toggle('displayed')
    el.querySelector('.locationButton').classList.toggle('displayed')

}