import { visitHome, deleteAccount, accessContactUs, accessAllProducts, subscribeToNewsletter, logoutUser } from '../modules/menu_module';
import { registerUser, enterAccountInformation } from '../modules/cadastro_module';
import { loginUser } from '../modules/login_module';
import { placeOrder, fillPaymentDetails } from '../modules/carrinho_module';
import { fillContactUsForm } from '../modules/contato_module';
import { checkProductDetails, viewProductByIndex, searchProduct, checkSearchResults, addProductToCartByIndex } from '../modules/produtos_module';
import { generateUser, generatePaymentInfo } from '../support/dataGenerators';

const DEFAULT_PASSWORD = '12345';
const USER_INFO = generateUser();
const PAYMENTS_INFO = generatePaymentInfo();


describe('Exercises', () => {


    beforeEach(function () {
        visitHome();
        cy.fixture('default_data').as('default');

    });

    it('Register User', function() {
        registerUser(USER_INFO);
        enterAccountInformation(USER_INFO, this.default.default_password);
        cy.contains('a', `Logged in as ${USER_INFO.name}`).should('be.visible');
        deleteAccount();
    });

    it('Login User with correct email and password', function()  {
        loginUser(this.default.default_user.email, this.default.default_password);
        cy.contains('a', 'Logged in as pgats_teste').should('be.visible');
    });

    it('Login User with incorrect email and password', function() {
        loginUser('incorrect@email.com', 'wrongpassword');
        cy.get('p').contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Logout User', function() {
        loginUser(this.default.default_user.email, this.default.default_password);
        cy.contains('a', 'Logged in as pgats_teste').should('be.visible');
        logoutUser();
    });

    it('Register User with existing email', function() {
        registerUser({ name: this.default.default_user.name, email: this.default.default_user.email });
        cy.get('p').contains('Email Address already exist!').should('be.visible');
    });

    it('Contact Us Form', function() {
        accessContactUs();
        fillContactUsForm(USER_INFO);
        cy.get('a[class="btn btn-success"]').contains('Home').click();
        cy.url().should('eq', 'https://automationexercise.com/');
    });

    it('Verify All Products and product detail page', function() {

        accessAllProducts();
        cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0);
        viewProductByIndex(1);
        checkProductDetails();
    });

    it('Search Products and verify results', function() {
        accessAllProducts();
        const searchTerm = 'white';
        searchProduct(searchTerm);
        cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0);
        checkSearchResults(searchTerm);
    });

    it('Verify Subscription in home page', function() {
        subscribeToNewsletter(USER_INFO);
        cy.get('.alert-success').should('contain', 'You have been successfully subscribed!');
    });

    it('Place Order: Register before Checkout', function() {

        registerUser(USER_INFO, this.default.default_password);
        enterAccountInformation(USER_INFO, this.default.default_password);
        cy.contains('a', `Logged in as ${USER_INFO.name}`).should('be.visible');
        accessAllProducts();
        addProductToCartByIndex(0);
        placeOrder();
        fillPaymentDetails(PAYMENTS_INFO, USER_INFO.name);
        cy.contains('Pay and Confirm Order').click();
        deleteAccount();
    });

});




