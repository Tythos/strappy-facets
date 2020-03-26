/* Reference implementations for forms are highly underdeveloped. We focus here
   on tabular layout of four basic input types: text; password; radio; and
   checkbox. Conceivable this could also be extended to include more
   complicated inputs like file uploads.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Modal.hbs");
    let Facet = require("Facet");

    class Modal extends Facet {
        constructor() {
            super(template);
            this.listeners["CLOSE"] = [];
            this.buttons = [];
            this.parameters.width = 300;
            this.parameters.height = 200;
        }

        button(btn) {
            this.buttons.push(btn);
            return this;
        }

        onCloseClicked(event) {
            event.facet = this;
            this.listeners["CLOSE"].forEach(function(listener) {
                listener(event);
            });
            this.subdom.remove();
        }

        attach() {
            let close = this.subdom.querySelector(".ModalClose");
            close.addEventListener("click", this.onCloseClicked.bind(this));
        }

        render() {
            /* Auto-centers the ".ModalWin" element based on dimensions
            */
            this.subdom = this.template.render(this.parameters);
            let mb = this.subdom.querySelector(".ModalButtons");
            this.buttons.forEach(function(btn) {
                let td = window.document.createElement("td");
                td.appendChild(btn.render());
                mb.querySelector("tr").appendChild(td);
            });
            this.attach();
            let mw = this.subdom.querySelector(".ModalWin");
            mw.style.left = 0.5 * (window.innerWidth - this.parameters.width) + "px";
            mw.style.top = 0.5 * (window.innerHeight - this.parameters.height) + "px";
            return this.subdom;
        }
    }

    return Modal;
});
