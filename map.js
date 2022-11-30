let map;
let markers = [];

const setListener = () => {

    document.querySelectorAll(".category_list").forEach((category, index) => {
        category.addEventListener("click", (data) => {
            createLocationMarkers(data.srcElement.id)
        })
    })
}

//list categorias
const displayListCategories = () => {
    let categoriaList = "";
    categoriaList += `<h5 class="category_list" id="">TODOS</h5><hr>`
    categorias.forEach(categoria => {
        categoriaList += `<h5 class="category_list" id="${categoria.id}">${categoria.name}</h5><hr>`
    })
    document.getElementById("hotel__names").innerHTML = categoriaList;
}


const createMarker = (hotel) => {
    let coord = new google.maps.LatLng(hotel.lat, hotel.lng)
    let icon = ""

    if(hotel.categoria == 1){
        icon= "./icons/bus_stop.png"
     }else if(hotel.categoria == 2){
         icon= "./icons/search.png"
     }else{
         icon="./icons/luminaria.png"
     }
    const marker = new google.maps.Marker({
        position: coord,
        map: map,
        icon

        // icon: "./icons/marker.png"
    })


    google.maps.event.addListener(marker, "click", () => {
        showModal(hotel);
    })

    markers.push(marker)
}

// infoWindow.setContent(html);
// infoWindow.open(map, marker)

const showModal = (data) => {
    $("#myModal h2").html(data.name)
    $("#myModal h4").html(data.address)
    $("#myModal p").html(data.descripcion)
    $("#myModal img").attr("src",data.imagen) 
    $("#myModal").modal("show");
}

//borro los markers
const removeAllMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

const createLocationMarkers = (category = "") => {
    removeAllMarkers();

    let bounds = new google.maps.LatLngBounds();

    hotels.forEach(hotel => {
        if (category != "" && category != hotel.categoria) return;
        let coord = new google.maps.LatLng(hotel.lat, hotel.lng)
        bounds.extend(coord)
        createMarker(hotel);
    })
    map.fitBounds(bounds);
}

function initMap() {
    let barcelona = { lat: -31.4279700, lng: -62.0826600}
    map = new google.maps.Map(document.getElementById("map"), {
        center: barcelona,
        zoom: 14,
        mapId: "91e19ecfb6228618"
    })

    createLocationMarkers();
    displayListCategories()
    setListener();
}