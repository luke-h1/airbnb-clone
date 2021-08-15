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
    cy.get('[data-test=email]').type(email);
    cy.get('[data-test=password]').type(password);
    cy.get('#submit').click();
    cy.url().should('contain', 'http://localhost:3000');
  });
});

/* 
Local test user: 
email: test@test.com
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
