import { LitElement, html, css, property, customElement } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import page from "page/page.mjs";
import { store } from "../redux/store";
import { AppState, setCurrentPage } from "../redux/app";
import "../components/tcom-header";

@customElement("tcom-app")
export default class TcomApp extends connect(store)(LitElement) {
  @property({ type: String }) currentPage = "";

  static get styles() {
    const elemStyle = css`
      :host {
        display: block;
        font-family: Verdana;
        width: 85%;
        margin: auto;
      }
    `;
    return [elemStyle];
  }

  displayPage() {
    switch (this.currentPage) {
      case "":
        return html`<tcom-top></tcom-top>`;
      case "new":
        return html`<tcom-new></tcom-new>`;
      default:
        return null;
    }
    return null;
  }

  render() {
    return html` <tcom-header></tcom-header>
      ${this.displayPage()}`;
  }

  stateChanged(state: { app: AppState }) {
    this.currentPage = state.app.currentPage;
  }

  firstUpdated() {
    this.installRoutes();
  }

  installRoutes() {
    page.base("");
    page("/", async () => {
      import("./tcom-top");
      store.dispatch(setCurrentPage(""));
    });
    page("/new", async () => {
      import("./tcom-new");
      store.dispatch(setCurrentPage("new"));
    });
    page("/past", async () => {
      store.dispatch(setCurrentPage(""));
    });
    page();
  }
}
