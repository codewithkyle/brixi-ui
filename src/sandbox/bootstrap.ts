import Nav from "./nav";
customElements.define("nav-component", Nav);

import View from "./view";
customElements.define("component-viewer", View);

import soundscape from "~brixi/controllers/soundscape";
soundscape.load();
