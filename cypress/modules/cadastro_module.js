export function registerUser(user) {
    cy.get('a[href="/login"]').click();
    cy.get('h2').contains('New User Signup!');
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.contains('button', 'Signup').click();

}

export function enterAccountInformation(user, password) {
    cy.get('b').contains('Enter Account Information').should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('input#password').type(password, { log: false });
    cy.get('select[data-qa=days]').select('20');
    cy.get('select[data-qa=months]').select('September');
    cy.get('select[data-qa=years]').select('1992');
    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();
    cy.get('input#first_name').type(user.firstName);
    cy.get('input#last_name').type(user.lastName);
    cy.get('input#company').type(user.company);
    cy.get('input#address1').type(user.address1);
    cy.get('input#address2').type(user.address2);
    cy.get('select#country').select(user.country);
    cy.get('input#state').type(user.state);
    cy.get('input#city').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('input#mobile_number').type(user.mobile);
    cy.get('[data-qa="create-account"]').click();
    cy.url().should('includes', 'account_created');
    cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();
    
}