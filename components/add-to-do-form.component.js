const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet"  href="css/style.css" >
<link rel="stylesheet" href="css/font-awesome.css">
<form ref="form">
<div class="add-to-do">
<i class="fa fa-plus-circle"> </i>
<input type="text" id="input" placeholder="Add a to-do"  ref="text"/>
</div>
</form>
`;

class AddToDoForm extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.innerHTML = template;
    }

    render() {
        this.input = this._shadowRoot.querySelector('input');
        this.$form = this._shadowRoot.querySelector('form');
       
        this.refs = {
            text: this.querySelector('[ref="text"]'),
            form: this.querySelector('[ref="form"]'),
        }

        this.$form.addEventListener('submit', (e) => {
            e.preventDefault();
            const todo = this.input.value;
            this.props.onSubmit({
                text: todo
            });
            this.input.value = '';
        });

    }
}

window.customElements.define('add-to-do-form-component', AddToDoForm);