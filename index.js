// Obtener el contenedor del formulario
const formularioContainer = document.getElementById('formulario-container');

const formulario = document.createElement('form');
formulario.id = 'miFormulario';

// Inputs para el formulario
const labelUsuario = document.createElement("label")
labelUsuario.innerHTML = "Nombre"
formulario.appendChild(labelUsuario);
const inputUsuario = document.createElement('input');
inputUsuario.type = "text"
inputUsuario.id = "usuario"
formulario.appendChild(inputUsuario);

const labelCantidadDeDinero = document.createElement("label")
labelCantidadDeDinero.innerHTML = "Ingrese la cantidad de dinero"
formulario.appendChild(labelCantidadDeDinero);
const inputDinero = document.createElement('input');
inputDinero.type = "number"
inputDinero.id = "DineroSolicitado"
formulario.appendChild(inputDinero);

const cantidadDeCuotas = document.createElement("label")
cantidadDeCuotas.innerHTML = "Ingrese la cantidad de cuotas que quiere pagar"
formulario.appendChild(cantidadDeCuotas);
const inputCuotas = document.createElement('input');
inputCuotas.type = "number"
inputCuotas.id = "cuotasSolicitadas"
formulario.appendChild(inputCuotas);

const celularCliente = document.createElement("label")
celularCliente.innerHTML = "Numero de celular"
formulario.appendChild(celularCliente);
const inputCelular = document.createElement('input');
inputCelular.type = "number"
inputCelular.id = "numeroDeCelular"
formulario.appendChild(inputCelular);

const ubicacionCliente = document.createElement("label")
ubicacionCliente.innerHTML = "Provincia"
formulario.appendChild(ubicacionCliente);
const inputUbi = document.createElement('input');
inputUbi.type = "text"
inputUbi.id = "ubicacionCliente"
formulario.appendChild(inputUbi);

const botonLogin = document.createElement('button');
botonLogin.id = "botonDeEnviar"
botonLogin.type = 'submit';
botonLogin.textContent = 'Enviar';
formulario.appendChild(botonLogin);

formularioContainer.appendChild(formulario);

// Evento para el envío del formulario
formulario.addEventListener('submit', function (event) {
    event.preventDefault();

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
    //validacion de datos
    const regexNombreUsuario = /^[a-zA-Z]{1,19}$/;
    if (!regexNombreUsuario.test(nombreUsuario)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre de usuario debe contener solo letras, menos de 20 caracteres y no dejar espacios.!',
        });
        return;
    }

    if (dineroSolicitado <= 99999 || dineroSolicitado > 100000000) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "La cantidad de dinero a prestar debe ser mayor a 100.000 y como máximo 100,000,000.!",
        });
        return;
    }

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

    const provinciasDeArgentina = ["buenos aires", "catamarca", "chaco", "chubut", "cordoba", "Corrientes", "entre rios", "formosa", "jujuy", "la pampa", "la rioja", "mendoza", "misiones", "neuquen", "rio negro", "salta", "san juan", "san luis", "santa cruz", "santa fe", "santiago del estero", "tierra del fuego", "tucuman"];

    if (!provinciasDeArgentina.includes(ubicacionCliente)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "La ubicación ingresada no es válida. Por favor, seleccione una provincia válida.!",
        });
        return;
    }

    // Desactiva boton enviar,limpia inputs y mensaje de registro exitoso
    botonLogin.disabled = true;
    inputUsuario.value = '';
    inputDinero.value = '';
    inputCuotas.value = '';
    inputCelular.value = '';
    inputUbi.value = '';
    Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡El registro se ha completado con éxito!',
    });

    //Se asigna esos valores a un cliente ,se manda a storage y se crea saludo
    const datosCliente = {
        nombreUsuario: nombreUsuario,
        dineroSolicitado: dineroSolicitado,
        cuotasSolicitadas: cuotasSolicitadas,
        numeroDeCelular: numeroDeCelular,
        ubicacionCliente: ubicacionCliente,
        dineroAPagar: dineroSolicitado * 1.75,
    };

    localStorage.setItem("nuevoCliente", JSON.stringify(datosCliente))
    const nCliente = localStorage.getItem("nuevoCliente")
    const nClienteParseado = JSON.parse(nCliente)

    const saludoCliente = document.createElement("h4")
    saludoCliente.innerHTML = ("Bienvenido " + nClienteParseado.nombreUsuario + " su prestamo es de " + "$" + nClienteParseado.dineroSolicitado + " y obtiene un interés del 75% por lo cual va a tener que pagar " + "$" + nClienteParseado.dineroAPagar + " en las siguientes " + nClienteParseado.cuotasSolicitadas + " cuotas, a continuacion se detalla el valor de cada una :")

    formularioContainer.appendChild(saludoCliente)

    //tabla de cuotas
    setTimeout(function () {
        const tablaCuotas = document.createElement('table');
        tablaCuotas.classList.add('table', 'table-striped');
        tablaCuotas.innerHTML = `
    <thead class="thead-dark">
        <tr>
            <th>Número de Cuota</th>
            <th>Valor de Cuota</th>
            <th>Fecha de Pago</th>

        </tr>
    </thead>
    <tbody>
    </tbody>
`;
        formularioContainer.appendChild(tablaCuotas);

        const cuerpoTabla = tablaCuotas.querySelector('tbody');

        // Calcular las fechas de pago
        const fechaInicio = new Date();
        const fechasDePago = [];

        for (let i = 1; i <= cuotasSolicitadas; i++) {
            const fechaCuota = new Date(fechaInicio);
            fechaCuota.setDate(10);
            fechaCuota.setMonth(fechaCuota.getMonth() + i);
            fechasDePago.push(fechaCuota);
        }

        for (let i = 0; i < cuotasSolicitadas; i++) {
            const valorCuota = (dineroSolicitado / cuotasSolicitadas) * 1.75;
            const fechaPago = fechasDePago[i].toLocaleDateString();

            const fila = `
        <tr>
            <td>${i + 1}</td>
            <td>${valorCuota.toFixed(2)}</td>
            <td>${fechaPago}</td>
        </tr>
        `;

            cuerpoTabla.innerHTML += fila;
        }
    }, 3000);
});