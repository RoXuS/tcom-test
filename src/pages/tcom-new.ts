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
import { LiveState, setCurrentLive, setNews, setPage } from "../redux/live";
import { store } from "../redux/store";
import { ItemResponse, LiveResponse } from "../types/live";
import "../components/tcom-live-item";

@customElement("tcom-new")
export default class TcomNew extends connect(store)(LitElement) {
  @property({ type: Array }) news: LiveResponse = [];

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
      properties.has("news")
    ) {
      this.getMappedLive();
    }
  }

  async firstUpdated() {
    const news = await getLive("new");
    store.dispatch(setNews(news));
  }

  stateChanged(state: { live: LiveState }) {
    this.news = state.live.news;
    this.size = state.live.size;
    this.page = state.live.page;
    this.currentLive = state.live.currentLive;
  }

  // Move in an externa behavior
  async getMappedLive() {
    const news = this.news.slice(
      this.page * this.size,
      this.page * this.size + this.size
    );
    const mappedNews = await Promise.all(
      news.map((newItem) => {
        const item = getItem(newItem);
        return item;
      })
    );
    store.dispatch(setCurrentLive(mappedNews as Array<ItemResponse>));
  }

  tapOnMore() {
    store.dispatch(setPage(this.page + 1));
  }
}
