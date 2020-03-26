/* Reference implementations for forms are highly underdeveloped. We focus here
   on tabular layout of four basic input types: text; password; radio; and
   checkbox. Conceivable this could also be extended to include more
   complicated inputs like file uploads.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Jumbotron.hbs");
    let Facet = require("Facet");

    class Jumbotron extends Facet {
        constructor() {
            super(template);
            this.parameters.width = "auto";
        }

        render() {
            /*
            */
            this.subdom = this.template.render(this.parameters);
            this.attach();
            this.subdom.querySelector(".Jumbotron").appendChild(this.parameters.button.render());
            return this.subdom;
        }
    }

    return Jumbotron;
});
