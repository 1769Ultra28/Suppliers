/*
RoyCalderon
PhoneGap-Test
0.1
*/
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('offline', this.onOffline, false);
        document.addEventListener('online', this.onOnline, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        app.checkConnection();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    //RoyTesting Connection
    checkConnection:function() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        //alert('-> Connection type: ' + states[networkState]);
        //console.log(device.cordova);
        // alert('cordova v: '+ device.cordova);
        // alert('model: '+ device.model);
        // alert('name: '+ device.name);
        // alert('platform: '+ device.platform);
        //alert('uuid: '+ device.uuid);
        //alert('version: '+ device.device.version);

        //Test de notificaciones
        // function alertDismissed() {
        //     alert('Alerta dismiseada');
    // do something
//}

//Acelerometro

// function onSuccess(heading) {
//     alert('Woohoo... Compass Heading: ' + heading.magneticHeading);
// };
// function onError(error) {
//     alert('DAMM... Compass not supported. CompassError: ' + error.code);
// };

// navigator.compass.getCurrentHeading(onSuccess, onError);


//Notificaciones

// navigator.notification.alert(
//     'You are the winner!',  // message
//     alertDismissed,         // callback
//     'Game Over',            // title
//     'Done'                  // buttonName
//     );        

// function onConfirm(buttonIndex) {
//     alert('You selected button ' + buttonIndex);
// }
// navigator.notification.confirm(
//     'You are the winner!', // message
//      onConfirm,            // callback to invoke with index of button pressed
//     'Game Over',           // title
//     ['Restart','Exit']     // buttonLabels
//     );

// function onPrompt(results) {
//     alert("Selec." + results.buttonIndex + "... Bienvenido: " + results.input1);
// }

// navigator.notification.prompt(
//     'Ingrese su nombre',  // message
//     onPrompt,                  // callback to invoke
//     'Inicio de session',            // title
//     ['Ingresar','Tomar valores por defecto'],             // buttonLabels
//     'Roy Calderon'                 // defaultText
//     );

// Beep 3!
navigator.notification.beep(1);


},

onOffline:function() {
    alert('NO HAY CONEXION A INTERNET!');
},
onOnline:function() {
    alert('Hay conexión a internet, todo bien ;)');
}

};
