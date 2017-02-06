(function() {
    "use strict";

    const template = `
        <style>
        </style>
        <form id="search-form">
            <input id="search" type="search" value=""></input>
            <button id="button">Search</button>
        </form>
    `;

    class searchBox extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;

            // console.log(this.shadowRoot.getElementById('search-form'));

            this.shadowRoot.getElementById('button').addEventListener("click", function(e) {
                e.preventDefault();
                var value = document.querySelector('[value]').shadowRoot.getElementById('search').value;
                // console.log(value);
                document.getElementById("component").setAttribute("value", value);
            });
        }

        get value() {
            const value = this.shadowRoot.getElementById('search').getAttribute("value") || '';
            return value;
        }

        set value(value) {
            value = typeof value === "string" ? value : '';
            this.shadowRoot.getElementById('search').setAttribute('value', value);
        }
    }

    window.customElements.define('search-box', searchBox);
})();

