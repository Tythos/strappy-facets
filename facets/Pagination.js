/*
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Pagination.hbs");
    let Facet = require("Facet");

    class Pagination extends Facet {
        constructor() {
            super(template);
            this.parameters.count = 3;
            this.parameters.current = 1;
            return this;
        }
        
        render() {
            /*
            */
            this.parameters.n = (new Array(this.parameters.count)).fill(null).map(function(_, i) { return i; });
            this.subdom = this.template.render(this.parameters);
            this.attach();
            return this.subdom;
        }
    }

    return Pagination;
});
