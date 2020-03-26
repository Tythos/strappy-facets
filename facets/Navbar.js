/* A navbar is effectively a container for several classes of elements:
   * branding (logos/titles)
   * nav buttons
   * dropdown menus (not yet supported)
   * seach inputs

   In addition to unifying layout logic, navbars also present more coherent
   management of color schemes for constituent elements. Responsive logic can
   also be encapsulated here.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Navbar.hbs");
    let Facet = require("Facet");
    let InputGroup = require("../facets/InputGroup");

    class Navbar extends Facet {
        constructor() {
            super(template);
            this.parameters.primary = "#000";
            this.parameters.complement = "#333";
            this.parameters.supplement = "#555";
            this.parameters.searchable = false;
            this.parameters.logo = false;
            this.parameters.title = false;
            this.parameters.size = 48;
            this.items = [];
        }

        item(item) {
            this.items.push(item);
            return this;
        }

        render() {
            /*
            */
            this.parameters.logosize = 0.8 * this.parameters.size;
            this.subdom = this.template.render(this.parameters);
            this.attach();
            let nb = this.subdom.querySelector(".Navbar");
            let np = this.subdom.querySelector(".NavbarPlaceholder");
            this.items.reverse().forEach(function(item) {
                nb.insertBefore(item.render(), np.nextSibling);
            });
            if (this.parameters.searchable) {
                let ns = this.subdom.querySelector(".NavbarSearch");
                ns.appendChild((new InputGroup())
                    .param("default", "Search")
                    .render()
                );
            }
            return this.subdom;
        }
    }

    return Navbar;
});
