class Methods {
    check(){
        return `la funcion es ${this.cmd}`
    }
}

class MethodsCrud extends Methods{
    constructor(data){
        super()
        this.type = "save"
    }
}