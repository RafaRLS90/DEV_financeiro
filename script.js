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

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) ||
        []
    },

    set(transactions) {
        localStorage.setItem("", JSON.
        stringify(transactions))
    }
}


const Transaction = {
    all: Storage.get(),
   
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)

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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
    
    DOM.transactionsContainer.appendChild(tr)
    
    },
    
    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `  

    <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
    <img onclick="Transaction.remove(${index})" src="./assets/assets/minus.svg" alt="Remover transação">
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

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        //value = Number(value) * 100 -----funciona tambem, mas é mais simples
        value = Number(value.replace(/\,\./g, "")) * 100
        //console.log(value)

        return value
    },

    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
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


const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    
   getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
   },
   
    //formatData(){
    //    console.log('Formatar os dados')
    //},
    validateFields() {
        const  { description, amount, date } = Form.getValues()
        
        if(description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "" ) {
                throw new Error("Por favor, preencha todos os campos")
            }
    },
    
    formatValues(){
        let  { description, amount, date } = Form.getValues()
        
        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)
        //console.log(date)

        return {
            description,
            amount,
            date
        }

    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    
    submit(event) {
        event.preventDefault()

        try {
            //verififcar se esta tudo preenchido
         Form.validateFields()
         //formatar os dados para salvar
         const transaction = Form.formatValues()
         //Form.formatData()
         Transaction.add(transaction)
         //salvar
         Form.clearFields()
         //apagar os dados do formulario
         Modal.close()
         //modal feche
         //Atualizar aplicação
       
        } catch (error) {
            alert(error.message)
        }
        
        
    }
}



//aplicação faça novamente de tudo// add inteligência ao formulário
const App = {
    init() {
        
        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
        
      },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()


