/*
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Toast.hbs");
    let Facet = require("Facet");
    let Animaniac = require("lib/Animaniac-v1.1.0.min");
    let hues = { // combined with saturation and lightness values to determine header background and border
        "eme": 0, // red, 
        "ale": 19, // burned orange
        "cri": 31, // faded orange
        "err": 51, // yellow
        "war": 67, // green-yellow
        "not": 109, // green
        "inf": 168, // turqoise
        "deb": 207 // blue
    };
    let height = 100, padding = 20; // used for procedural spacing
    let stack = []; // each toast will "push" in from the bottom

    class Toast extends Facet {
        constructor() {
            super(template);
            this.parameters.emitted = new Date();
            this.parameters.timeout = 2000;
            this.parameters.title = "Title 'o the Toast";
            this.parameters.body = "Body 'o the toast";
            this.parameters.level = "debug";
            return this;
        }

        getTimesinceText() {
            let dt_s = Math.round(((new Date()) - this.parameters.emitted) * 1e-3);
            let tense = 0 < dt_s ? "ago" : "in the future";
            let value = null, unit = null;
            dt_s = Math.abs(dt_s);
            if (dt_s < 10) {
                return "just now";
            } else if (dt_s < 60) {
                value = dt_s;
                unit = "second";
            } else if (dt_s < 3600) {
                value = Math.round(dt_s / 60);
                unit = "minute";
            } else if (dt_s < 86400) {
                value = Math.round(dt_s / 3600);
                unit = "hour";
            } else if (dt_s < 86400*7) {
                value = Math.round(dt_s / 86400);
                unit = "day";
            } else if (dt_s < 86400*30) {
                value = Math.round(dt_s / 86400 / 7);
                unit = "week";
            } else if (dt_s < 86400*30*12) {
                value = Math.round(dt_s / 86400 / 30);
                unit = "month";
            } else {
                value = Math.round(dt_s / 86400 / 30 / 12);
                unit = "year";
            }
            let plurality = 1 < value ? "s" : "";
            return `${value} ${unit}${plurality} ${tense}`;
        }

        onFadeStart(event) {
            /* Starts fadeout animation, after which onFadeFinish is invoked
            */
            let duration = 1.0;
            (new Animaniac())
                .element(this.subdom)
                .prop("opacity", [1, 0])
                .duration(duration)
                .start();
            setTimeout(this.onFadeFinish.bind(this), duration * 1e3);
        }

        onFadeFinish() {
            /* once fadeout is finished, remove subdom from document and toast from stack
            */
            this.subdom.remove();
            let ndx = stack.indexOf(this);
            stack.splice(ndx, 1);
        }

        render() {
            /*
            */
            this.parameters.hue = hues[this.parameters.level.slice(0,3).toLowerCase()];
            this.parameters.timesince = this.getTimesinceText();
            this.subdom = this.template.render(this.parameters);
            this.attach();
            setTimeout(this.onFadeStart.bind(this), this.parameters.timeout);
            return this.subdom;
        }
    }

    return Toast;
});
