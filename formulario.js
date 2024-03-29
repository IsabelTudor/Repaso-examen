const URL_SERVER ="http://3.94.44.212:3000/";
document.addEventListener("DOMContentLoaded",cargarUsuarios)
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("boton").addEventListener("click",mostrar),
    document.getElementById("nombre").addEventListener("blur",comprobarnombre),
    document.getElementById("apellidos").addEventListener("blur",comprobarapellido),
    document.getElementById("dni").addEventListener("blur",comprobarDNI),
    document.getElementById("username").addEventListener("focus",sugerirUsername),
    document.getElementById("password").addEventListener("blur", comprobarPassword),
    document.getElementById("password2").addEventListener("blur",comprobarPassword2),
    document.getElementById("email").addEventListener("blur",comprobaremail),
    document.getElementById("formulario").addEventListener("submit",validarFormulario)
})


function mostrar() {
    const formulario = document.getElementById("formulario");
    formulario.classList.toggle("oculto");
}

function comprobarnombre(e){
    const nombre=document.getElementById("nombre");
    const mensajeError=document.getElementById("SpanErrorNombre");
    if(nombre.value.length<2){
        nombre.classList.add("invalido");
        mensajeError.innerText=`Debe tener más de dos caracteres`
        return false;
    }else{
        nombre.classList.remove("invalido");
        mensajeError.innerText=``;
        nombre.value=nombre.value.charAt(0).toUpperCase()+nombre.value.substring(1).toLowerCase();
        return true;
    }
}
function comprobarapellido(e){
    const apellidos=document.getElementById("apellidos");
    const mensajeError=document.getElementById("SpanErrorApellidos");
    if(apellidos.value.length<3){
        apellidos.classList.add("invalido");
        mensajeError.innerText=`Tiene que tener una longitud mayor o igual que 3`;
        return false;
    }else{
        apellidos.classList.remove("invalido");
        let apellido=apellidos.value.split(" ");
        let apellidoFormateado=apellido.map((letra)=>
            letra.charAt(0).toUpperCase()+ letra.substring(1).toLowerCase());
        apellidos.value=apellidoFormateado.join(" ");
        mensajeError.innerText=``;
        return true;
    }

}
function comprobarDNI(e){
    const dni=document.getElementById("dni");
    const mensajeError=document.getElementById("SpanErrorDNI");
    const dniMayuscula=dni.value.trim().toUpperCase()
    const pattern=/^\d{8}[A-Z]$/;
    if(dni.value.length<9){
        dni.classList.add("invalido");
        mensajeError.innerText=`Tiene que introducir 9 caracteres`;
        return false
    }
    if(!pattern.test(dniMayuscula)){
     mensajeError.innerText=`El DNI no tiene el formato adecuado`;
    dni.classList.add("invalido");
    }
    let letra = dniMayuscula.charAt(8);
    let numeros = dniMayuscula.substring(0, 8);
    let indiceLetra = parseInt(numeros) % 23;
    let letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";//NOTA Esta informacion se obtiene de la web de la policia
    if (letrasValidas.charAt(indiceLetra) !== letra) {
        mensajeError.innerText = "La letra del DNI es incorrecta";
        dni.classList.add("invalido");
        return false;
    }
    mensajeError.innerText = "";
    dni.classList.remove("invalido");
    return true;
}
function sugerirUsername(e){
    let inputNombre = document.getElementById("nombre");
    let inputApellidos = document.getElementById("apellidos");
    let inputUsername = document.getElementById("username");
    inputUsername.value = `${inputNombre.value.charAt(0).toLowerCase()}${inputApellidos.value.toLowerCase().replace(" ", "")}`;
}

