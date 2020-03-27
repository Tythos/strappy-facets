/*
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Spinner.hbs");
    let Facet = require("Facet");

    class Spinner extends Facet {
        constructor() {
            super(template);
            this.parameters.variant = "default";
            this.parameters.size = 24;
            return this;
        }

        onUpdateAnimation(event) {
            let deg = parseInt(this.subdom.style.rotate);
            if (isNaN(deg)) { deg = 0; }
            this.subdom.style.rotate = `${(deg + 10) % 360}deg`;
        }

        render() {
            super.render();
            setInterval(this.onUpdateAnimation.bind(this), 1000 / 30);
            return this.subdom;
        }
    }

    return Spinner;
});
