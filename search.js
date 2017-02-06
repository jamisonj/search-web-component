(function() {
    "use strict";

    const template = `
        <style>
        </style>
        <div id="tabs">
            <slot id="tab" name="tab"></slot>  
        </div>
        <div id="contents">
            <slot id="content" name="content"></slot>  
        </div>
    `;

    class TabbedContent extends HTMLElement {

        // TODO: set up static getter for observedAttributes() to return array of attributes to be observed
        static get observedAttributes() {
            return ['index'];
        }

        // TODO: get the index off of the attribute
        get index() {
            const index = this.getAttribute("index") || -1; // If there is no attribute "index", set it to -1.
            const parsedIndex = parseInt(index);
            return isNaN(parsedIndex) ? -1 : parsedIndex; // If it's not a number, return -1 instead.
        }

        // TODO: set the index on the attribute, set selected tab and content
        set index(value) {

            // Set the web component index attribute.
            value = isNaN(value) ? -1 : value; // If it's not a number, set it to -1 instead.
            this.setAttribute('index', value);

            // Set attribute on slotted tab at index.
            const tabs = this.querySelectorAll('[slot="tab"]'); // Grabs all elements with attribute slot = tab.
            for (let i = 0; i < tabs.length; i++) {
                if (i === value) {
                    tabs[i].setAttribute('selected', '');
                }
                else {
                    tabs[i].removeAttribute('selected'); // Unselecting the ones that aren't at that index.
                }
            }

            // Set attribute on slotted tab at index.
            const contents = this.querySelectorAll('[slot="content"]'); // Grabs all elements with attribute slot = tab.
            for (let i = 0; i < tabs.length; i++) {
                if (i === value) {
                    contents[i].setAttribute('selected', '');
                }
                else {
                    contents[i].removeAttribute('selected'); // Unselecting the ones that aren't at that index.
                }
            }
        }

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;

            this.addEventListener('click', function(e) {
                // TODO: watch tabs for click events to set index
                console.log(e.target);
                const tabs = this.querySelectorAll('[slot="tab"]');
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i] === e.target) {
                        this.index = i;
                        break;
                    }
                }
            });
        }

        // TODO: add connectedCallback() to initialize index value
        // A function called when the element is actually created on the page.
        connectedCallback() {
            this.index = this.index; // One side is calling the setter, one side the getter.
        }

        // TODO: add attributeChangedCallback(attrName, oldValue, newValue) to update index on change
        attributeChangedCallback(attrName, oldValue, newValue) {
            if (attrName === 'index') {
                this.index = parseInt(newValue);
            }
        }

    }

    window.customElements.define('tabbed-content', TabbedContent);
})();

