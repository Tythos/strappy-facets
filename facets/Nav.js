/* Navigation items are basic elements used to compose larger layouts of navigation menus. Not much more than glorified/simplified buttons, really.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Nav.hbs");
    let Facet = require("Facet");

    class Nav extends Facet {
        constructor() {
            super(template);
            this.parameters.disabled = false;
            this.listeners["CLICK"] = [];
        }

        onNavClicked(event) {
            event.facet = this;
            this.listeners["CLICK"].forEach(function(listener) {
                listener(event);
            });
        }

        attach() {
            if (this.parameters.disabled) { return; }
            this.subdom.querySelector(".NavItem").addEventListener("click", this.onNavClicked.bind(this));
        }
    }

    return Nav;
});
