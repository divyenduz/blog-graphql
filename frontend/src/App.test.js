import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Adapter from "enzyme-adapter-react-15";
import enzyme, { mount } from "enzyme";
import { Post } from "./components/Post";

enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
});

describe("Addition", () => {
    it("knows that 2 and 2 make 4", () => {
        expect(2 + 2).toBe(4);
    });

    it("should test Post title", () => {
        const post = {
            id: 1,
            title: "Post One",
            content: "Post one content",
            author: "Divyendu"
        };
        const wrapper = mount(<Post post={post} />);
        const h3 = wrapper.find("h3");
        expect(h3.text()).toBe(post.title);
    });
});
