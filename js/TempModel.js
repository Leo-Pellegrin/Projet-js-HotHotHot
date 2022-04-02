class TempModel {
    constructor(){
        this.valueExt = 0;
        this.ValueInt = 0;
        this.observers = [];
        this.color = "";
        this.ALertExt = "";
        this.alertInt = "";
    }

    addObservers(o){
        this.observers.push(o);
    }

    notifyObservers(){
        for (let o of this.observers){
            o.update(this);
        }
    }

    changecolor(){
        if( 0 < this.value && this.value <= 20 ) {
            color = 'green';
        }
        else if( 20 < this.value && this.value <= 30 ) {
            color = 'orange';
        }
        else if( 30 < this.value && this.value <= 40 ) {
            color = 'red';
        }
        this.notifyObservers();
    }

    getValueFromAPI(){
        var socket = new WebSocket('wss://ws.hothothot.dog:9502');
            socket.onopen = function(event) {
                console.log("Connexion établie");

                socket.send("test");

                socket.onmessage = function(event){
                    valueExt = event.data.capteurs[1][3];
                    ValueInt = event.data.capteurs[0][3];
                }	
            }
			if(socket.readyState != 1){
				fetch("https://hothothot.dog/api/capteurs",
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "GET",
				})
				.then(function(response){
					return response.json()
				})
        }
        this.notifyObservers();
    }

    changeAlertInt(){
        if( 22 < this.ValueInt) {
            this.alertInt = 'Baissez le chauffage !';
        } 
        else if ( 50 < this.ValueInt ) {
            this.alertInt = 'Appelez les pompiers ou arrêtez votre barbecue !';
        }
        else if ( 12 > this.ValueInt ) {
            this.alertInt = 'Montez le chauffage ou mettez un gros pull  !';
        }
        else if ( 0 > this.ValueInt ) {
            this.alertInt = 'Canalisations gelées, appelez SOS plombier et mettez un bonnet !';
        }
        this.notifyObservers();
    }

    changeAlertExt(){
        if( this.valueExt < 0 ) {
            this.ALertExt = 'Banquise en vue !';
        } 
        else if ( 35 < this.valueExt ) {
            this.ALertExt = 'Hot Hot Hot !';
        }
    }
}