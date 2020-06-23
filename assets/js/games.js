/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0, puntosComputadora = 0;

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

// Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');


// Crear una nueva Baraja
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }

    //console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;

}

crearDeck();

//Tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); //remover carta de la baraja
    //console.log('Pedir Carta: ',carta);
    //console.log(deck);
    return carta;
}


// pedirCarta();
const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;

}
//pedirCarta();


// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) { //detener el ciclo cuando el jugador saque 
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    setTimeout(() => {
     
        if( puntosComputadora === puntosMinimos ) {
            swal("Nadie Gana :(", " ", "warning");
        } else if ( puntosMinimos > 21 ) {
            swal("Computadora gana", " ", "info");
        } else if( puntosComputadora > 21 ) {
            swal("Jugador gana", " ", "success");
        } else {
            swal("Computadora gana", " ", "info");
        }

        /*if (puntosJugador === puntosComputadora){
            alert('Empate!!');
        }
        else if (puntosJugador > puntosComputadora && puntosJugador <= 21  || puntosComputadora > 21){
            alert('Gana el Jugador !!!');
        }else if (puntosJugador < puntosComputadora && puntosComputadora <= 21 || puntosJugador > 21){
            alert('Gana la Computadora!!!');
        }*/


    }, 100 );
}



// Eventos click
btnPedir.addEventListener('click', () => {
//console.log('click');
const carta = pedirCarta();

puntosJugador = puntosJugador + valorCarta( carta );
puntosHTML[0].innerText = puntosJugador; //puntos del jugador

    // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta'); // add clase del css
    divCartasJugador.append( imgCarta ); //Insertando carta


    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ) {
        console.warn('21, Usted ha ganado!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }


});



btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );

});



btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});
