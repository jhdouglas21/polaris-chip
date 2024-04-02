import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class HaxCmsPartyUi extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
    }

    static properties = {
        items: { type: Array },
        username: { type: String },
        usernameValid: {type: Boolean},
    }

    constructor() {
        super();
        this.items = [];
        this.username = ''; 
        this.usernameValid = true;
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

    addItem() {
        if (this.usernameValid) {
            const randomNumber = globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
            const usernameExists = this.items.some(item => item.username === this.username);
    
            if (!usernameExists) 
            {
                const item = {
                    id: randomNumber,
                    username: this.username 
                }
                this.items.push(item);
                this.requestUpdate();
            } 
            else 
            {
                alert("Username already exists. Please choose a different username.");
            }
        } 
        else 
        {
            alert("Please fix the username error before adding an item.");
        }
    }

    handleUsernameInput(e) {
        const username = e.target.value.trim(); 
        const validUsername = /^[a-zA-Z0-9]{1,10}$/.test(username); 
        this.usernameValid = validUsername; 
        if (validUsername) 
        {
            this.username = username;
        }
    }

    targetClicked(e) {
        const index = this.items.findIndex((item) => {
            return item.id === parseInt(e.target.closest('.item').getAttribute('data-id'));
        });
        console.log(this.items[index]);
    }

    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="character-card">
                <div class="character-card-header">
                    <h2>Character Creation</h2>
                </div>
                <div class="controls">
                    <button @click="${this.addItem}">Add item</button>
                    
                    <button>Update</button>
                </div>
                <input
                    type="text"
                    class="character-name"
                    placeholder="Username"
                    @input="${this.handleUsernameInput}" 
                />
                ${!this.usernameValid ? html`<div style="color: red;">Username should be no longer than 10 characters and should not contain special characters.</div>` : ''}
                <div class="character-list">
                    ${this.items.map((item) => html`
                        <div class="item" title="${item.title}" data-id="${item.id}">
                            ${item.content}  ${item.username} 
                            <rpg-character></rpg-character>
                            <button @click="${() => this.deleteItem(item.id)}">Delete</button>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }
}

customElements.define(HaxCmsPartyUi.tag, HaxCmsPartyUi);
