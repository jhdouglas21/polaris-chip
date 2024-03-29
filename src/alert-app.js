import { LitElement, html, css } from 'lit';

export class AlertApp extends LitElement {

    static get tag() {
        return 'alert-app';
      }
    
    constructor() {
        super();
        this.message = "";
        this.date="";
        this.time="";
    }
    
    render() {
        return html`
            <div class ="alert-card">
                <div class="date-time">
                    <p>${this.date}</p>
                    <p>${this.time}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82" class="alert-icon">
                                    <g transform="translate(-350.099 -428.714)">
                                    <g transform="translate(350.099 428.714)" fill="none" stroke-width="6">
                                    <circle cx="41" cy="41" r="41" stroke="none"></circle>
                                    <circle cx="41" cy="41" r="38" fill="none"></circle></g>
                                    <g transform="translate(384.41 448.566)"><rect width="10.381" height="7.786" transform="translate(0.919 34.336)"></rect>
                                    <path d="M6520.672,2327.554h-5.854l-3.21-23.669V2299.2h11.81v4.681Z" transform="translate(-6511.607 -2299.203)"></path></g></g>
                                </svg>
                <div class="close">
                    <details @toggle="${this.openChanged}">
                        <div class="alert-text">
                            
                                <span class="alert-message">
                                    <div class="text">
                                        <p>${this.message}</p>
                                    </div>
                                </span>
                        </div>
                    </details>
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

        :host([sticky])
        {
            position: sticky;
            top: 0;
            z-index: 100;
        }

        :root {
            --card-background: green;
        }

        .alert-card {
            background: var(--card-background);
            border: 2px solid black;
        }

        .alert-icon {
            -webkit-box-flex: 0;
            flex: 0 0 68px;
            height: 3.35rem;
            display: block;
            padding: 1% 0.5rem 1% 1rem;
            top: 0rem;
            stroke: black;
        }

      `;
    }


    static get properties() {
        return {
            message: { type: String },
            date: {type: String},
            time: {type: String},
        }
    }
}

globalThis.customElements.define(AlertApp.tag, AlertApp);