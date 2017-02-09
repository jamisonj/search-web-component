(function() {
    "use strict";

    const template = `
        <style>
        </style>
        <input id="search" type="search" value=""></input>
        <button id="button">Search</button>
    `;

    class searchBox extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;

            const component = this;

            this.shadowRoot.getElementById('button').addEventListener("click", function(e) {
                // e.preventDefault();
                console.log(component.value);
                component.value = component.value; // Get the value from the field, and call the setter with that value.
            });

            this.shadowRoot.getElementById('search').addEventListener("keypress", function(e) {

                if (e.keyCode === 13) {
                    e.preventDefault();
                    console.log(component.value);
                    component.value = component.value; // Get the value from the field, and call the setter with that value.
                }
            });
        }

        get value() {
            const value = this.shadowRoot.getElementById('search').value;
            return value;
        }

        set value(value) {
            this.setAttribute('value', value);
            this.shadowRoot.getElementById('search').value = value;
            this.shadowRoot.getElementById('search').setAttribute('value', value);
        }
    }

    window.customElements.define('search-input', searchBox);
})();

