export default class ${
    dom:Partial<HTMLElement>
    constructor(tag:string){
        this.dom = document.createElement(tag)
        HTMLButtonElement
    }
    static fromDOM(tag:string){
        const output = new $("div")
        output.dom = document.querySelector(tag) as Partial<HTMLElement>
        return output
    }
    addEvent(event:string, cb:any){
        (this.dom as HTMLElement).addEventListener(event, cb)
    }
    addClass(className:string){
        (this.dom as HTMLElement).classList.add(className)
    }
    removeClass(className:string){
        (this.dom as HTMLElement).classList.remove(className)
    }
    get value(){
        return (this.dom as HTMLInputElement).value
    }
    set value(data:string){
        (this.dom as HTMLInputElement).value = data
    }
}