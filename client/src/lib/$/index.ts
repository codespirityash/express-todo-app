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
    remove(){
        (this.dom as HTMLElement).remove()
    }
    addEvent(event:string, cb:any){
        (this.dom as HTMLElement).addEventListener(event, cb)
        return this
    }
    addClass(className:string){
        (this.dom as HTMLElement).classList.add(className)
        return this
    }
    removeClass(className:string){
        (this.dom as HTMLElement).classList.remove(className)
        return this
    }
    toggleClass(className:string){
        (this.dom as HTMLElement).classList.toggle(className)
        return this
    }
    get value(){
        return (this.dom as HTMLInputElement).value
    }
    set value(data:string){
        (this.dom as HTMLInputElement).value = data
    }
    set text(data:string){
        (this.dom as HTMLElement).textContent = data
    }
    append(child:$){
        (this.dom as HTMLElement).appendChild((child.dom as HTMLElement))
    }
}