describe("first visit", () => {
  it("visit", () => {
    // make sure when user visit root path will redirect to default path
    cy.visit("http://localhost:3000");
    cy.url().should("match", /tw/);
    cy.get("p").should("contain.text", "總統開票懶人包");
    // make sure visit different page show the correct language
    cy.visit("http://localhost:3000/tw");
    cy.get("p").should("contain.text", "總統開票懶人包");

    cy.visit("http://localhost:3000/en");
    cy.get("p").should(
      "contain.text",
      "Presidential Election Voting Quick Guide"
    );

    cy.visit("http://localhost:3000/jp");
    cy.get("p").should("contain.text", "大統領選挙投票クイックガイド");
  });
});

// test PC device
describe("languages change event", () => {
  it("change language", () => {
    // visit page
    cy.visit("http://localhost:3000/tw");

    // find a tag to change language
    cy.get("header > div > div").trigger("mouseover");
    cy.get("a").contains("English").click();
    cy.url().should("match", /en/);
    cy.get("p").should(
      "contain.text",
      "Presidential Election Voting Quick Guide"
    );

    cy.get("header > div > div").trigger("mouseover");
    cy.get("a").contains("日本語").click();
    cy.url().should("match", /jp/);
    cy.get("p").should("contain.text", "大統領選挙投票クイックガイド");

    cy.get("header > div > div").trigger("mouseover");
    cy.get("a").contains("繁體中文").click();
    cy.url().should("match", /tw/);
    cy.get("p").should("contain.text", "總統開票懶人包");
  });
});

// test mobile device
describe("languages change event", () => {
  it("change language", () => {
    // visit page
    cy.viewport("iphone-6");
    cy.visit("http://localhost:3000/tw");

    // find a tag to change language
    cy.get("header:last-of-type > div:last-of-type").click();
    cy.get("div").contains("繁體中文").click({ force: true });

    cy.get("a").contains("English").click({ force: true });
    cy.url().should("match", /en/);
    cy.get("p").should(
      "contain.text",
      "Presidential Election Voting Quick Guide"
    );

    cy.get("header:last-of-type > div:last-of-type").click();
    cy.get("div").contains("English").click({ force: true });
    cy.get("a").contains("日本語").click({ force: true });
    cy.url().should("match", /jp/);
    cy.get("p").should("contain.text", "大統領選挙投票クイックガイド");

    cy.get("header:last-of-type > div:last-of-type").click();
    cy.get("div").contains("日本語").click({ force: true });
    cy.get("a").contains("繁體中文").click({ force: true });
    cy.url().should("match", /tw/);
    cy.get("p").should("contain.text", "總統開票懶人包");
  });
});