function comprobarPassword(e){
    const password=document.getElementById("password");
    const mensajeError=document.getElementById("SpanErrorPassword");
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if(pattern.test(password.value)){
        password.classList.remove("invalido");
        mensajeError.innerText=``;
        return true;
    }else{
        password.classList.add("invalido");
        mensajeError.innerText=`Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un dígito.`
        return false;
    }
}
function comprobarPassword2(e){
    const password=document.getElementById("password").value;
    const password2=document.getElementById("password2");
    const mensajeError=document.getElementById("SpanErrorPassword2");
    if(password==password2.value){
        password2.classList.add("invalido");
        mensajeError.innerText=`Las contraseñas no coinciden`;
        return false;
    }else{
        password2.classList.remove("invalido");
        mensajeError.innerText=``;
        return true;
    }
}
function comprobaremail(e){
    const email=document.getElementById("email");
    const mensajeError=document.getElementById("SpanErrorEmail");
    const avisos=document.getElementById("avisos");
    let patron = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(avisos.checked==false){
        mensajeError.innerText=``;
        email.classList.remove("invalido");
        return true;
    }else{
        if(!patron.test(email.value)){
            mensajeError.innerText=`El email no es valido`;
            email.classList.add("invalido");
            return false;
        }else{
            mensajeError.innerText=``;
            email.classList.remove("invalido");
            return true; 
        }
    }
}
function validarFormulario(e){
    e.preventDefault();
    if(!comprobarnombre(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el nombre";
        document.getElementById("nombre").focus();
    }
    else if(!comprobarapellido(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa los apellidos";
        document.getElementById("apellidos").focus();
    }
    else if(!comprobarDNI(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el DNI";
        document.getElementById("DNI").focus();
    }
    else if(!comprobarPassword(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa la contraseña";
        document.getElementById("password").focus();
    }
    else if(!comprobarPassword2(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa la repeticion de la contraseña";
        document.getElementById("password2").focus();
    }
    else if(document.getElementById("avisos").checked){
        if(!comprobaremail()){
            document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el email";
            document.getElementById("email").focus();
        }
    }
    else{
        document.getElementById("errorForm").innerText = "";
        
        const nombre=document.getElementById("nombre").value;
        const apellidos=document.getElementById("apellidos").value;
        const dni=document.getElementById("dni").value;
        const password=document.getElementById("password").value;
        const email=document.getElementById("email").value;
        
        const user={
            "nombre":nombre,
            "apellidos":apellidos,
            "dni":dni,
            "email":email,
            "password":password
        }

        const options={
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(user) 
        }
        fetch(`${URL_SERVER}usuarios/`,options)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else throw new Error (response.status)
        },error=>{
            console.log(error);
        })
        .then(data=>{
            console.log(data);
            cargarUsuarios();
        })
        .catch((error)=>{
            document.querySelector("main").innerHTML="Error al insertar usuario"
        })

    }
}

function cargarUsuarios(e){
    fetch(`${URL_SERVER}usuarios/`)
    .then(response=>{
        if(response.ok){
            return response.json();
        }else throw new Error(response.status)
    },
    error=>{
        console.log(error);
        throw new Error("Error en la red")
    })
    .then(data=>{
        console.log(data);
        pintarUsuarios(data);
    })
    .catch(error=>{
        document.querySelector("main").innerHTML=`Error de conexion con el servidor, revisa la conexion: ${error}`
    })
}

function pintarUsuarios(usuarios) {
    const listaUsuarios = document.createElement("section");
    usuarios.forEach(usuario => {
        const itemUsuario = document.createElement("ol");
        const seccionUsuarioNuevo = document.createElement("section");
        const nombreUsuario = document.createElement("h2");
        const botonModificar = document.createElement("button");
        const botonEliminar = document.createElement("button");

        itemUsuario.appendChild(seccionUsuarioNuevo);
        seccionUsuarioNuevo.append(nombreUsuario, botonModificar, botonEliminar);
        listaUsuarios.appendChild(itemUsuario);

        itemUsuario.id = usuario.id;
        nombreUsuario.innerText = usuario.nombre;
        botonModificar.innerText = `Modificar nombre`;
        botonModificar.addEventListener("click", modificar);
        botonEliminar.innerText = `Eliminar`;
        botonEliminar.addEventListener("click", eliminar);
    });

    document.querySelector("main").appendChild(listaUsuarios);
}


function modificar(e){
    const usuariosId=e.target.parentElement.id;
    console.log(usuariosId);
    const nuevoNombre = prompt("Ingrese el nuevo nombre:");
    
    const userModificado = {
            "nombre": nuevoNombre
            
    }
        const options = {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userModificado)
        };

        fetch(`${URL_SERVER}usuarios/3`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then(data => {
                console.log(data);
                cargarUsuarios();
            })
            .catch(error => {
                console.error("Error al modificar usuario:", error);
            });
    }

    function eliminar(e) {
        const usuariosId = e.target.parentElement.id;
            const options = {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"}
            };
            fetch(`${URL_SERVER}usuarios/2e1a`, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(response.status);
                    }
                })
                .then(data => {
                    console.log(data);
                    cargarUsuarios();
                })
                .catch(error => {
                    console.error("Error al eliminar usuario:", error);
                });
        }
    
    