// buena practica dejar las variables en ingles (idioma universal entre programadores)
//inicio de variables
let TarjetasDestapadas = 0;
let Tarjeta1 =null;
let Tarjeta2 = null;
let primerResultado = null;
let segundoResultado =null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRegresivoId =null;
let timerInicial = 30;
let ganarAudio = new Audio('./sounds/ganar.wav'); 
let pierdeAudio = new Audio('./sounds/pierde.wav'); 
let clickAudio = new Audio('./sounds/click.wav'); 
let correctoAudio = new Audio('./sounds/correcto.wav'); 
let incorrectoAudio = new Audio('./sounds/incorrecto.wav'); 

//enlace a doc html

let mostrarMovimientos =document.getElementById('movimientos')
let mostrarAciertos = document.getElementById ('aciertos')
let mostrarTiempo = document.getElementById ('t-restante')

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

// funciones 
function contarTiempo(){
    tiempoRegresivoId = setInterval (()=>{
        timer --;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos `;
        if(timer == 0 ){
           clearInterval(tiempoRegresivoId);
           bloquearTarjetas(numeros);
           pierdeAudio.play();
        }
    },1000);
    
}
function bloquearTarjetas (){
    for(let i =0; i <=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png"alt ="">`;
    tarjetaBloqueada.disabled = true;

}
}

function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    TarjetasDestapadas++;
    console.log(TarjetasDestapadas);

    if(TarjetasDestapadas == 1){
        //mostrar numero 
        Tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        Tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png"alt ="">`;
        clickAudio.play();
        //inabilitar el boton inicial 
        Tarjeta1.disabled = true;

    }else if(TarjetasDestapadas == 2){
        //mostrar numero 2
        Tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        Tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png"alt ="">`;

        //desabilitar tarjeta segundo boton
        Tarjeta2.disabled = true; 

        // incrementar movimientos 
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado){
        //captura contador de las tarjetas destapadas
        TarjetasDestapadas = 0;
        correctoAudio.play();

        // aumentar aciertos

        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
        
            if(aciertos == 8){
                ganarAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😲`;
                mostrarTiempo.innerHTML = ` Felicitaciones! tu tiempo es de ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤘👑`;

            }

        }else{
            //mostrar momentaneamente valores y volver a tapar 
            incorrectoAudio.play();
            setTimeout(()=>{
                Tarjeta1.innerHTML = ' ';
                Tarjeta2.innerHTML = ' ';
                Tarjeta1.disabled = false;
                Tarjeta2.disabled = false;
                TarjetasDestapadas = 0;
            },500);
        }
    }
    
}

