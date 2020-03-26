/* Reference implementations for forms are highly underdeveloped. We focus here
   on tabular layout of four basic input types: text; password; radio; and
   checkbox. Conceivable this could also be extended to include more
   complicated inputs like file uploads.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/ListGroup.hbs");
    let Facet = require("Facet");

    class ListGroup extends Facet {
        constructor() {
            super(template);
            this.parameters.items = [];
        }

        item(item) {
            this.parameters.items.push(item);
            return this;
        }
    }

    return ListGroup;
});
