import { fixture, html, expect, elementUpdated } from "@open-wc/testing";
import type TcomLiveItem from "../../src/components/tcom-live-item";
import "../../src/components/tcom-live-item";

class TcomLiveItemTest {
  el!: TcomLiveItem;

  async init() {
    const tcomLiveItem = html`<tcom-live-item></tcom-live-item>`;
    this.el = await fixture(tcomLiveItem);
    return this.elementUpdated();
  }

  elementUpdated(): Promise<TcomLiveItem> {
    return elementUpdated(this.el);
  }

  get rank() {
    return this.el.shadowRoot?.querySelector<HTMLDivElement>(".rank");
  }

  get a() {
    return this.el.shadowRoot?.querySelector<HTMLLinkElement>("a");
  }

  get by() {
    return this.el.shadowRoot?.querySelector<HTMLDivElement>(".by");
  }

  get lineTwo() {
    return this.el.shadowRoot?.querySelector<HTMLDivElement>(".line-two");
  }
}

describe("tcom-live-item", () => {
  it("getTimeSpent", async () => {
    const tcomLiveItemTest = new TcomLiveItemTest();
    await tcomLiveItemTest.init();
    await tcomLiveItemTest.elementUpdated();
    expect(tcomLiveItemTest.el.getTimeSpent(2323)).to.be.equal(
      "almost 51 years"
    );
    expect(
      tcomLiveItemTest.el.getTimeSpent(("2323" as unknown) as number)
    ).to.be.equal("almost 51 years");
    expect(
      tcomLiveItemTest.el.getTimeSpent((null as unknown) as number)
    ).to.be.equal("");
    expect(
      tcomLiveItemTest.el.getTimeSpent((undefined as unknown) as number)
    ).to.be.equal("");
  });

  it("getHost", async () => {
    const tcomLiveItemTest = new TcomLiveItemTest();
    await tcomLiveItemTest.init();
    await tcomLiveItemTest.elementUpdated();
    let htmlHost = tcomLiveItemTest.el.getHost("https://google.com");
    expect(htmlHost).to.be.equal("(google.com)");
    htmlHost = tcomLiveItemTest.el.getHost("https/google.com");
    expect(htmlHost).to.be.equal("");
    htmlHost = tcomLiveItemTest.el.getHost((null as unknown) as string);
    expect(htmlHost).to.be.equal("");
    htmlHost = tcomLiveItemTest.el.getHost((undefined as unknown) as string);
    expect(htmlHost).to.be.equal("");
  });

  it("display", async () => {
    const tcomLiveItemTest = new TcomLiveItemTest();
    await tcomLiveItemTest.init();
    await tcomLiveItemTest.elementUpdated();
    tcomLiveItemTest.el.index = 0;
    tcomLiveItemTest.el.item = {
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
    await tcomLiveItemTest.elementUpdated();
    const { a, rank, by, lineTwo } = tcomLiveItemTest;
    expect(rank?.innerText.trim()).to.be.equal("0.");
    expect(by?.innerText.trim()).to.be.equal("(9to5mac.com)");
    expect(a?.href).to.be.equal(
      "https://9to5mac.com/2020/11/10/apple-unveils-m1-its-first-system-on-a-chip-for-portable-mac-computers/"
    );
    expect(a?.innerText).to.be.equal(
      "Apple unveils M1, its first system-on-a-chip for portable Mac computers"
    );
    expect(lineTwo?.innerText).to.be.equal(
      "694 points by runesoerensen about 5 hours | 806"
    );
  });

  it("display with null item", async () => {
    const tcomLiveItemTest = new TcomLiveItemTest();
    await tcomLiveItemTest.init();
    await tcomLiveItemTest.elementUpdated();
    tcomLiveItemTest.el.index = 0;
    await tcomLiveItemTest.elementUpdated();
    const { a, rank, by, lineTwo } = tcomLiveItemTest;
    expect(rank).to.be.equal(null);
    expect(by).to.be.equal(null);
    expect(a).to.be.equal(null);
    expect(lineTwo).to.be.equal(null);
  });
});
