let nombre1;

function nombre() {
    do {
        nombre1 = prompt("Ingrese su nombre");
    } while (!isNaN(nombre1) || nombre1.length > 10);
    console.log("Bienvenido " + nombre1)
}
nombre();

let destinoDePrestamo1;
let continuar = true;

//Funcion para definir el destino del prestamo

function destinoDePrestamo() {
    while (continuar) {
        destinoDePrestamo1 = prompt("Lo va a invertir en un vehiculo o propiedad?");
        switch (destinoDePrestamo1) {
            case "vehiculo":
                console.log("lo va a invertir en un vehiculo");
                continuar = false;
                break;
            case "propiedad":
                console.log("lo va a invertir en una propiedad");
                continuar = false;
                break;
        }
    }
}
destinoDePrestamo();

let cantidad1;

//Funcion para prestamo y cuotas

function prestamo() {
    do {
        cantidad1 = parseInt(prompt("ingresar la cantidad a prestar, lo minimo son $100.000"));
    } while (isNaN(cantidad1) || cantidad1 == 0 || cantidad1 > 9999999 || cantidad1 < 0 || cantidad1 < 100000);
    console.log("la cantidad a prestar es " + cantidad1);
    return cantidad1;
}
prestamo();

let cuotas1;

function cuotas() {
    do {
        cuotas1 = parseInt(prompt("ingresar en cuantas cuotas lo quiere realizar de 12 a 60"));
    } while (isNaN(cuotas1) || cuotas1 <= 11 || cuotas1 >= 61 || cuotas1 < 0);
    console.log("el prestamo lo va a realizar en " + cuotas1 + " cuota/s");
    return cuotas1;
}

cuotas();

function dividir(dato1, dato2) {
    let resultado = dato1 / dato2;
    return resultado;
}

let division = dividir(cantidad1, cuotas1);

console.log("Usted debe pagar " + cuotas1 + " cuotas de " + Math.round(division * 1.5));

//Funcion para obtener el celular del cliente

let celular;


function obtenerCelular() {
    do {
        celular = parseInt(prompt("Ingrese su numero de celular con su cod. de area(sin el 15)"));
    } while (isNaN(celular) || celular > 99999999999 || celular == 0)
    console.log("su numero de celular es " + celular)
    return celular;
}
obtenerCelular();

//Funcion para la ubicacion del cliente

function verificarStringEnArray(array, stringBuscado) {
    return array.includes(stringBuscado);
}

const provinciasDeArgentina = ["buenos aires", "catamarca", "chaco", "chubut", "cordoba", "Corrientes", "entre rios", "formosa", "jujuy", "la pampa", "la rioja", "mendoza", "misiones", "neuquen", "rio negro", "salta", "san juan", "san luis", "santa cruz", "santa fe", "santiago del estero", "tierra del fuego", "tucuman"];
let provincia;
let resultado;

function ubicacionCliente() {
    do {
        provincia = prompt("Ingrese de que provincia es usted");
        resultado = verificarStringEnArray(provinciasDeArgentina, provincia);
    } while (!isNaN(provincia) || resultado == false)
    console.log("Usted es de " + provincia)
}

ubicacionCliente();


//Horario en el que el cliente ha realizado la operacion
const hoy = new Date
console.log(hoy.toLocaleString())

//Se crea al cliente como objeto
const cliente = {
    nombreDeCliente: nombre1,
    dineroAPagar: cantidad1,
    cantidadDeCuotas: cuotas1,
    destinoDeDinero: destinoDePrestamo1,
    celularDelCliente: celular,
    provinciaDelCliente: provincia,
}
console.log(cliente)

//Se pushea el cliente a un arrays
const carteraDeClientes = [];
carteraDeClientes.push(cliente)
for (const cliente of carteraDeClientes) {
    console.log(carteraDeClientes)
}