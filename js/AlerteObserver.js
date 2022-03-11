class AlerteObserver{
    constructor(elementId){
        this.element = document.getElementById(elementId)
    }

    update(model, alerte){
        this.element.insertBefore(model.alerte, this.element)
    }
}