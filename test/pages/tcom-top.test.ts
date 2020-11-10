import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import sinon, { SinonStub } from "sinon";
import fetchMock from "fetch-mock/esm/client";
import { store } from "../../src/redux/store";
import type TcomTop from "../../src/pages/tcom-top";
import "../../src/pages/tcom-top";
import { ItemResponse } from "../../src/types/live";

const fixtureItem1: ItemResponse = {
  by: "runesoerensen",
  descendants: 806,
  id: 25049079,
  kids: [25051147],
  score: 694,
  time: 1605032019,
  title:
    "Apple unveils M1, its first system-on-a-chip for portable Mac computers",
  type: "story",
  url:
    "https://9to5mac.com/2020/11/10/apple-unveils-m1-its-first-system-on-a-chip-for-portable-mac-computers/",
};

const fixtureItem2: ItemResponse = {
  by: "runesoerensen",
  descendants: 806,
  id: 25049080,
  kids: [25051147],
  score: 694,
  time: 1605032019,
  title:
    "Apple unveils M1, its first system-on-a-chip for portable Mac computers",
  type: "story",
  url:
    "https://9to5mac.com/2020/11/10/apple-unveils-m1-its-first-system-on-a-chip-for-portable-mac-computers/",
};

const fixtureItem3: ItemResponse = {
  by: "runesoerensen",
  descendants: 806,
  id: 25049081,
  kids: [25051147],
  score: 694,
  time: 1605032019,
  title:
    "Apple unveils M1, its first system-on-a-chip for portable Mac computers",
  type: "story",
  url:
    "https://9to5mac.com/2020/11/10/apple-unveils-m1-its-first-system-on-a-chip-for-portable-mac-computers/",
};

let dispatchStub: SinonStub;

class TcomTopTest {
  el!: TcomTop;

  async init() {
    const tcomTop = html`<tcom-top></tcom-top>`;
    this.el = await fixture(tcomTop);
    return this.elementUpdated();
  }

  elementUpdated(): Promise<TcomTop> {
    return elementUpdated(this.el);
  }

  // get dtTagsInput() {
  //   return this.el.shadowRoot?.querySelector<DtTagsInput>("dt-tags-input");
  // }
}

describe("tcom-top", () => {
  before(async () => {
    dispatchStub = sinon.stub(store, "dispatch");
  });

  beforeEach(async () => {
    dispatchStub.reset();
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it("getMappedLive with size 2 page 0", async () => {
    fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
      [1, 2, 3]
    );
    const fetchItem1 = fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty",
      fixtureItem1
    );
    const fetchItem2 = fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/item/2.json?print=pretty",
      fixtureItem2
    );
    const fetchItem3 = fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/item/3.json?print=pretty",
      fixtureItem3
    );

    const tcomTopTest = new TcomTopTest();
    await tcomTopTest.init();
    tcomTopTest.el.tops = [1, 2, 3];
    tcomTopTest.el.page = 0;
    tcomTopTest.el.size = 2;
    tcomTopTest.el.getMappedLive();
    await fetchItem1.flush(true);
    await fetchItem2.flush(true);
    await fetchItem3.flush(true);
    await tcomTopTest.elementUpdated();
    const { lastArg } = dispatchStub.lastCall;
    expect(lastArg.payload.length).to.be.equal(2);
    expect(lastArg.payload[0].id).to.be.equal(25049079);
    expect(lastArg.payload[1].id).to.be.equal(25049080);
  });

  it("getMappedLive with size 2 page 1", async () => {
    fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty",
      [1, 2, 3]
    );
    const fetchItem1 = fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty",
      fixtureItem1
    );
    const fetchItem2 = fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/item/2.json?print=pretty",
      fixtureItem2
    );
    const fetchItem3 = fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/item/3.json?print=pretty",
      fixtureItem3
    );

    const tcomTopTest = new TcomTopTest();
    await tcomTopTest.init();
    tcomTopTest.el.tops = [1, 2, 3];
    tcomTopTest.el.page = 1;
    tcomTopTest.el.size = 2;
    tcomTopTest.el.getMappedLive();
    await fetchItem1.flush(true);
    await fetchItem2.flush(true);
    await fetchItem3.flush(true);
    await tcomTopTest.elementUpdated();
    const { lastArg } = dispatchStub.lastCall;
    expect(lastArg.payload.length).to.be.equal(1);
    expect(lastArg.payload[0].id).to.be.equal(25049081);
  });
});
