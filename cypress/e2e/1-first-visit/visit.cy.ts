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

// test PC device
describe("languages change event", () => {
  it("change language", () => {
    // visit page
    cy.visit("http://localhost:3000/tw");

    // find a tag to change language
    cy.get("header > div > div").trigger("mouseover");
    cy.get("a").contains("English").click();
    cy.url().should("match", /en/);
    cy.get("h1").should("contain.text", "Hi there!");

    cy.get("header > div > div").trigger("mouseover");
    cy.get("a").contains("日本語").click();
    cy.url().should("match", /jp/);
    cy.get("h1").should("contain.text", "こんにちは!");

    cy.get("header > div > div").trigger("mouseover");
    cy.get("a").contains("繁體中文").click();
    cy.url().should("match", /tw/);
    cy.get("h1").should("contain.text", "你好!");
  });
});

// test mobile device
describe("languages change event", () => {
  it("change language", () => {
    // visit page
    cy.viewport("iphone-6");
    cy.visit("http://localhost:3000/tw");

    // find a tag to change language
    cy.get("header:last-of-type > div").click();
    cy.get("div").contains("Languages").click();

    cy.get("a").contains("English").click({ force: true });
    cy.url().should("match", /en/);
    cy.get("h1").should("contain.text", "Hi there!");

    cy.get("header:last-of-type > div").click();
    cy.get("div").contains("Languages").click();
    cy.get("a").contains("日本語").click({ force: true });
    cy.url().should("match", /jp/);
    cy.get("h1").should("contain.text", "こんにちは!");

    cy.get("header:last-of-type > div").click();
    cy.get("div").contains("Languages").click();
    cy.get("a").contains("繁體中文").click({ force: true });
    cy.url().should("match", /tw/);
    cy.get("h1").should("contain.text", "你好!");
  });
});
