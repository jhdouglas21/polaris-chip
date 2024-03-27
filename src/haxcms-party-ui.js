import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class HaxCmsPartyUi extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
    }

    static properties = {
        items: { type: Array },
        username: { type: String } 
    }

    static styles = css`
        :host {
            display: block
        }

        .character-card {
            background: blue;
            border: 2px black;
        }

        .controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding: 10px;
        }

        .character-list {
            display: flex;
            overflow-x: auto;
        }

        .character-name {
            position: relative;
            left: 40%;
        }
    `;

    constructor() {
        super();
        this.items = [];
        this.username = ''; // Initialize username
    }

    addItem() {
        const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];

        const item = {
            id: randomNumber,
            username: this.username 
        }

        this.items.push(item);
        this.requestUpdate();
    }

    handleUsernameInput(e) {
        this.username = e.target.value; 
    }

    targetClicked(e) {
        const index = this.items.findIndex((item) => {
            return item.id === parseInt(e.target.closest('.item').getAttribute('data-id'));
        });
        console.log(this.items[index]);
    }

    render() {
        return html`
            <div class="character-card">
                <div class="character-card-header">
                    <h2>Character Creation</h2>
                </div>
                <div class="controls">
                    <button @click="${this.addItem}">Add item</button>
                    <button>Delete</button>
                    <button>Update</button>
                </div>
                <input
                    type="text"
                    class="character-name"
                    placeholder="Username"
                    @input="${this.handleUsernameInput}" 
                />
                <div class="character-list">
                    ${this.items.map((item) => html`
                        <div class="item" title="${item.title}" @click="${this.targetClicked}" data-id="${item.id}">
                            ${item.content}  ${item.username} 
                            <rpg-character></rpg-character>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }
}

customElements.define(HaxCmsPartyUi.tag, HaxCmsPartyUi);
