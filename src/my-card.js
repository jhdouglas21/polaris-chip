import { LitElement, html, css } from 'lit';

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
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <div id="cardlist">
    <div class="card">
      <div class="card-header">
        <h2>${this.header}</h2>
      </div>
      <img class="card-image" alt="Card Image" src="${this.imageSrc}"/>
      <div class="card-text">
        <h3 class="card-title">${this.title}</h3>
        <div class="card-details">
          <p>${this.par}</p>
        </div>
      </div>
    </div>
    </div>
      <div>${this.title}</div>`;
  }

  static get properties() {
    return {
      header: { type:String },
      title: { type: String },
      imageSrc: { type: String },
      par: {type: String},
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
