describe('create property', () => {
  beforeEach(() => {
    cy.login('bob@test.com', 'testpassword');
  });

  afterEach(() => {
    cy.login('bob@test.com', 'testpassword');
  });

  it('should render create property page', () => {
    cy.visit('/property/create-property');
  });

  it('should create property with correct info & display it', () => {
    cy.createProperty(
      'test title',
      'flat',
      'a very good description',
      'images/flat.jpeg',
      12,
      2,
      2,
      3,
      'test address',
      'central location'
    );
    cy.visit('/');
    cy.login('bob@test.com', 'testpassword');
    cy.contains('h4', 'test title', { timeout: 5000 }).should('be.visible');

    cy.deleteProperty('delete-property-1');
  });
});
