export function fillContactUsForm(user) {
    cy.get('input[data-qa="name"]').type(user.name);
    cy.get('input[data-qa="email"]').type(user.email);
    cy.get('input[data-qa="subject"]').type('Test Subject');
    cy.get('textarea[data-qa="message"]').type('This is a test message for the contact form.');
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/test-file.txt');
    cy.get('input[data-qa="submit-button"]').click();
    cy.on('window:alert', (str) => {
        expect(str).to.equal('Press OK to proceed!');
    });
    cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.');
}