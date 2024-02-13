import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */



export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.header = "The Header";
    this.imageSrc = "default-image.jpg";
    this.par = "A paragraph with words";
    this.fancy = false;
    this.topText = "test";
    this.bottomText = "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host([fancy]) {
        display: block;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

      .change-color {
        background-color: white;
      }
    `;
  }

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
    <div id="cardlist">
      <div class="card">
        <div class="card-header">
          <h2>${this.header}</h2>
        </div>
       <!-- <img class="card-image" alt="Card Image" src="${this.imageSrc}"/> -->
       <meme-maker class="card-image" alt="Cat stalking a small toy" image-url="${this.imageSrc}" top-text="${this.topText}" bottom-text="${this.bottomText}">
       </meme-maker>
        <div class="card-text">
          <h3 class="card-title">${this.title}</h3>
          <div class="card-details">
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
              <summary>Description</summary>
              <div>
                <slot>${this.par}</slot>
              </div>
            </details>
            <button><a href="https://hax.psu.edu/login.php" target="_blank">Details</a></button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      header: { type:String },
      title: { type: String },
      imageSrc: { type: String },
      par: {type: String},
      topText: {type: String},
      bottomText: {type: String},
      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
