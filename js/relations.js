function recupGroupes(artists) {
    group = JSON.parse(artists)
    console.log(group);
    for (let artist of group) {
        let nameSelect = artist['name']
        console.log(nameSelect);
        let id = artist['id']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option value="'+ id + '">' + nameSelect + '</option>');
    }; 
};

function APIRelation(relations) {
    relationsGroupe = JSON.parse(relations)
    let dates = []
    
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
    document.getElementsByClassName('informations').insertAdjacentHTML('beforeEnd','<p>' + dates + '</p>');
};

recupGroupes(responseData)
if (responseRelation) {
    APIRelation(responseRelation)
}