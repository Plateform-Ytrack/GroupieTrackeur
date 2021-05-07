package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

var t *template.Template

type artistStruct struct {
	Id           int      `json:"id"`
	Image        string   `json:"image"`
	Name         string   `json:"name"`
	Members      []string `json:"members"`
	CreationDate int      `json:"creationDate"`
	FirstAlbum   string   `json:"firstAlbum"`
	Locations    string   `json:"locations"`
	ConcertDates string   `json:"concertDates"`
	Relations    string   `json:"relations"`
}
type relationStruct struct {
	Id             int         `json:"id"`
	DatesLocations interface{} `json:"datesLocations"`
}

var artistsData []artistStruct
var artistsDataString []artistStruct
var relationsData []relationStruct

type dataStruct struct {
	Artists          []string
	ResponseRelation string
}

type Pagination struct {
	elements int
	page     int
}

type Filter struct {
	order int
}

type Search struct {
	searchInput string
}

var data dataStruct
var pagination Pagination
var filter Filter
var search Search

func main() {
	pagination.elements = 0
	pagination.page = 1
	filter.order = -1
	search.searchInput = ""
	loadArtistsString()

	t = template.Must(template.ParseFiles("templates/index.html"))
	// Importation des fichiers statiques :
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))

	// Accès aux pages :
	http.Handle("/", http.NotFoundHandler())
	http.HandleFunc("/home", home)
	http.Handle("/home/", http.NotFoundHandler())
	http.HandleFunc("/artists", artists)
	http.Handle("/artists/", http.NotFoundHandler())
	http.HandleFunc("/dates", dates)
	http.Handle("/dates/", http.NotFoundHandler())
	http.HandleFunc("/locations", locations)
	http.Handle("/locations/", http.NotFoundHandler())

	// Methods
	http.HandleFunc("/button", artistButton)

	// Accès aux données d'API :
	http.HandleFunc("/api/artists", artistsAPI)
	http.HandleFunc("/api/relations", relationsAPI)

	// Port :
	http.ListenAndServe(":8000", nil)

	fmt.Println("Server successfully runned") // Serveur exécuté avec succès
}

func home(w http.ResponseWriter, req *http.Request) {

	tHome, err := template.ParseFiles("templates/home.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tHome.Execute(w, nil)
}

func artists(w http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		req.ParseForm()

		// Formulaire de pagination
		if req.FormValue("buttonPrevious") == "Previous" {
			if pagination.page != 1 {
				pagination.page--
			}

		} else if req.FormValue("buttonNext") == "Next" {
			if pagination.elements != 0 {
				if pagination.page < 52/pagination.elements+1 {
					pagination.page++
				}
			}

		} else if req.FormValue("paginationSelect") != "" {
			val, err := strconv.Atoi(req.FormValue("paginationSelect"))
			if err != nil {
				fmt.Println(err.Error())
				os.Exit(0)
			}
			pagination.elements = val
			pagination.page = 1
		}

		// Formulaire de tri/filtrage
		if req.FormValue("filterSelect") != "" {
			formValueInt, _ := strconv.Atoi(req.FormValue("filterSelect"))
			filter.order = formValueInt
		}

		// Formulaire de recherche
		if req.FormValue("searchInput") != "" {
			search.searchInput = req.FormValue("searchInput")
		}

	}

	tArtists, err := template.ParseFiles("templates/artists.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tArtists.Execute(w, data)
}

func dates(w http.ResponseWriter, req *http.Request) {
	tDates, err := template.ParseFiles("templates/dates.html")
	if err != nil {
		w.WriteHeader(400)
	}

	tDates.Execute(w, nil)
}

func locations(w http.ResponseWriter, req *http.Request) {
	tLocations, err := template.ParseFiles("templates/locations.html")
	if err != nil {
		w.WriteHeader(400)
	}
	if req.Method == "POST" {
		req.ParseForm()
		id := req.FormValue("name")
		apiRelation := "https://groupietrackers.herokuapp.com/api/relation/" + id
		data.ResponseRelation = loadAPIRelations(apiRelation)
	}
	tLocations.Execute(w, data)
}

func artistsAPI(w http.ResponseWriter, req *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	loadArtists()
	applySearch(search.searchInput)
	applyFilter(filter.order)
	applyPagination(pagination.elements, pagination.page)
	artistsDataBytes, _ := json.Marshal(artistsData)
	w.Write(artistsDataBytes)
}
func relationsAPI(w http.ResponseWriter, req *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	loadRelations()
	relationsDataBytes, _ := json.Marshal(relationsData)
	w.Write(relationsDataBytes)
}

func loadArtists() {
	response, errGet := http.Get("https://groupietrackers.herokuapp.com/api/artists")

	if errGet != nil {
		log.Fatal(errGet)
	}

	responseJson, errReadAll := ioutil.ReadAll(response.Body)
	if errReadAll != nil {
		log.Fatal(errReadAll)
	}

	errUnmarshal := json.Unmarshal(responseJson, &artistsData)
	if errUnmarshal != nil {
		fmt.Println(errUnmarshal)
		os.Exit(0)
	}
}
func loadRelations() {
	response, errGet := http.Get("https://groupietrackers.herokuapp.com/api/relation")

	if errGet != nil {
		log.Fatal(errGet)
	}

	responseJson, errReadAll := ioutil.ReadAll(response.Body)
	if errReadAll != nil {
		log.Fatal(errReadAll)
	}

	errUnmarshal := json.Unmarshal(responseJson, &relationsData)
	if errUnmarshal != nil {
		log.Fatal(errUnmarshal)
	}
}

func applyPagination(elements int, page int) {
	if elements != 0 {
		first := elements * (page - 1)
		last := elements * page
		if last > 52 {
			last = 52
		}
		artistsData = artistsData[first:last]
	}
}

func applyFilter(order int) {
	switch order {
	case 0:
		order = -1
		break
	case 1, 2:
		sort.SliceStable(artistsData, func(i, j int) bool {
			return artistsData[i].Name < artistsData[j].Name
		})
	case 3, 4:
		sort.SliceStable(artistsData, func(i, j int) bool {
			return len(artistsData[i].Members) > len(artistsData[j].Members)
		})
	case 5, 6:
		sort.SliceStable(artistsData, func(i, j int) bool {
			dateI, _ := time.Parse("2006-01-02", strings.Join(reverseArray(strings.Split(artistsData[i].FirstAlbum, "-")), "-"))
			dateJ, _ := time.Parse("2006-01-02", strings.Join(reverseArray(strings.Split(artistsData[j].FirstAlbum, "-")), "-"))
			dateIms := dateI.UnixNano() / 1000000
			dateJms := dateJ.UnixNano() / 1000000
			return dateIms > dateJms
		})
	case 7, 8:
		sort.SliceStable(artistsData, func(i, j int) bool {
			return artistsData[i].CreationDate > artistsData[j].CreationDate
		})
	}
	if order%2 == 0 {
		artistsData = reverseArrayAD(artistsData)
	}
}
func reverseArray(arr []string) []string {
	for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
		arr[i], arr[j] = arr[j], arr[i]
	}
	return arr
}
func reverseArrayAD(arr []artistStruct) []artistStruct {
	for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
		arr[i], arr[j] = arr[j], arr[i]
	}
	return arr
}

