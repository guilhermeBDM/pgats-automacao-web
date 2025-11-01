

export function checkProductDetails() {

  cy.get('.product-information h2').should('be.visible');
  cy.get('.product-information p').contains('Category').should('be.visible');
  cy.get('.product-information span span').should('be.visible');
  cy.get('.product-information p').contains('Availability').should('be.visible');
  cy.get('.product-information p').contains('Condition').should('be.visible');
  cy.get('.product-information p').contains('Brand').should('be.visible');

}

export function viewProductByIndex(index) {
  cy.get(`a[href="/product_details/${index}"]`).click();
  cy.url().should('include', '/product_details/');
}

export function searchProduct(term) {
  cy.get('#search_product').type(term);
  cy.get('#submit_search').click();
  cy.get('h2.title.text-center').should('contain', 'Searched Products');
}

export function checkSearchResults(term) {
  cy.get('.features_items .col-sm-4').each(($el) => {
    cy.wrap($el).should('be.visible');
    cy.wrap($el).find('p').first().invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include(term.toLowerCase());
    });
  });
}

export function addProductToCartByIndex(index) {
  cy.get('a[data-product-id]').eq(index).click();
  cy.get('p > a[href="/view_cart"]').click();
}
