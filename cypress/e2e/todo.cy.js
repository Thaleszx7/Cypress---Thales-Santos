describe('Lista de Tarefas', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/todo-list-alpine-js/index.html'); 
    });

    it('Site deve exibir e permitir que o usuario cadastre uma tarefa', () => {

      cy.get('#todo_title').type('Treinar');
      cy.get('button.btn-primary').click();
      cy.get('tbody').should('contain', 'Treinar');

    }); 

    it('Site deverá informar mensagem de erro ao usuário não digitar tarefa', () => {
        cy.get('button.btn-primary').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Digite um título para a tarefa!');
        });
      });

      it('Site deve permitir que o usuario exclua uma tarefa', () => {
        cy.get('#todo_title').type('Treinar');
        cy.get('button.btn-primary').click();
        cy.get('.btn-danger').first().should('exist').should('be.visible');
        cy.get('.btn-danger').first().click();
        cy.on('window:confirm', () => true);
        cy.get('tbody').should('not.contain', 'Treinar');
      });

    it('Site deve permitir filtrar as tarefas que foram concluidas', () => {
        cy.get('#todo_title').type('Treinar');
        cy.get('button.btn-primary').click();
        cy.get('.form-check-input').click();
        cy.get('select').should('exist').should('be.visible');
        cy.get('select').select('Concluídos');
        cy.get('tbody tr').each(Treinar => {
            expect(Treinar).to.have.class('completed');
        });
    });


});



