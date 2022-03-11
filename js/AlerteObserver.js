class AlerteObserver{
    constructor(elementId){
        this.element = document.getElementById(elementId)
    }

    update(model, alerte){
        this.element.innerHTML = model.alerte;
    }
}