describe("Home page", () => {

    /// Use case 2.1: verifies by asserting that atleast one row of map cards
    /// is visible when accessing the home page.
    it("A user can see a list of maps on the home page", () => {
      cy.visit("localhost:3000/");
      cy.get('.row').should("have.length.greaterThan", 0);
    });

    /// Use case 2.2: verifies the user can search for a map by typing a search
    /// term in, hitting the search button, and asserting a card with that name
    /// appears.
    it("A user can enter a search term on the home page", () => {
      cy.visit("localhost:3000/");
      cy.get('input[placeholder="Search for maps"]').type("map");
      cy.get('#searchButton').click();
      cy.get('.card-body').contains("map");
    });

    /// Use case 2.3: verifies that the user can sort by rating instead of date
    /// by clicking the rating button
    it("A user can change the sort mode on the home page", () => {
        cy.visit("localhost:3000/");
        cy.get("label").contains("Rating").click();
      });
  });

  describe("View page", () => {

    /// Use case 2.4: verifies a user can leave a comment by typing into the input
    /// and clicking on the add comment button
    it("A user can comment on a map", () => {
      cy.visit("localhost:3000/view-map-page");
      cy.get("textarea").type("Hello from cypress!");
      cy.get("button").contains("ADD COMMENT").click();
    });

    /// Use case 2.5: verifies a user can rate a map by clicking on one of the rating
    /// stars
    it("A user can rate a map", () => {
      cy.visit("localhost:3000/view-map-page");
      cy.get("#5star").click();
    });

    /// Use case 2.6: verifies a user can fork a map that they do not own
    it("A user can fork a map", () => {
      cy.visit("localhost:3000/view-map-page");
      cy.get("button").contains("fork").click();
    });

    /// Use case 2.7: verifies a user can see a map by checking for the leasflet element
    it("A user can see a map", () => {
      cy.visit("localhost:3000/view-map-page");
      cy.get(".leaflet-control-container");
    });

    /// Use case 2.8: verifies a user can delete their own map
    /// TODO: Login before this test!
    it("A user can delete their map", () => {
      cy.visit("localhost:3000/view-map-page");
      cy.get("button").contains("delete").click();
    });
  });

  describe("Create page", () => {

    /// Use case 2.9: verifies a user can upload a map file
    it("A user can upload a file for map geometry", () => {
      cy.visit("http://localhost:3000/create-page");

      cy.get('input[type="file"]').as('fileInput');

      cy.fixture('NY.geo.json').then(fileContent => {
        cy.get('@fileInput').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'NY.geo.json'
        });
        });
    });

    /// Use case 2.10: verifies a use can select a map graphic type
    it("A use can select a map graphic type", () => {
      cy.visit("http://localhost:3000/create-page");
      cy.get('button').contains("Bubble Map").click();
    });
  });

  describe("Edit page", () => {

    /// Use case 2.11: verifies a user can edit the contents of a map by
    /// verifying the existence of a toolbox component
    it("A user can edit the contents of a map graphic", () => {
      cy.visit("http://localhost:3000/map-edit-page/ArrowMap");
      cy.get('#toolbox');
    });

    /// Use case 2.12: verifies a user can download their map graphic data
    it("A user can download their map graphic data", () => {
      cy.visit("http://localhost:3000/map-edit-page/ArrowMap");
      cy.get('button').contains('Save').click();
      cy.get('button').contains('Download').click();
    });

    /// Use case 2.13: verifies a user can save their map graphic data
    it("A user can save their map graphic data", () => {
      cy.visit("http://localhost:3000/map-edit-page/ArrowMap");
      cy.get('button').contains('Save').click();
    });

    /// Use case 2.14: verifies a user can upload their map graphic data
    it("A user can edit the contents of a map graphic", () => {
      cy.visit("http://localhost:3000/map-edit-page/ArrowMap");
      cy.get('button').contains('Upload').click();
    });
  });
  