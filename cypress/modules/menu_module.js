
export function visitHome() {
    cy.visit('https://automationexercise.com/');
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
}

export function deleteAccount() {
    cy.get('a[href="/delete_account"]').click();
    cy.get('h2[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
}

export function logoutUser() {
    cy.get('a[href="/logout"]').click();
    cy.url().should('include', 'login');
    cy.get('h2').contains('Login to your account').should('be.visible');
}

export function accessContactUs() {
    cy.get('a[href="/contact_us"]').click();
    cy.get('h2').contains('Get In Touch').should('be.visible');
}

export function accessAllProducts() {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('h2.title.text-center').should('contain', 'All Products');
}

export function subscribeToNewsletter(user) {
    cy.scrollTo('bottom');
    cy.get('h2').contains('Subscription').should('be.visible');
    cy.get('#susbscribe_email').type(user.email);
    cy.get('#subscribe').click();
}