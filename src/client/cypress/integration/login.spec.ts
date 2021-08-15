describe('login', () => {
  beforeEach(() => {
    cy.clearCookies();
  });
  afterEach(() => {
    cy.clearCookies();
  });

  it('should allow you to login with correct details', () => {
    cy.login('bob@test.com', 'testpassword');
  });
  it("doesn't allow you to login with bad details", () => {
    cy.visit('/login');
    cy.getByTestId('email').type('bob@test.com');
    cy.getByTestId('password').type('badpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Incorrect credentials').should('be.visible');
    cy.getCookie('connect.sid').should('not.exist');
  });
});
