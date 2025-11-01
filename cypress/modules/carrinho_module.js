

export function placeOrder() {
    cy.url().should('include', '/view_cart');
    cy.contains('Proceed To Checkout').click();
    cy.get('.checkout-information').should('be.visible');
    cy.get('#cart_info').should('be.visible');
    cy.get('textarea[name="message"]').type('Pedido de teste automatizado.');
    cy.contains('Place Order').click();
}

export function fillPaymentDetails(payments_info, name) {
    cy.get('input[name="name_on_card"]').type(name);
    cy.get('input[name="card_number"]').type(payments_info.card);
    cy.get('input[name="cvc"]').type(payments_info.cvc);
    cy.get('input[name="expiry_month"]').type(payments_info.expireMonth);
    cy.get('input[name="expiry_year"]').type(payments_info.expireYear);
}

