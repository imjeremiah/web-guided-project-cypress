// write tests here
describe('Quotes App', () => {
  beforeEach(() => {
    // Each test needs fresh state!
    // Never rely on state left over from previous tests
    // Every test should work in isolation (MUST)
    cy.visit('http://localhost:1234')
  })

  // Helpers to grab elements
  const textInput = () => cy.get('input[name=text]');
  const authorInput = () => cy.get('input[name=author]');
  const submitBtn = () => cy.get('button[id="submitBtn"]');
  const cancelBtn = () => cy.get('button[id="cancelBtn"]');
  const foobarInput = () => cy.get('input[name=foobar]');

  it('sanity check to make sure tests work', () => {
    // 'it' is a test
    // expect is an assertion
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5); // Strict equality ===
    expect({}).not.to.equal({}); // Strict equality {} !== {}
    expect({}).to.eql({}); // not strict ==
  })

  it('the proper elements are showing', () => {
    textInput().should('exist');
    authorInput().should('exist');
    submitBtn().should('exist');
    cancelBtn().should('exist');
    foobarInput().should('not.exist');
    cy.contains('Submit Quote').should('exist');
    cy.contains(/submit quote/i).should('exist');
  })

  describe('Filling out the inputs and cancelling', () => {
    it('can navigate to the site', () => {
      cy.url().should('include', 'localhost');
    })

    it('submit button starts out disabled', () => {
      submitBtn().should('be.disabled');
    })

    it('can type in the inputs', () => {
      textInput()
        .should('have.value', '')
        .type('Who likes CSS anyways?')
        .should('have.value', 'Who likes CSS anyways?')

      authorInput()
        .should('have.value', '')
        .type('CRHarding')
        .should('have.value', 'CRHarding')
    })

    it('the submit button enables when both inputs are filled out', () => {
      textInput().type('I LOVE CSS');
      authorInput().type('Said no one ever');
      submitBtn().should('not.be.disabled');
    })

    it('the cancel button can reset the inputs and disable the submit button', () => {
      textInput().type('Lorem ipsum');
      authorInput().type('Dolor Sit');
      cancelBtn().click();
      textInput().should('have.value', '');
      authorInput().should('have.value', '');
      submitBtn().should('be.disabled');
    })
  })
})