func applySearch(searchInput string) {
	searchInput = strings.ToLower(searchInput)

	if searchInput != "" {
		artistsData = nil
		for _, artistDataString := range artistsDataString {

			words := strings.Split(artistDataString.Name, " ")
			for _, word := range words {
				word = strings.ToLower(word)
				if len(searchInput) < len(word) {
					if searchInput == word[:len(searchInput)] {
						artistsData = append(artistsData, artistDataString)
						break
					}
				}
			}
		}
	}
}

func loadArtistsString() {
	response, errGet := http.Get("https://groupietrackers.herokuapp.com/api/artists")

	if errGet != nil {
		log.Fatal(errGet)
	}

	responseJson, errReadAll := ioutil.ReadAll(response.Body)
	if errReadAll != nil {
		log.Fatal(errReadAll)
	}

	errUnmarshal := json.Unmarshal(responseJson, &artistsDataString)

	if errUnmarshal != nil {
		log.Fatal(errUnmarshal)
	}

	for i := range artistsDataString {
		data.Artists = append(data.Artists, artistsDataString[i].Name+" ")
	}
}

func artistButton(w http.ResponseWriter, req *http.Request) {

	value := req.FormValue("location")
	if value == "" {
		value = req.FormValue("dates")
		tDates, err := template.ParseFiles("templates/dates.html")
		if err != nil {
			w.WriteHeader(400)
		}

		type buttonStruct struct{ name string }
		var structB buttonStruct
		structB.name = value

		tDates.Execute(w, structB)

	} else {
		tLocations, err := template.ParseFiles("templates/locations.html")
		if err != nil {
			w.WriteHeader(400)
		}
		type buttonStruct struct{ name string }
		var structB buttonStruct
		structB.name = value

		tLocations.Execute(w, structB)
	}
}

func loadAPIRelations(apiRelation string) string {
	response, errGet := http.Get(apiRelation)
	if errGet != nil {
		log.Fatal(errGet)
	}
	responseRelation, errReadAll := ioutil.ReadAll(response.Body)
	if errReadAll != nil {
		log.Fatal(errReadAll)
	}
	return string(responseRelation)
}
