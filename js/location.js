console.log("Script display loaded")

fetch("api/artists")
    .then((response) => response.json())
    .then(geo)

let lastLocation = ""
let preLocation = ""

function geo(artists) {
    for (let artist of artists) {
        let nameSelect = artist['name']
        let id = artist['id']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option value="'+ id + '">' + nameSelect + '</option>');
    }; 
};

function APIRelation(relations) {
    // console.log(relations);
    relationsGroupe = JSON.parse(relations)
    var lastDate = ""
    let dates = []
    let i = 0
    let preDate = ""
    
    for (locations in relationsGroupe['datesLocations']){
        relationsGroupe['datesLocations'][locations].forEach(date => {
            dates.push(date)
        });
    }
    dates.sort(function(a, b){
        let dateA = new Date(a.split("-").reverse().join("-"))
        let dateB = new Date(b.split("-").reverse().join("-"))
        return dateA - dateB
    })
    preDate = dates[dates.length - 2]
    lastDate = dates[dates.length - 1]
    for (locations in relationsGroupe['datesLocations']){
        relationsGroupe['datesLocations'][locations].forEach(date => {
            if (date == preDate) {
                preLocation = locations.split(/-|_/).join(" ")
            }
            if (date == lastDate) {
                lastLocation = locations.split(/-|_/).join(" ")
            }
        });
    }
    document.getElementById('section_text1').insertAdjacentHTML('beforeEnd',preDate);
    document.getElementById('section_text2').insertAdjacentHTML('beforeEnd',preLocation);
    document.getElementById('section_text3').insertAdjacentHTML('beforeEnd',lastDate);
    document.getElementById('section_text4').insertAdjacentHTML('beforeEnd',lastLocation);
};

if (responseRelation) {
    APIRelation(responseRelation)
}