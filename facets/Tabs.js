/*
*/

define(function(require, exports, module) {
    let template = require("hbs!facets/Tabs.hbs");
    let Facet = require("Facet");

    class Tabs extends Facet {
        constructor() {
            super(template);
            this.tabs = {};
        }

        onTabClick(event) {
            let tgt = event.target;

            // change class of all tabs
            let tabs = this.subdom.querySelectorAll(".TabsTab");
            let ndx = -1;
            Array.from(tabs).forEach(function(tab, i) {
                if (tgt == tab) {
                    ndx = i;
                    tab.classList.add("TabsTabCurrent");
                } else if (tab.classList.contains("TabsTabCurrent")) {
                    tab.classList.remove("TabsTabCurrent");
                }
            });

            // change class of content
            console.log("switching to tab", ndx);
            let content = this.subdom.querySelectorAll(".TabsContent");
            Array.from(content).forEach(function(cnt, i) {
                if (i == ndx) {
                    cnt.classList.add("TabsContentCurrent");
                } else if (cnt.classList.contains("TabsContentCurrent")) {
                    cnt.classList.remove("TabsContentCurrent");
                }
            });
        }

        item(name, content) {
            this.tabs[name] = content;
            return this;
        }

        attach() {
            let tabs = this.subdom.querySelectorAll(".TabsTab");
            Array.from(tabs).forEach(function(tab) {
                tab.addEventListener("click", this.onTabClick.bind(this));
            }, this);
        }

        render() {
            this.parameters.tabs = this.tabs;
            return super.render();
        }
    }

    return Tabs;
});
