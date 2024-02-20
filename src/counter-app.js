import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
      return 'counter-app';
    }

    constructor() {
        super();
        this.counter = 16;
        this.min = 10;
        this.max = 25;
    }

    render() {
        return html`
        <confetti-container id="confetti">
        <div class="counterCard">
        <div>
          <h2>Counter App</h2>
        </div>
        <div>
          <h3 class="counter" style="color: ${this.getCounterColor()}">${this.counter}</h3>
          <div>
            <button @click="${this.handleAdd}" class="add">Add</button>
            <button @click="${this.handleSubtract}" class="subtract">Subtract</button>
          </div>
        </div>
      </div>
      </confetti-container>
        `;
    }

    static get styles() {
        return css`
        :host {
            display: block;
        }

        :host([counter=max]) .button {
            color:orange;
        }

        .counterCard {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
      }

      .add,
      .subtract {
        margin: 5px;
      }
      `;
    }

    static get properties() {
        return {
            counter: { type:Number, reflect:true },
            max: { type:Number },
            min: { type:Number },
        }
    }

    handleAdd() {
        if (this.counter < this.max) {
          this.counter++;
          this.updateCounterColor();
        } else if (this.counter === this.max) {
          this.makeItRain();
        }
    }

    handleSubtract() {
        if (this.counter > this.min) {
          this.counter--;
          this.updateCounterColor();
        }
    }
    
      updateCounterColor() {
        this.style.setProperty('--counter-color', this.getCounterColor());
    }
    
      getCounterColor() {
        if (this.counter === 18) {
          return 'orange';
        }
        if (this.counter === 21){
          return 'red';
        }
        if (this.counter === this.min){
          return 'green';
        }
        if (this.counter === this.max){
          return 'blue';
        }
        return 'black';
    }

    updated(changedProperties) {
      if (changedProperties.has('counter')) {
        if (this.counter === 21) {
          this.makeItRain();
        }
        // do your testing of the value and make it rain by calling makeItRain
      }
    }
    
    makeItRain() {
      // this is called a dynamic import. It means it won't import the code for confetti until this method is called
      // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
      // will only run AFTER the code is imported and available to us
      import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
        (module) => {
          // This is a minor timing 'hack'. We know the code library above will import prior to this running
          // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
          // this "hack" ensures the element has had time to process in the DOM so that when we set popped
          // it's listening for changes so it can react
          setTimeout(() => {
            // forcibly set the poppped attribute on something with id confetti
            // while I've said in general NOT to do this, the confetti container element will reset this
            // after the animation runs so it's a simple way to generate the effect over and over again
            this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
          }, 0);
        }
      );
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);