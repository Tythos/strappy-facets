/*
*/

require.config({
    "paths": {
        "hbs": "lib/hbs-loader-v1.0.0.min",
    }
});

let deps = [
    "../facets/Accordion",
    "../facets/Alert",
    "../facets/Badge",
    "../facets/Breadcrumbs",
    "../facets/Button",
    "../facets/ButtonGroup",
    "../facets/Card",
    "../facets/Carousel",
    "../facets/Dropdown",
    "../facets/Form",
    "../facets/InputGroup",
    "../facets/Image",
    "../facets/Figure",
    "../facets/Jumbotron",
    "../facets/ListGroup",
    "../facets/Modal",
    "../facets/Nav",
    "../facets/Navbar",
    "../facets/Tooltip"
];

require(deps, function(Accordion, Alert, Badge, Breadcrumbs, Button, ButtonGroup, Card, Carousel, Dropdown, Form, InputGroup, Image, Figure, Jumbotron, ListGroup, Modal, Nav, Navbar, Tooltip) {
    function testAccordion() {
            window.document.body.appendChild((new Accordion())
            .card("Click Me!", (new Card()).param("text", "Hello! I'm the first one"))
            .card("Click Me.", (new Card()).param("text", "Hello! I'm another body"))
            .card("Click Me?", (new Card()).param("text", "Hello! I'm the last one"))
            .render()
        );
    }
    
    function testAlert() {
            window.document.body.appendChild((new Alert())
            .param("variant", "warning")
            .param("content", "THIS IS AN ALERT!")
            .render()
        );
    }

    function testBadge() {
        let h1 = window.document.createElement("h1");
        h1.textContent = "Ye Olde Title";
        window.document.body.appendChild(h1);
        h1.appendChild((new Badge())
            .param("label", "The Badge")
            .render()
        );
    }

    function testBreadcrumbs() {
        window.document.body.appendChild((new Breadcrumbs())
            .item("Home", "#")
            .item("Library", "https://getbootstrap.com/docs/4.0/components/breadcrumb/")
            .item("Data")
            .render()
        );
    }

    function testButton() {
        window.document.body.appendChild((new Button())
            .param("label", "My Button")
            .on("click", console.log)
            .render()
        );
    }

    function testButtonGroup() {
        window.document.body.appendChild((new ButtonGroup())
            .button((new Button()).param("label", "One"))
            .button((new Button()).param("label", "Two"))
            .button((new Button()).param("label", "Three"))
            .button((new Button()).param("label", "Four"))
            .render()
        );
    }

    function testCarousel() {
        window.document.body.appendChild((new Carousel())
            .item("img/barcelona.png", "Barcelona", "It wasn't always such a nice place")
            .item("img/bruny_neck.png", "Bruny Neck", "Somewhere in Ireland, maybe? Looks nice.")
            .item("img/dublin_chapel.png", "Dublin Chapel", "Don't blame me, it's Wikipedia's random featured image feature")
            .render()
        );
    }

    function testDropdown() {
        window.document.body.appendChild((new Dropdown())
            .param("title", "My Dropdown Menu")
            .param("variant", "DARK")
            .item("Action", console.log)
            .item("Another Action", console.log)
            .item("Something Else", console.log)
            .render()
        );
    }

    function testForm() {
        window.document.body.appendChild((new Form())
            .text("txt", "My Text Field")
            .protected("pwd", "My Password")
            .radio("rdo", "Choose One", ["Option One", "Option Two", "Option Three"])
            .checkbox("chx", "Can You Feel It?")
            .param("variant", "success")
            .on("submit", console.log)
            .render()
        );
    }

    function testInputGroup() {
        window.document.body.appendChild((new InputGroup())
            .param("prefix", "$")
            .param("default", "Enter Price")
            .param("suffix", ".00")
            .render()
        );

        window.document.body.appendChild((new InputGroup())
            .param("default", "Your Google Account")
            .param("suffix", "@gmail.com")
            .render()
        );
    }

    function testImage() {
        window.document.body.appendChild((new Image())
            .param("src", "img/bruny_neck.png")
            .param("height", 256)
            .param("width", 256)
            .param("rounded", "elliptical")
            .render()
        );
    }

    function testFigure() {
        window.figure = new Figure();
        window.document.body.appendChild(window.figure
            .data([
                [1, 2],
                [2, 3],
                [3, 5],
                [4, 7]
            ])
            .param("title", "My Plot")
            .param("xLabel", "time")
            .param("yLabel", "height")
            .render()
        );
    }

    function testJumbotron() {
        window.document.body.appendChild((new Jumbotron())
            .param("width", "512px")
            .param("img", "img/dublin_chapel.png")
            .param("title", "Hello, world!")
            .param("desc", "This is a simple hero unit")
            .param("button", (new Button()).param("label", "Learn More").on("click", console.log))
            .render()
        );
    }

    function testListGroup() {
        window.document.body.appendChild((new ListGroup())
            .item("Cras justo odio")
            .item("Dapibus ac facilisis in")
            .item("Morbi leo risus")
            .item("Porta ac consectetur ac")
            .item("Vestibulum at eros")
            .render()
        );
    }

    function testModal() {
        window.document.body.appendChild((new Modal())
            .param("title", "Modal Title")
            .param("body", "Modal body text goes here")
            .button((new Button()).param("label", "Close").param("variant", "secondary"))
            .button((new Button()).param("label", "Save Changes").param("variant", "primary"))
            .on("close", console.log)
            .render()
        );
    }

    function testNav() {
        window.document.body.appendChild((new Nav())
            .param("label", "Active")
            .on("click", console.log)
            .render()
        );
        window.document.body.appendChild((new Nav())
            .param("label", "Link")
            .on("click", console.log)
            .render()
        );
        window.document.body.appendChild((new Nav())
            .param("label", "Link")
            .on("click", console.log)
            .render()
        );
        window.document.body.appendChild((new Nav())
            .param("label", "Disabled")
            .param("disabled", true)
            .on("click", console.log)
            .render()
        );
    }

    function testNavbar() {
        window.document.body.appendChild((new Navbar())
            .param("logo", "img/strappy_logo.png")
            .param("title", "Strappy-Facets")
            .item((new Nav()).param("label", "Home"))
            .item((new Nav()).param("label", "Features"))
            .item((new Nav()).param("label", "Pricing"))
            .param("primary", "#fff")
            .param("complement", "#424449")
            .param("supplement", "#bbb")
            .param("searchable", true)
            .render()
        );
    }

    function testTooltip() {
        // tooltips are a little unusual; they can be attached to the mouse (by default), or to a specific element
        let btn = (new Button()).param("label", "Look, Ma, A Button!").render();
        window.document.body.appendChild(btn);
        let tt = (new Tooltip())
            .param("content", "What'cha lookin at?")
            .show();
        /*let tt2 = (new Tooltip())
            .param("content", "Oh, hey, it's a button!")
            .param("variant", "dark")
            .show(btn);*/
    }

    testTooltip();
});
