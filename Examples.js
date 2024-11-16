// simple example
class SimpleExamle extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = "simple example"
    }
}
customElements.define("simple-example", SimpleExamle);

// example with inner text and attribute
class AttributeInnerText extends HTMLElement {
    constructor() {
        super();
        let item = this.getAttribute('item')
        this.innerHTML = `<h3>${this.innerText} - ${item}</h3>`
    }
}
customElements.define("attribute-inner-text", AttributeInnerText);

// example with shadow root
class ShadowRoot extends HTMLElement {
    constructor() {
        super();
        // mode: "open" -> available as shadowRoot, visible in browser dev tools
        this.attachShadow({ mode: "open" })
        // mode: "closed" -> null as shadowRoot, not visible in browser dev tools
        // this.attachShadow({ mode: "closed" })
	    this.shadowRoot.innerHTML = `<h3>shadow root</h3>`;
    }
}
customElements.define("shadow-root", ShadowRoot);

// slots
const slotsTemplate = document.createElement("template")
slotsTemplate.innerHTML = `
    <style>
        label { 
            color: red;
            display: block;
        }
        .description {
            font-size: .65rem;
            font-weight: lighter;
            colot: #777;
        }
    </style>
    <h3 data-title>
        <slot></slot>
        <span class="description">
            <slot name="description"></slot>
        </span>
    </h3>
    `

class Slots extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" })
        shadow.append(slotsTemplate.content.cloneNode(true))
    }
}
customElements.define("slots-example", Slots);

// lifecycle methods
const template = document.createElement("template")
template.innerHTML = `
    <h3 data-title>
        <input type="checkbox" />
        <slot></slot>
    </h3>
    `
class LifecycleMethods extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" })
        shadow.append(template.content.cloneNode(true))
        this.checkbox = shadow.querySelector("input")
    }

    static get observedAttributes() {
        return ['checked'];
      }
    

    attributeChangedCallback(name, oldValue, newValue) {
       console.log(name, oldValue, newValue)
       if (name === 'checked') this.updateChecked(newValue)
    }

    connectedCallback() {
        console.log('connected')
    }

    disconnectedCallback() { // item.remove()
        console.log('disconnected') 
    }

    updateChecked(value) {
        this.checkbox.checked = value != null && value !== "false"
    }
}
customElements.define("lifecycle-methods", LifecycleMethods);

const item = document.querySelector("lifecycle-methods")
let checked = true
setInterval(() => {
    checked = !checked
    item.setAttribute("checked", checked)
}, 500)
// item.remove() // disconnectedCallback

// extended hmtl element
class ExtendedButton extends HTMLButtonElement {
    constructor() {
      super();
      this.addEventListener('click', () => alert("Extended!"));
    }
}
customElements.define('extended-button', ExtendedButton, {extends: 'button'});


// STYLES EXAMPLE

// styles will affect colors outside element, for example <h3>style</h3>
// will affect also on web components, fore example <style-test></style-test>
// element must be added to html structure
class StyleNoShadow extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <style>
            h3 { color: green }
        </style>
        <h3>web component without shadow</h3>`
    }
}
customElements.define("style-no-shadow", StyleNoShadow);

// styles will not affect colors outside element
// h3 {
//     color: red !important; this style from outside will never override shadow dom
// }
class StyleShadow extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" })
	    shadow.innerHTML = `
            <style>
                h3 { color: green !important }
            </style>
            <h3>web component with shadow</h3>`;
    }
}
customElements.define("style-shadow", StyleShadow);

// only for test to put in html and override
class StyleTest extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<h3>web component style test</h3>`
    }
}
customElements.define("style-test", StyleTest);

// STYLES EXAMPLE