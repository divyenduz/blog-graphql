import React from "react";

import { storiesOf } from "@storybook/react";
import StubContainer from "react-storybooks-relay-container";

import Post from "../src/components/Post";

storiesOf("Post", module)
    .add("with post one", () => (
        <StubContainer
            Component={Post}
            props={{
                post: {
                    title: "Post One",
                    content: "Post one content",
                    author: "Divyendu"
                }
            }}
        />
    ))
    .add("with post two", () => (
        <StubContainer
            Component={Post}
            props={{
                post: {
                    title: "Post Two with a Much Longer Title",
                    content: "Post Two content",
                    author: "Divyendu"
                }
            }}
        />
    ));
