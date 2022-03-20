//Variables
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');

//Botones
const btnSend = document.querySelector('#send');
const resetBtn = document.querySelector('#resetBtn');


//Form
const form = document.querySelector('#send-mail');


eventsListeners();
function eventsListeners(){
    //Iniciando app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validatingForm);
    subject.addEventListener('blur', validatingForm);
    message.addEventListener('blur', validatingForm);

    //Sending email
    form.addEventListener('submit', sendingEmail);

    //reseting form
    resetBtn.addEventListener('click', resetForm);
}

//Functions
function iniciarApp(){
    btnSend.disabled = true;
    btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

function validatingForm(e){
   
    if (e.target.value.length > 0) {

        //Deleting errors
        const error1 = document.querySelector('p.error');
        if (error1 !== null) {
            error1.remove();
        }
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');   
    } 
    else
    {
        e.target.classList.remove('border', 'border-green-500');   
        e.target.classList.add('border', 'border-red-500');
        showError('All fields are requared');
    }

    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (e.target.type === 'email') {

        if (emailregex.test( e.target.value )) {
            const emaileror = document.querySelector('p.error');
            if (emaileror !== null) {
                emaileror.remove();
            }
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500'); 
        }
        else{
            e.target.classList.remove('border', 'border-green-500');  
            e.target.classList.add('border', 'border-red-500');
            showError('Email no valid.');
        }
    }

    if (emailregex.test( email.value ) && subject.value !== '' && message.value !== '') {
        btnSend.disabled = false;
        btnSend.classList.remove('cursor-not-allowed', 'opacity-50');
    }else{
        btnSend.disabled = false;
        btnSend.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

function sendingEmail(e){
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout( () => {
        spinner.style.display = 'none';
        const mensaje = document.createElement('p');
        mensaje.classList.add('text-center', 'mb-5', 'p-2', 'text-white', 'font-bold', 'bg-green-500', 'uppercase');

        mensaje.textContent = 'Email sent successfully';

        form.insertBefore(mensaje, spinner);

        setTimeout( () =>{
            mensaje.remove();
            resetForm();
        }, 3000);
    }, 3000);
}

function resetForm(){
    email.classList.remove('border', 'border-green-500');
    subject.classList.remove('border', 'border-green-500');
    message.classList.remove('border', 'border-green-500');
    form.reset();
    iniciarApp();
}

function showError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errors = document.querySelectorAll('.error');
    if (errors.length === 0) {
        form.appendChild(mensajeError);
    }
}