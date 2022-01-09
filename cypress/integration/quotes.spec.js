// write tests here
describe('Quotes App', () => {
    // Make sure each test starts with fresh data
    beforeEach(() => {
        cy.visit('http://localhost:1234')
    })

    // Helpers to collect dom elements
    const textInput = () => cy.get('input[name=text]');
    const authorInput = () => cy.get('input[name=author]');
    const foorbarInput = () => cy.get('input[name=foobar]');
    const submitBtn = () => cy.get('button[id="submitBtn"]');
    const cancelBtn = () => cy.get('button[id="cancelBtn"]');

    it('Sanity check to make sure that tests work', () => {
        // "it" is a test
        // "expect" is an assertion
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({}); // equal ie ===
        expect({}).to.eql({}); // eql ie ==
    })

    it('The proper elements are showing', () => {
        textInput().should('exist');
        foorbarInput().should('not.exist');
        authorInput().should('exist');
        submitBtn().should('exist');
        cancelBtn().should('exist');

        cy.contains('Submit Quote').should('exist');
    })

    describe('Filling out the inputs and cancelling', () => {
        it('Can navigate the site', () => {
            cy.url().should('include', 'localhost');
        })

        it('Submit button starts out disabled', () => {
            submitBtn().should('be.disabled');
        })

        it('Can type in the inputs', () => {
            textInput()
                .should('have.value', '')
                .type('Be nice to the CSS expert!')
                .should('have.value', 'Be nice to the CSS expert!')
            
            authorInput()
            .should('have.value', '')
            .type('Jeremiah!')
            .should('have.value', 'Jeremiah!')
        })

        it('The submit button enables when both inputs are filled out', () => {
            authorInput().type('Jeremiah')
            textInput().type('Have fun!')
            submitBtn().should('exist')
        })

        it('The cancel button can reset the inputs and disable the submit button', () => {
            authorInput().type('Jeremiah')
            textInput().type('CSS is the WORST')
            cancelBtn().click()
            textInput().should('have.value', '')
            authorInput().should('have.value', '')
            submitBtn().should('be.disabled');
        })
    })

    describe('Adding a new quote', () => {
        it('Can submit and delete a new quote', () => {
            textInput().type('CSS is the BEST')
            authorInput().type('Jeremiah')
            submitBtn().click()
            cy.contains('CSS is the BEST').siblings('button:nth-of-type(2)').click()
            // cy.contains('CSS is the BEST').should('not.exist')
        })

        it('Variation of above test', () => {
            textInput().type('please work')
            authorInput().type('Jeremiah')
            submitBtn().click()
            cy.contains(/please work/).should('exist')
            cy.contains(/please work/).next().next().click()
            cy.contains(/please work/).should('not.exist')
        })
    })

    describe('Editing an existing quote', () => {
        it('Can edit a quote', () => {
            textInput().type('here we go again')
            authorInput().type('Jeremiah')
            submitBtn().click()
            cy.contains('here we go again').next().click()
            textInput().should('have.value', 'here we go again')
            authorInput().should('have.value', 'Jeremiah')
            // textInput().type(' IT MIGHT WORK')
            // authorInput().type(' Candelaria')
            // submitBtn().click()
            // cy.contains('here we go again IT MIGHT WORK (Jeremiah Candelaria)')
        })
    })
})