import {
  LitElement,
  html,
  css,
  property,
  customElement,
  PropertyValues,
} from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { getItem, getLive } from "../api/live";
import { LiveState, setCurrentLive, setTops, setPage } from "../redux/live";
import { store } from "../redux/store";
import { ItemResponse, LiveResponse } from "../types/live";
import "../components/tcom-live-item";

@customElement("tcom-top")
export default class TcomTop extends connect(store)(LitElement) {
  @property({ type: Array }) tops: LiveResponse = [];

  @property({ type: Number }) page = 0;

  @property({ type: Number }) size = 0;

  @property({ type: Array }) currentLive: LiveState["currentLive"] = [];

  static get styles() {
    const elemStyle = css`
      :host {
        display: block;
        background-color: rgb(246, 246, 239);
        padding: 10px 9px 0 9px;
      }

      .live-items > tcom-live-item {
        margin-bottom: 5px;
      }

      .more {
        color: #828282;
        margin-top: 10px;
        padding-left: 25px;
        font-size: 10pt;
        cursor: pointer;
      }
    `;
    return [elemStyle];
  }

  render() {
    return html`<div class="live-items">
        ${this.currentLive.map(
          (item, index) =>
            html`<tcom-live-item
              .index="${index + 1 + this.page * this.size}"
              .item="${item}"
            ></tcom-live-item>`
        )}
      </div>
      <div class="more" @click="${this.tapOnMore.bind(this)}">More</div> `;
  }

  updated(properties: PropertyValues) {
    if (
      properties.has("size") ||
      properties.has("page") ||
      properties.has("size") ||
      properties.has("tops")
    ) {
      this.getMappedLive();
    }
  }

  async firstUpdated() {
    const tops = await getLive("top");
    store.dispatch(setTops(tops));
  }

  stateChanged(state: { live: LiveState }) {
    this.tops = state.live.tops;
    this.size = state.live.size;
    this.page = state.live.page;
    this.currentLive = state.live.currentLive;
  }

  // Move in an externa behavior
  async getMappedLive() {
    const tops = this.tops.slice(
      this.page * this.size,
      this.page * this.size + this.size
    );
    const mappedTops = await Promise.all(
      tops.map((top) => {
        const item = getItem(top);
        return item;
      })
    );
    store.dispatch(setCurrentLive(mappedTops as Array<ItemResponse>));
  }

  tapOnMore() {
    store.dispatch(setPage(this.page + 1));
  }
}
