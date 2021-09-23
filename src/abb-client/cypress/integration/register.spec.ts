describe('register', () => {
  beforeEach(() => {
    cy.clearCookies();
  });
  afterEach(() => {
    cy.clearCookies();
  });

  it('should register user with correct info', () => {
    cy.register(
      'bob',
      'lastname',
      'bob@test.com',
      'testing',
      'images/placeholder.jpeg'
    );
  });
  it('should not allow user to register with bad value', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Email"]').type('tester@test.com');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('input[type="file"]').attachFile('/images/placeholder.jpeg');
    cy.get('button[type="submit"]').click();
    cy.getCookie('connect.sid').should('not.exist');
  });
});
