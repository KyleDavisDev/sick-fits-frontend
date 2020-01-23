import * as React from "react";
import Item from "./Item";
import { shallow } from "enzyme";
import formatMoney from "../../lib/formatMoney";

const fakeSkip = 3;
const fakeFirst = 4;
const fakeItem = {
  id: "abasdfascd1231asdcccasd",
  title: "This is a fake item",
  description: "Fake items have descriptions too!",
  price: 213331,
  image: "dog.jpg"
};

describe("<Item />", () => {
  it("renders and the pricetag and title", () => {
    const wrapper = shallow(
      <Item skip={fakeSkip} first={fakeFirst} item={fakeItem} />
    );
    const PriceTag = wrapper.find("PriceTag").dive();
    expect(PriceTag.text()).toEqual(formatMoney(fakeItem.price));

    const Title = wrapper.find("Title").dive();
    expect(Title.find("a").text()).toEqual(fakeItem.title);
  });

  it("renders image", () => {
    const wrapper = shallow(
      <Item skip={fakeSkip} first={fakeFirst} item={fakeItem} />
    );
    const img = wrapper.find("img");
    expect(img.props().src).toEqual(fakeItem.image);
    expect(img.props().alt).toEqual(fakeItem.title);
  });
});
