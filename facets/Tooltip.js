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
    let template = require("hbs!facets/Tooltip.hbs");
    let Facet = require("Facet");

    class Tooltip extends Facet {
        constructor() {
            super(template);
            this.parameters.variant = "light";
            this.parent = null;
            window.addEventListener("mousemove", this.onMouseMove.bind(this));
        }

        onMouseMove(event) {
            /* updates mouse coordinates; this will adjust position of the tooltip subdom, if it was not attached to an element
            */
            if (this.parent == null && this.subdom != null) {
                let bcr = this.subdom.getBoundingClientRect();
                this.subdom.style.left = event.clientX + "px";
                this.subdom.style.top = (event.clientY - bcr.height) + "px";
            }
        }

        show(parent=null) {
            /* renders the tooltip and displays it either at the mouse
               coordinate (default) or next to the given element
            */
            this.render();
            this.subdom.style.position = "absolute";
            if (parent == null) {
                window.document.body.appendChild(this.subdom);
                this.subdom.style.top = 0 + "px";
                this.subdom.style.left = 0 + "px";
            }
        }

        hide() {
            this.subdom.remove();
        }
    }

    return Tooltip;
});
