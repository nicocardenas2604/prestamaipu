// Obtener el contenedor del formulario
const formularioContainer = document.getElementById('formulario-container');

// Crear el formulario
const formulario = document.createElement('form');
formulario.id = 'miFormulario';

// Crear un campo de entrada de texto para el nombre de usuario
const labelUsuario = document.createElement("label")
labelUsuario.innerHTML = "Nombre"
formulario.appendChild(labelUsuario);
const inputUsuario = document.createElement('input');
inputUsuario.type = "text"
inputUsuario.id = "usuario"
formulario.appendChild(inputUsuario);

// Crear un campo de entrada para dinero solicitado
const labelCantidadDeDinero = document.createElement("label")
labelCantidadDeDinero.innerHTML = "Ingrese la cantidad de dinero"
formulario.appendChild(labelCantidadDeDinero);
const inputDinero = document.createElement('input');
inputDinero.type = "number"
inputDinero.id = "DineroSolicitado"
formulario.appendChild(inputDinero);

// Crear un campo para la cantidad de cuotas a pagar
const cantidadDeCuotas = document.createElement("label")
cantidadDeCuotas.innerHTML = "Ingrese la cantidad de cuotas que quiere pagar"
formulario.appendChild(cantidadDeCuotas);
const inputCuotas = document.createElement('input');
inputCuotas.type = "number"
inputCuotas.id = "cuotasSolicitadas"
formulario.appendChild(inputCuotas);

// Crear un campo para obtener numero de celular del cliente
const celularCliente = document.createElement("label")
celularCliente.innerHTML = "Numero de celular"
formulario.appendChild(celularCliente);
const inputCelular = document.createElement('input');
inputCelular.type = "number"
inputCelular.id = "numeroDeCelular"
formulario.appendChild(inputCelular);

// Crear un campo para la ubicacion del cliente
const ubicacionCliente = document.createElement("label")
ubicacionCliente.innerHTML = "Provincia"
formulario.appendChild(ubicacionCliente);
const inputUbi = document.createElement('input');
inputUbi.type = "text"
inputUbi.id = "ubicacionCliente"
formulario.appendChild(inputUbi);
console.log(inputUbi)



// Crear un botón
const botonLogin = document.createElement('button');
botonLogin.id = "botonDeEnviar"
botonLogin.type = 'submit';
botonLogin.textContent = 'Enviar';
formulario.appendChild(botonLogin);

// Agregar el formulario al contenedor
formularioContainer.appendChild(formulario);


// Crear el evento para el envío del formulario
formulario.addEventListener('submit', function (event) {
    event.preventDefault();




    // Obtener los valores de los campos de entrada
    const nombreUsuario = inputUsuario.value;
    const dineroSolicitado = parseFloat(inputDinero.value);
    const cuotasSolicitadas = parseInt(inputCuotas.value);
    const numeroDeCelular = inputCelular.value;
    const ubicacionCliente = inputUbi.value.toLowerCase()

    // Validar que los campos no estén vacíos
    if (
        nombreUsuario.trim() === '' ||
        dineroSolicitado === '' ||
        cuotasSolicitadas === '' ||
        numeroDeCelular.trim() === '' ||
        ubicacionCliente.trim() === ''
    ) {
        Swal.fire(
            'Por favor complete todos los casilleros',
        )
        return;
    }
    //validar nombre de usuario
    const regexNombreUsuario = /^[a-zA-Z]{1,19}$/;
    if (!regexNombreUsuario.test(nombreUsuario)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre de usuario debe contener solo letras, menos de 20 caracteres y no dejar espacios.!',
        });
        return;
    }

    //Validar cantidad de dinero
    if (dineroSolicitado <= 99999 || dineroSolicitado > 100000000) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "La cantidad de dinero a prestar debe ser mayor a 100.000 y como máximo 100,000,000.!",
        });
        return;
    }

    //validar cantidad de cuotas
    if (cuotasSolicitadas > 60 || cuotasSolicitadas < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "El número máximo de cuotas es 60 y el minimo de 3. Por favor, ingrese un valor válido.!",
        });
        return;
    }

    if (numeroDeCelular.length > 12) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "El número ingresado no es valido!",
        });
        return;
    }


    //Se crea un arrays con las provincias y se valida la provincia
    const provinciasDeArgentina = ["buenos aires", "catamarca", "chaco", "chubut", "cordoba", "Corrientes", "entre rios", "formosa", "jujuy", "la pampa", "la rioja", "mendoza", "misiones", "neuquen", "rio negro", "salta", "san juan", "san luis", "santa cruz", "santa fe", "santiago del estero", "tierra del fuego", "tucuman"];

    if (!provinciasDeArgentina.includes(ubicacionCliente)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "La ubicación ingresada no es válida. Por favor, seleccione una provincia válida.!",
        });
        return;
    }


    // Deshabilitar el botón después de enviar el formulario
    botonLogin.disabled = true;

    //Se asigna esos valores a un cliente (objeto)
    const datosCliente = {
        nombreUsuario: nombreUsuario,
        dineroSolicitado: dineroSolicitado,
        cuotasSolicitadas: cuotasSolicitadas,
        numeroDeCelular: numeroDeCelular,
        ubicacionCliente: ubicacionCliente,
        dineroAPagar: dineroSolicitado * 1.75,

    };

    // Se envia el cliente al storage y se crea un saludo

    localStorage.setItem("nuevoCliente", JSON.stringify(datosCliente))
    const nCliente = localStorage.getItem("nuevoCliente")
    const nClienteParseado = JSON.parse(nCliente)

    const saludoCliente = document.createElement("h4")
    saludoCliente.innerHTML = ("Bienvenido " + nClienteParseado.nombreUsuario + " su prestamo es de " + "$" + nClienteParseado.dineroSolicitado + " y obtiene un interés del 75% por lo cual va a tener que pagar " + "$" + nClienteParseado.dineroAPagar + " en las siguientes " + nClienteParseado.cuotasSolicitadas + " cuotas, a continuacion se detalla el valor de cada una :")

    formularioContainer.appendChild(saludoCliente)


    //tabla de cuotas
    const tablaCuotas = document.createElement('table');
    tablaCuotas.classList.add('table', 'table-striped');
    tablaCuotas.innerHTML = `
    <thead class="thead-dark">
        <tr>
            <th>Número de Cuota</th>
            <th>Valor de Cuota</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
`;
    formularioContainer.appendChild(tablaCuotas);

    const cuerpoTabla = tablaCuotas.querySelector('tbody');

    // Calcular y mostrar las cuotas
    for (let i = 1; i <= cuotasSolicitadas; i++) {
        const valorCuota = (dineroSolicitado / cuotasSolicitadas) * 1.75;
        const fila = `
        <tr>
            <td>${i}</td>
            <td>${valorCuota.toFixed(2)}</td>
        </tr>
    `;
        cuerpoTabla.innerHTML += fila;
    }
});