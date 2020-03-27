/*
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Progress.hbs");
    let Facet = require("Facet");

    class Progress extends Facet {
        constructor() {
            super(template);
            this.parameters.percent = 0.0;
            this.parameters.islabeled = false;
            this.parameters.variant = "primary";
            this.parameters.striped = false;
            return this;
        }
    }

    return Progress;
});
