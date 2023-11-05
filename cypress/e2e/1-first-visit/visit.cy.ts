describe("first visit", () => {
  it("visit", () => {
    // make sure when user visit root path will redirect to default path
    cy.visit("http://localhost:3000");
    cy.url().should("match", /tw/);
    cy.get("h1").should("contain.text", "你好!");
    // make sure visit different page show the correct language
    cy.visit("http://localhost:3000/tw");
    cy.get("h1").should("contain.text", "你好!");

    cy.visit("http://localhost:3000/en");
    cy.get("h1").should("contain.text", "Hi there!");

    cy.visit("http://localhost:3000/jp");
    cy.get("h1").should("contain.text", "こんにちは!");
  });
});

describe("languages change event", () => {
  it("change language", () => {
    // visit page
    cy.visit("http://localhost:3000/tw");
    // find a tag to change language
    cy.get("a").contains("en").click();
    cy.url().should("match", /en/);
    cy.get("h1").should("contain.text", "Hi there!");

    cy.get("a").contains("jp").click();
    cy.url().should("match", /jp/);
    cy.get("h1").should("contain.text", "こんにちは!");

    cy.get("a").contains("tw").click();
    cy.url().should("match", /tw/);
    cy.get("h1").should("contain.text", "你好!");
  });
});
