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
            background: var(--ddd-theme-default-potentialMidnight);
            border-radius: 15px; 
            height: 600px;
        }

        .controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
            padding: 10px;
        }

        .controls button {
            margin-right: 10px;
        }

        .add {
        background-color: var(--ddd-theme-default-original87Pink);
        color: white; 
        border: var(--ddd-border-md); 
        padding: 10px 20px;
        border-radius: 5px; 
        cursor: pointer; 
        }

        .save {
        background-color: var(--ddd-theme-default-original87Pink);
        color: white; 
        border: var(--ddd-border-md); 
        padding: 10px 20px;
        border-radius: 5px; 
        cursor: pointer; 
        }

        .delete {
        background-color: var(--ddd-theme-default-original87Pink);
        color: white; 
        border: var(--ddd-border-md); 
        padding: 4px 8px;
        border-radius: 5px; 
        cursor: pointer; 
        }

        .item {
            border: 3px solid black; 
            border-radius: 25px; 
            background-color: grey;
            margin-bottom: 15px; 
            padding: 10px; 
        }

        .username {
            margin-bottom: 5px;
        }

        .character-list {
            display: flex;
            overflow-x: auto; 
        }

        .character-name {
            position: relative;
            left: 37.6%;
        }

        .character-card-header {
            color: white !important;
            padding: 10px;
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

    saveMembers() {
        this.makeItRain();
        
        alert("Success! Members saved to party.");
        console.log("Array of names:", this.items.map(item => item.username).join(", "));

        setTimeout(() => {
            confetti.clear();
        }, 3000); 
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
        <confetti-container id="confetti">
            <div class="character-card">
                <div class="character-card-header">
                    <h2>Character Creation</h2>
                </div>
                <div class="controls">
                    <button class="add" @click="${this.addItem}">Add Character</button>
                    <button class="save" @click="${this.saveMembers}">Save Members to Party</button>
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
                        <rpg-character></rpg-character>
                        <div class="username">${item.username}</div>
                        ${item.content}
                        <button class="delete" @click="${() => this.deleteItem(item.id)}">Delete</button>
                        </div>
                    `)}
                </div>
            </div>
            </confetti-container>
        `;
    }

    makeItRain() {
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
          (module) => {
            setTimeout(() => {
              this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
      }
}

customElements.define(HaxCmsPartyUi.tag, HaxCmsPartyUi);
