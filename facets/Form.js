/* Reference implementations for forms are highly underdeveloped. We focus here
   on tabular layout of four basic input types: text; password; radio; and
   checkbox. Conceivable this could also be extended to include more
   complicated inputs like file uploads.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Form.hbs");
    let Facet = require("Facet");
    let Button = require("../facets/Button");

    class Form extends Facet {
        constructor() {
            super(template);
            this.parameters.variant = "primary";
            this.parameters.submitLabel = "Submit Form";
            this.listeners["SUBMIT"] = [];
            this.fields = []; // individual fields have type; name; and label properties
        }

        text(name, label) {
            /*
            */
            this.fields.push({
                "type": "text",
                "name": name,
                "label": label ? label : name
            });
            return this;
        }

        protected(name, label) {
            /*
            */
            this.fields.push({
                "type": "protected",
                "name": name,
                "label": label ? label : name
            });
            return this;
        }

        radio(name, label, options) {
            /*
            */
            this.fields.push({
                "type": "radio",
                "name": name,
                "label": label,
                "options": options
            });
            return this;
        }

        checkbox(name, label) {
            /*
            */
            this.fields.push({
                "type": "checkbox",
                "name": name,
                "label": label ? label : name
            });
            return this;
        }

        onFormSubmit(event) {
            event.factor = this;
            this.listeners.SUBMIT.forEach(function(listener) {
                listener(event);
            });
        }

        render() {
            /*
            */
            let params = this.parameters;
            params.fields = this.fields;
            this.subdom = this.template.render(params);
            this.subdom.querySelector(".FormSubmitCell").appendChild((new Button())
                .param("variant", this.parameters.variant)
                .param("label", this.parameters.submitLabel)
                .on("click", this.onFormSubmit.bind(this))
                .render()
            );
            this.attach();
            return this.subdom;
        }
    }

    return Form;
});
