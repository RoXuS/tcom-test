import { LitElement, html, css, property, customElement } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { LiveState } from "../redux/live";
import { store } from "../redux/store";
import { LiveResponse } from "../types/live";
import "./tcom-menu";

@customElement("tcom-header")
export default class TcomHeader extends connect(store)(LitElement) {
  @property({ type: Array }) news: LiveResponse = [];

  static get styles() {
    const elemStyle = css`
      :host {
        display: block;
        padding: 2px;
        background-color: #ff6600;
      }

      .header {
        display: flex;
        align-items: center;
      }

      .header .title {
        margin: 0 5px 0 4px;
        font-weight: 700;
        font-size: 10pt;
      }
    `;
    return [elemStyle];
  }

  render() {
    return html`
      <div class="header">
        <img
          src="https://news.ycombinator.com/y18.gif"
          width="18"
          height="18"
          style="border:1px white solid;"
        />
        <div class="title">Hacker News</div>
        <tcom-menu></tcom-menu>
      </div>
    `;
  }

  stateChanged(state: { live: LiveState }) {
    this.news = state.live.news;
  }
}
