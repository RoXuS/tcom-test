import { LitElement, html, css, property, customElement } from "lit-element";
import parse from "date-fns/parse";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";
import { ItemResponse } from "../types/live";

@customElement("tcom-live-item")
export default class TcomLiveItem extends LitElement {
  @property({ type: Object }) item: ItemResponse | null = null;

  @property({ type: Number }) index = 0;

  static get styles() {
    const elemStyle = css`
      :host {
        display: block;
        color: #828282;
        font-size: 10pt;
      }

      .line-one {
        display: flex;
        align-content: center;
      }

      .line-two {
        display: flex;
        align-content: center;
        font-size: 7pt;
        padding-left: 27px;
      }

      a {
        color: black;
        text-decoration: none;
      }

      .by {
        font-size: 8pt;
        display: flex;
        align-items: center;
      }

      .votearrow {
        width: 10px;
        height: 10px;
        border: 0px;
        margin: 3px 2px 6px;
        background: url(https://news.ycombinator.com/grayarrow2x.gif) no-repeat;
        background-size: 10px;
      }
    `;
    return elemStyle;
  }

  render() {
    if (this.item) {
      return html`<div>
        <div class="line-one">
          <div class="rank">${this.index}.</div>
          <div class="votearrow"></div>
          <a href="${this.item.url}">${this.item.title}</a>
          <div class="by">${this.getHost(this.item.url)}</div>
        </div>
        <div class="line-two">
          ${this.item.score} points by ${this.item.by}
          ${this.getTimeSpent(this.item.time)} | ${this.item.descendants}
        </div>
      </div>`;
    }
    return null;
  }

  getHost(url: string) {
    try {
      const parsedUrl = new URL(url);
      return html`&nbsp;(${parsedUrl.hostname.replace("www", "")})`;
    } catch (e) {
      return "";
    }
  }

  getTimeSpent(timestamp: number) {
    const date = parse(timestamp.toString(), "t", new Date());
    return distanceInWordsToNow(date);
  }
}
