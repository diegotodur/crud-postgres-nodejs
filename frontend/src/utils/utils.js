document.getElementById("insertar").addEventListener("submit", function (e) {
    e.preventDefault();
    const payload = prepararData(e);
    axios.post("http://localhost:4000/ejercicios", payload).then((res) => {
        res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
    });
});

document.getElementById("editar").addEventListener("submit", function (e) {
    e.preventDefault();
    const payload = prepararData(e, true);
    axios.put("http://localhost:4000/ejercicios", payload).then((res) => {
        res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
    });
});

document.getElementById("eliminar").addEventListener("submit", function (e) {
    e.preventDefault();
    const elemento = e.target.querySelector("select");
    const selectedIndex = elemento.selectedIndex;
    const id = elemento.options[selectedIndex].id;
    axios
        .delete("http://localhost:4000/ejercicios?id=" + id)
        .then((res) => {
            res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
        });
});

function prepararData(e, includeId = false) {
    const elemento = e.target.querySelector("select");
    let id = null;
    if (elemento && includeId) {
        const selectedIndex = elemento.selectedIndex;
        id = elemento.options[selectedIndex].id;
    }
    const nombre = e.target[1].value;
    const series = e.target[2].value;
    const repeticiones = e.target[3].value;
    const descanso = e.target[4].value;
    return includeId ? { id, nombre, series, repeticiones, descanso } : { nombre, series, repeticiones, descanso };
}

function cleanInputs(e) {
    if (e.target[3]) {
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = "";
        e.target[4].value = "";
    }
}
async function getData(e) {
    if (e) cleanInputs(e);
    const data = await axios.get("http://localhost:4000/ejercicios");
    const ejercicios = data.data;
    console.log(ejercicios)
    let tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    ejercicios.forEach((e) => {
        tbody.innerHTML += `
        <tr>
        <td>${e.nombre}</td>
        <td>${e.series}</td>
        <td>${e.repeticiones}</td>
        <td>${e.descanso} segundos</td>
        </tr>
        `;
    });
    let selectores = document.getElementsByTagName("select");
    selectores[0].innerHTML =
        "<option selected disabled>Seleccione un ejercicio</option>";
    selectores[1].innerHTML =
        "<option selected disabled>Seleccione un ejercicio</option>";

    ejercicios.forEach((e, i) => {
        selectores[0].innerHTML += `
        <option value="${e.nombre}" id="${e.id}">${e.nombre}</option>
        `;
    });
    ejercicios.forEach((e, i) => {
        selectores[1].innerHTML += `
        <option value="${e.nombre}" id="${e.id}">${e.nombre}</option>
        `;
    });
}
getData();