import './add-to-do-form.component.js';
import './list.component.js';

//Main component
const template = document.createElement('template');
template.innerHTML = `
<main class="container">
  <list-component ref="list"></list-component>
  <add-to-do-form-component></add-to-do-form-component>
</main>
`;

let LIST;
let id;

class Main extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
  connectedCallback() {
    this.refs = {
      form: this._shadowRoot.querySelector('add-to-do-form-component'),
      list: this._shadowRoot.querySelector('list-component'),
    }
    this.refs.form.props = {
      onSubmit: this.addTask.bind(this),
    }
    let data =  localStorage.getItem("TODO");

    if(data){
        this.LIST = JSON.parse(data);
        this.id = this.LIST.length;
      
      }else{
        this.LIST = [];
        this.id = 0;
      }
    
    this.refs.form.render();
    this.refs.list.render();
  }

  render() {
    this.dom.innerHTML = template;
  }

  addTask(task) {
    this.refs.list.addItem(task.text,this.id);
    this.LIST.push({
        name : task.text,
        id : this.id,
        done : false,
        trash : false
     });
     localStorage.setItem("TODO", JSON.stringify(this.LIST));
     this.id++;
   
  }
}

export default Main;


