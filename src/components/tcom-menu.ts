import { LitElement, html, css, property, customElement } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { AppState } from "../redux/app";
import { store } from "../redux/store";

@customElement("tcom-menu")
export default class TcomMenu extends connect(store)(LitElement) {
  @property({ type: Array }) menu: AppState["menu"] = [];

  static get styles() {
    const elemStyle = css`
      :host {
        display: block;
      }

      .menu {
        display: flex;
        align-items: center;
      }

      .item {
        font-size: 10pt;
        text-decoration: none;
        color: black;
      }
    `;
    return [elemStyle];
  }

  render() {
    return html`<div class="menu">
      ${this.menu.map(
        (item, index) =>
          html`
            <a class="item" href="/${item}">
              ${item}${index !== this.menu.length - 1
                ? html`&nbsp;|&nbsp;`
                : null}
            </a>
          `
      )}
    </div>`;
  }

  stateChanged(state: { app: AppState }) {
    this.menu = state.app.menu;
  }
}
