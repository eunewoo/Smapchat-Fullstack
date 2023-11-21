import React from "react";
import UserPopup from "./UserPopup";

describe("<UserPopup />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <UserPopup user={{ avatar: "", username: "username", email: "email" }} />,
    );
  });
});
