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
    id: 0,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2022',
},
{
    id: 1,
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
    addTransaction(transaction, index){
        console.log(transaction)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
    
    console.log(tr.innerHTML)
    
    },
    innerHTMLTransaction(transaction) {

        const html = `  

    <td class="description">${transaction.description}</td>
    <td class="expense">${transaction.amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
    <img src="./assets/assets/minus.svg" alt="Remover transação">
    </td>
`
            return html
    }
}

DOM.addTransaction(transactions[0])