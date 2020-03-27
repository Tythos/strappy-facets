/*
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Table.hbs");
    let Facet = require("Facet");

    class Table extends Facet {
        constructor() {
            super(template);
            this.parameters.headers = [];
            this.parameters.isbanded = false;
            this.parameters.variant = "light";
            this.rows = [];
            return this;
        }

        row(cells) {
            this.rows.push(cells);
            return this;
        }

        render() {
            /*
            */
            this.parameters.rows = this.rows;
            return super.render();
        }
    }

    return Table;
});
