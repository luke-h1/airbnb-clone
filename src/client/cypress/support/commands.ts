import 'cypress-file-upload';
import { v4 } from 'uuid';
Cypress.Commands.add('getByTestId', (testId: string) => {
  cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getById', (id: string) => {
  cy.get(`[id="${id}"]`);
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.getByTestId('email').type(email);
    cy.getByTestId('password').type(password);
    cy.get('button[type="submit"]').click();
    cy.intercept('POST', 'http://localhost:4000/graphql', []).as(
      'getProperties'
    );
    cy.wait('@getProperties');
    cy.getCookie('connect.sid').should('exist');
  });
});

/* 
Local test user: 
email: bob@test.com
password: testpassword
*/

Cypress.Commands.add(
  'register',
  (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    image: string
  ) => {
    cy.visit('/register');
    cy.get('input[placeholder="First Name"]').type(`${firstName}`);
    cy.get('input[placeholder="Last Name"]').type(lastName);
    cy.get('input[placeholder="Email"]').type(`${email}-${v4()}`);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[type="file"]').attachFile(image);
    cy.get('button[type="submit"]').click();
    cy.intercept('POST', 'http://localhost:4000/graphql', []).as(
      'getProperties'
    );
    cy.wait('@getProperties');
    cy.getCookie('connect.sid').should('exist');
  }
);

Cypress.Commands.add(
  'createProperty',
  (
    title: string,
    propertyType: string,
    description: string,
    image: string,
    pricePerNight: number,
    baths: number,
    beds: number,
    bedrooms: number,
    address: string,
    amenities: string
  ) => {
    cy.visit('/property/create-property');
    cy.getByTestId('property-title').clear().type(title);
    cy.getByTestId('property-type').clear().type(propertyType);
    cy.getByTestId('property-description').clear().type(description);
    cy.getByTestId('property-image').attachFile(image);
    cy.getByTestId('property-price').clear().type(`${pricePerNight}`);
    cy.getByTestId('property-baths').clear().type(`${baths}`);
    cy.getByTestId('property-beds').clear().type(`${beds}`);
    cy.getByTestId('property-bedrooms').clear().type(`${bedrooms}`);
    cy.getByTestId('property-address').clear().type(address);
    cy.getByTestId('property-amenities').clear().type(amenities);
    cy.get('button[type="submit"]').scrollIntoView().click();
    cy.intercept('POST', 'http://localhost:4000/graphql', []).as(
      'createProperty'
    );
    cy.wait('@createProperty');
  }
);

Cypress.Commands.add('deleteProperty', (id: string) => {
  cy.visit('/');
  cy.getByTestId(id).click();
  cy.getByTestId(id).should('not.be.visible');
});
