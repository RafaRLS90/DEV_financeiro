const Modal = {
    open() {
        //Abrir modal
        //Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close() {
        // fechar modal
        //remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')

    }
}

const transactions = [{
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2022',
},
{
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '25/01/2022',
},
{
    id: 2,
    description: 'Internet',
    amount: -20000,
    date: '14/02/2022',
},]

const Transaction = {
    incomes() {
        // somar as entradas
    },
    expense() {
        //somar as saídas
    },
    total() {
        //entradas - saídas
    }
}

//Eu precio pegar as minhas transações do meu objeto
//aqui no javascript
//colocar no html

const DOM = {
    innerHTMLTransaction() {

        const html = `  
<tr>
    <td class="description">Luz</td>
    <td class="expense">- R$ 500,00</td>
    <td class="date">23/01/2022</td>
    <td>
    <img src="./assets/assets/minus.svg" alt="Remover transação">
    </td>
</tr>`

    }
}