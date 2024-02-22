import { LitElement, html, css } from 'lit';

export class AlertApp extends LitElement {

    static get tag() {
        return 'alert-app';
      }
    
    constructor() {
        super();
        
    }
    
    render() {
        return html`
            <div class ="alert-card">
                <div class="date-time">
                    <p>February, 2, 2024</p>
                    <p>12:00 AM</p>
                </div>
                <div class="alert-text">
                    <span tabindex="0" class="alert-message">
                        <div class="clearfix text-formatted field field--name-message field--type-text-long field--label-hidden field__item">
                            <p>This is a default alert.&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </span>
                    <svg class="alert-icon" viewBox="0 0 82 82">
                        <g fill="none" data-name="Path 4286">
                            <path d="M41 0A41 41 0 110 41 41 41 0 0141 0z"></path>
                            <path d="M41 6C21.7 6 6 21.7 6 41s15.7 35 35 35 35-15.7 35-35S60.3 6 41 6m0-6c22.644 0 41 18.356 41 41S63.644 82 41 82 0 63.644 0 41 18.356 0 41 0z"></path>
                        </g>
                        <g fill="#000321" data-name="Group 3036">
                            <path d="M35.232 54.188h10.381v7.786H35.232z" data-name="Rectangle 3589"></path>
                            <path d="M43.378 48.203h-5.854l-3.21-23.669v-4.685h11.81v4.681z" data-name="Path 2763"></path>
                        </g>
                    </svg>
                    <div class="triangle"></div>
                    <div class="polygon"></div>
                </div>
            </div>
        `;
    }

    static get styles() {
        return css`
        :host {
            display: block;
        }

        .alert-icon {
            flex: 0 0 90px;
            height: 90px;
            margin-left: 0;
            margin-right: 24px;
        }
      `;
    }


    static get properties() {
        return {
            
        }
    }
}

globalThis.customElements.define(AlertApp.tag, AlertApp);