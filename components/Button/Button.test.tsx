import * as React from "react";
import * as enzyme from "enzyme";

import Button from "./Button";

describe("<Button>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(
      <Button onClick={() => {}}>Click me!</Button>
    );
    expect(wrapper).toBeTruthy();
  });

  it("snapshot", () => {
    const wrapper = enzyme.shallow(
      <Button onClick={() => {}}>Click me!</Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correct text", () => {
    let wrapper = enzyme.shallow(<Button onClick={() => {}}>Text here</Button>);
    expect(
      wrapper
        .find("StyledButton")
        .render()
        .text()
    ).toEqual("Text here");
  });
});
