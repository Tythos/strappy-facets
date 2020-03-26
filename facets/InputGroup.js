/* Reference implementations for forms are highly underdeveloped. We focus here
   on tabular layout of four basic input types: text; password; radio; and
   checkbox. Conceivable this could also be extended to include more
   complicated inputs like file uploads.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/InputGroup.hbs");
    let Facet = require("Facet");

    class InputGroup extends Facet {
        constructor() {
            super(template);
        }
    }

    return InputGroup;
});
