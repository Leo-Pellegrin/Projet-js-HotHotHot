class TempObserver{
    constructor(elementId){
        this.element = document.getElementById(elementId)
    }

    update(model, value){
        this.element.innerHTML = model.value;
        this.element.setAttribute("class", model.color);
    }
}