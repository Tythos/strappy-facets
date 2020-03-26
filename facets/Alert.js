/* Alerts will fade out a certain amount of time after they are rendered.
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Alert.hbs");
    let Facet = require("Facet");
    let Animaniac = require("lib/Animaniac-v1.1.0.min");

    class Alert extends Facet {
        constructor() {
            super(template);
            this.tDisplay_s = 1.0;
            this.tFadeout_s = 1.0;
            this.subdom = null;
        }

        render() {
            this.subdom = super.render();
            this.hTimeout = setTimeout(this.onFadeTimer.bind(this), this.tDisplay_s * 1e3);
            return this.subdom;
        }

        onFadeTimer(event) {
            (new Animaniac())
                .element(this.subdom)
                .duration(this.tFadeout_s)
                .prop("opacity", [1.0, 0.0])
                .start();
        }
    }

    return Alert;
});
