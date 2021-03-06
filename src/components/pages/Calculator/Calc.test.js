import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";

import AboutRedux, { About } from "./about";

/*
 * During test writing you can selectively run just these tests or skip individual ones while you
 * work on others https://facebook.github.io/jest/docs/en/api.html#testskipname-fn
 */
describe("<About />", () => {
  describe("checking for component import errors", () => {
    it("should be in the components directory", () => {
      expect(About).toBeTruthy();
    });
  });

  describe("prop type validation", () => {
    it("should log 0 errors when missing required props.", () => {
      console.error = jest.fn();

      shallow(<About />);

      expect(console.error).toHaveBeenCalledTimes(0);

      console.error.mockClear();
    });
  });

  test("renders expected output", () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot("default");
  });

  describe("connected to redux", () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const getState = {}; // initial state of the store
    const store = mockStore(getState);
    const wrapper = shallow(<AboutRedux store={store} location="/" />);

    it("renders expected output", () => {
      expect(wrapper).toMatchSnapshot("default redux");
    });

    it("pathname prop should be location", () => {
      expect(wrapper.props().pathname).toBe("/");
    });
  });
});
