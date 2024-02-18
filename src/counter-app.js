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
          this.triggerConfetti();
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
        return 'black';
    }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);