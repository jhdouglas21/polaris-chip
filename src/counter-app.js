import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

    static get tag() {
      return 'counter-app';
    }

    constructor() {
        super();
    }

    render() {
        <counter-app counter="16" min="10" max="25"></counter-app>
    }

    static get properties() {
        return {

        }
    }

    static get styles() {
        return css`
        :host {
            display: block;
        }

        
      `;
    }
}