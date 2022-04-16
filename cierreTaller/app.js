let dataStars = []
let url = "https://swapi.dev/api/people"

const getDatosStars = async () => {
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data;
    } catch(error) {
        return error
    }
}

getDatosStars().then((respuesta) => {
    dataStars = [ ...respuesta.results ]
    console.log(dataStars);
    cargarAcordeon(dataStars);
});

const cargarAcordeon = (array) => {
    document.querySelector('#accordionExample').innerHTML = ""

    array.map((personaje, index) => {
        const { name, birth_year, gender, mass, hair_color, height, homeworld } = personaje
        const div = document.createElement("div")
        div.classList = "accordion-item";
        
        let contenido = `        
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                    ${name}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" 
            data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <h3><strong> Data </strong></h3>
                    <strong> Birth year: </strong>${birth_year}<br>
                    <strong> Gender:  </strong>${gender}<br>
                    <strong> Hair color:  </strong>${hair_color}<br>
                    <strong> Height:  </strong>${height}<br>
                    <strong> Mass:  </strong>${mass}<br>
                    <strong> Planet:  </strong>
                    <button onclick="obtenerHomeWorld('${homeworld}')" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-success" >View
                    </button>  

                </div>
            </div>        
        `
        div.innerHTML = contenido
        document.querySelector("#accordionExample").appendChild(div)
    })
}
const obtenerHomeWorld = (url) => {
    
    const getHomeWorld = async () => {
        try{
            const response = await fetch(url)
            const dataHome = await response.json()
            return dataHome;
        } catch(error) {
            return error
        }
    }
    let dataHome = []

    getHomeWorld().then((respuesta) => {
        dataHome = respuesta
        console.log(dataHome)
        let modal = document.querySelector('#exampleModal')
        modal.innerHTML = ''

        modal.innerHTML = ` 
                <div class="modal-dialog">
                <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${dataHome.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p><strong>Population</strong>: ${dataHome.population}</p>
                            <p><strong>Climate</strong>: ${dataHome.climate}</p>
                            <p><strong>Gravity</strong>: ${dataHome.gravity}</p>
                            <p><strong>Terrain</strong>: ${dataHome.terrain}</p>
                        </div>
                `;
        modal = new bootstrap.Modal(document.querySelector("#exampleModal"));
        modal.show();
    });    
}
