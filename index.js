let cantidad1;
let cuotas1;
let mensaje;

function prestamo() {
    do {
        cantidad1 = parseInt(prompt("ingresar la cantidad a prestar"));
    } while (isNaN(cantidad1) || cantidad1 == 0 || cantidad1 > 9999999);
    console.log("la cantidad a prestar es " + cantidad1);
    return cantidad1;
}
prestamo();

function cuotas() {
    if ((number = cantidad1)) {
        cuotas1 = parseInt(prompt("¿En cuantas cuotas quiere pagar, elija de 1 a 12?"));
        if (isNaN(cuotas1)) {
            console.log("No ingresaste un numero valido");
        } else if (cuotas1 === 0) {
            console.log("Ingreso un numero invalido");
        } else if (cuotas1 > 12) {
            console.log("No se puede elegir mas de 12 cuotas");
        } else {
            console.log("El prestamo lo va a hacer en " + cuotas1 + " cuota/s");
        }
    }
    return cuotas1;
}
cuotas();

function dividir(dato1, dato2) {
    let resultado = dato1 / dato2;
    return resultado;
}

let division = dividir(cantidad1, cuotas1);

console.log("Usted debe pagar " + cuotas1 + " cuotas de " + division);