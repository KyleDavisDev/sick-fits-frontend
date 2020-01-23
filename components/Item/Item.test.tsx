import * as React from "react";
import Item from "./Item";
import { shallow } from "enzyme";

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
  it("renders image", () => {
    const wrapper = shallow(
      <Item skip={fakeSkip} first={fakeFirst} item={fakeItem} />
    );
    console.log(wrapper.debug());
  });
});
