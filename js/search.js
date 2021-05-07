console.log("Script search loaded")

artists = artists.slice(1, artists.length -1).split("  ")

const searchBar = document.querySelector('#searchInput');
const suggestions = document.querySelector('.suggestions')

searchBar.addEventListener('keyup', (e) => {
    if (searchBar.value != "") {
        filterSuggestion(searchBar.value.toLowerCase())
    } else {
        suggestions.innerHTML = ""
    }
})

function filterSuggestion(searchString) {
    suggestions.innerHTML = ""
    
    for (let artist of artists) {
        let artistInTab = artist.split(' ')
        if (artistInTab != undefined) {
            for (let word of artistInTab) {
                if (searchString == word.substr(0, searchString.length).toLowerCase()) {
                    makeLine(artist)
                    break
                }
            } 
        } else if (searchString == artist.substr(0, searchString.length).toLowerCase()) {
            makeLine(artist)
        }
    }
}

function makeLine(artist) {

    let line = document.createElement('li')
    line.innerText += artist
    line.className = "lineSuggestions"

    suggestions.appendChild(line)
}