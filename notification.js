



function toggleMenu(){
    const contextMenu = document.getElementById("menu-box");
    if(contextMenu.style.display == "block"){
        contextMenu.style.display = "none";
    }
    else{
        contextMenu.style.display = "block"
    }
}

Array.from(document.querySelectorAll('nav ul li a')).forEach(function(element_a) {
element_a.addEventListener('click', 
function(event) {
Array.from(document.querySelectorAll('.active')).forEach(function(element_section_ou_table) {
  element_section_ou_table.removeAttribute('class');
});
let element_a_id = event.target.attributes.href.value.replace('#', '');
document.getElementById(element_a_id).setAttribute('class', 'active');
}
);
});


(function() {

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//
// On renvoie un nombre aléatoire entre une valeur min (incluse)
// et une valeur max (exclue)
function getRandomArbitrary(min, max) {
return  Math.floor(Math.random() * (max - min) + min);
}

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
var A_temperatures = [];
for(var i = 20; i > 0; --i) {
var x = getRandomArbitrary(-10,40);
A_temperatures.push(x);
}

console.log(A_temperatures);

// https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model
// https://developer.mozilla.org/fr/docs/Web/API/Node
// https://developer.mozilla.org/fr/docs/Web/API/Element
var p_temperature_ext = document.getElementById('p_temperature_ext');
    var p_temperature_int = document.getElementById('p_temperature_int');

var section_ext = p_temperature_ext.parentNode;
    var section_int = p_temperature_int.parentNode;

var span_temperature_ext =  document.getElementById('span_temperature_ext');
    var span_temperature_int = document.getElementById('span_temperature_int');
var i = 0;

// https://developer.mozilla.org/en-US/docs/Web/API/setInterval
var interval = setInterval(function() {
if(i < A_temperatures.length) {
if(document.getElementById('titre_message_int')) document.getElementById('titre_message_int').remove();
if(document.getElementById('titre_message_ext')) document.getElementById('titre_message_ext').remove();	

let I_temperature = A_temperatures[i];

let color = 'blue';
if( 0 < I_temperature && I_temperature <= 20 ) {
  color = 'green';
  
  
}
else if( 20 < I_temperature && I_temperature <= 30 ) {
  color = 'orange';
}
else if( 30 < I_temperature && I_temperature <= 40 ) {
  color = 'red';
}

++i;

            span_temperature_int.setAttribute("class", color);
            span_temperature_int.innerText = I_temperature;

span_temperature_ext.setAttribute("class", color);
span_temperature_ext.innerText = I_temperature;



            let titre_message_int = document.createElement("h4");
            titre_message_int.setAttribute('id', 'titre_message_int');

            if( 22 < I_temperature) {
  titre_message_int.innerText = 'Baissez le chauffage !';
  const  notifications = new Notification ('HOthOT Hot',{body: 'Baissez le chauffage'});
  
  titre_message_int.innerText = 'Appelez les pompiers ou arrêtez votre barbecue !';
  const  notifications1 = new Notification ('HOthOT Hot',{body: 'Appelez les pompiers ou arrêtez votre barbecue'});
}
            else if ( 12 > I_temperature ) {
  titre_message_int.innerText = 'Montez le chauffage ou mettez un gros pull  !';
  const  notifications2 = new Notification ('HOthOT Hot',{body: 'Montez le chauffage ou mettez un gros pull  !'});

}
            else if ( 0 > I_temperature ) {
  titre_message_int.innerText = 'Canalisations gelées, appelez SOS plombier et mettez un bonnet !';
  const  notifications3 = new Notification ('HOthOT Hot',{body: 'Canalisations gelées, appelez SOS plombier et mettez un bonnet !'});

}

let titre_message_ext = document.createElement("h4");
titre_message_ext.setAttribute('id', 'titre_message_ext');
if( I_temperature < 0 ) {
  titre_message_ext.innerText = 'Banquise en vue !';
  const  notifications4 = new Notification ('HOthOT Hot',{body: 'Banquise en vue !'});

} 
else if ( 35 < I_temperature ) {
  titre_message_ext.innerText = 'Hot Hot Hot !';
  const  notifications5 = new Notification ('HOthOT Hot',{body: 'Hot Hot Hot !'});

}
// https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
section_ext.insertBefore(titre_message_ext, p_temperature_ext); 
            section_int.insertBefore(titre_message_int, p_temperature_int);

let clone_historique_ligne = document.getElementById("ligne_modele").cloneNode(true);
clone_historique_ligne.setAttribute("id", "");	
clone_historique_ligne.querySelector(".td_date").innerText = Date().toString();
clone_historique_ligne.querySelector(".td_temperature").innerText = I_temperature;
clone_historique_ligne.style.visibility = "visible";
let table_tbody = document.querySelector("table tbody");
// https://developer.mozilla.org/fr/docs/Web/API/Node/insertBefore
table_tbody.insertBefore(clone_historique_ligne, table_tbody.querySelector("#ligne_modele").nextSibling);

} else {
clearInterval(interval);
interval = null;
}
}, 2000)
}());

var socket = new WebSocket('wss://ws.hothothot.dog:9502');
socket.onopen = function(event) {
    console.log("Connexion établie");

    socket.send("test");

    socket.onmessage = function(event){
        console.log(event.data);
    }
}
