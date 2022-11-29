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
    categorias.forEach(categoria => {
        categoriaList += `<h5 class="category_list" id="${categoria.id}">${categoria.name}</h5>`
    })
    document.getElementById("hotel__names").innerHTML = categoriaList;
}


const createMarker = (hotel) => {
    let coord = new google.maps.LatLng(hotel.lat, hotel.lng)

    const marker = new google.maps.Marker({
        position: coord,
        map: map,
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
    $("h2").html(data.name)
    $("p").html(data.categoria) 
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
    let barcelona = { lat: 41.390205, lng: 2.154007 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: barcelona,
        zoom: 14,
        mapId: "91e19ecfb6228618"
    })

    createLocationMarkers();
    displayListCategories()
    setListener();
}