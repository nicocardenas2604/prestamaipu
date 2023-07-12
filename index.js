let cantidad1;
let cuotas1;

function prestamo() {
    do {
        cantidad1 = parseInt(prompt("ingresar la cantidad a prestar"));
    } while (isNaN(cantidad1) || cantidad1 == 0 || cantidad1 > 9999999 || cantidad1 < 0);
    console.log("la cantidad a prestar es " + cantidad1);
    return cantidad1;
}
prestamo();

function cuotas() {
    do {
        cuotas1 = parseInt(prompt("ingresar en cuantas cuotas lo quiere realizar de 1 a 12"));
    } while (isNaN(cuotas1) || cuotas1 == 0 || cuotas1 >= 13 || cuotas1 < 0);
    console.log("el prestamo lo va a realizar en " + cuotas1 + " cuota/s");
    return cuotas1;
}

cuotas();

function dividir(dato1, dato2) {
    let resultado = dato1 / dato2;
    return resultado;
}

let division = dividir(cantidad1, cuotas1);

console.log("Usted debe pagar " + cuotas1 + " cuotas de " + division);