/*
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Dropdown.hbs");
    let Facet = require("Facet");

    class Dropdown extends Facet {
        constructor() {
            super(template);
            this.parameters.variant = "PRIMARY";
            this.parameters.title = "";
            this.labels = [];
            this.actions = [];
        }

        item(label, action) {
            this.labels.push(label);
            this.actions.push(action);
            return this;
        }

        attach() {
            /*
            */
            let items = this.subdom.querySelectorAll(".DropdownItem");
            Array.from(items).forEach(function(item, ndx) {
                item.addEventListener("click", function(event) {
                    this.onMenuToggle();
                    this.actions[ndx](event);
                }.bind(this));
            }, this);
            this.subdom.querySelector(".DropdownTitle").addEventListener("click", this.onMenuToggle.bind(this));
        }

        onMenuToggle(event) {
            /* Hides/displays the menu items
            */
            let menu = this.subdom.querySelector(".DropdownMenu");
            menu.style.display =  menu.style.display == "none" ? "block" : "none";
        }

        render() {
            /*
            */
            this.parameters.items = this.labels;
            this.subdom = this.template.render(this.parameters);
            this.attach();
            return this.subdom;
        }
    }

    return Dropdown;
});
