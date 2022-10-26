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
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '14/02/2022',
},
{
id: 4,
    description: 'App',
    amount: 200000,
    date: '14/02/2022',
}]


const Transaction = {
    all: transactions,
   
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },
    
    incomes() {
        let income = 0;
        // somar as entradas
        // pegar todas as transações
        Transaction.all.forEach(transaction => {//se for maior que zero
            if( transaction.amount > 0) {
                //somar a uma variavel, e retornar a variavel
                income += transaction.amount;
            }
        })
        return income;
    },
    expense() {
        let expense = 0;
        // somar as entradas
        // pegar todas as transações
        Transaction.all.forEach(transaction => {//se for menor que zero
            if( transaction.amount < 0) {
                //somar a uma variavel, e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense
        //somar as saídas
    },
    total() {
        return Transaction.incomes() + Transaction.expense();
        //entradas - saídas
    }
}

//Eu precio pegar as minhas transações do meu objeto
//aqui no javascript
//colocar no html

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index){
        
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
    
    DOM.transactionsContainer.appendChild(tr)
    
    },
    
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `  

    <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
    <img src="./assets/assets/minus.svg" alt="Remover transação">
    </td>
`
            return html
    },

    updateBalance () {
    
    document
    .getElementById('incomeDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
    .getElementById('expenseDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.expense())
    document
    .getElementById('totalDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.total())

    },

    clearTransactions
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g, "")
       
        value = Number(value) / 100
       
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

     return signal + value
    }
}

//aplicação faça novamente de tudo// add inteligência ao formulário
const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
      },
    reload() {
        App.init()
    },
}

App.init()

Transaction.add({
    id: 39,
    description: 'Alo',
    amount: 200,
    date: '23/02/2022'
})
