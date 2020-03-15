import { Block, Blockchain } from '../lib/bc_transactions.js'

enum Status {
    Initialization = 'Initializing the blockchain...',
    AddTransation = 'Add one or more transations',
    ReadyToMine = 'Ready to mine',
    MineInProgress = 'Minning new block...'
}

const amountEl = document.getElementById('amount') as HTMLInputElement
const blocksEl = document.getElementById('blocks') as HTMLDivElement
const confirmBtn = document.getElementById('confirm') as HTMLButtonElement
const pendingTransactionsEl = document.getElementById('pending-transactions') as HTMLPreElement
const recipientEl = document.getElementById('recipient') as HTMLInputElement
const senderEl = document.getElementById('sender') as HTMLInputElement
const statusEl = document.getElementById('status') as HTMLParagraphElement
const transferBtn  = document.getElementById('transfer') as HTMLButtonElement


const generateBlockHtml = (block: Block, index: number) => {
    return `
    <div class="block">
      <span class="block__index">#${index}</span>
      <span class="block__timestamp">${new 
 Date(block.timestamp).toLocaleTimeString()}</span>
      <div class="prev-hash">
        <div class="hash-title"> ? PREV HASH</div>
        <div class="hash-value">${block.previousHash}</div>
      </div>
      <div class="this-hash">
        <div class="hash-title">THIS HASH</div>
        <div class="hash-value">${block.getHash}</div>
      </div>
      <div class="block__transactions">
        <div class="hash-title">TRANSACTIONS</div>
        <pre class="transactions-
     value">${block.transactions.map(t => `${t.sender} ? 
 ${t.recipient} - $${t.amount}`)}</pre>
      </div>
    </div>
  `;
}

const initializeBlockchain = async () : Promise<Blockchain> => {
    const blockchain = new Blockchain()
    await blockchain.createGenesisBlock()

    return blockchain
}

const setStatusControl = (status: Status) => {
    statusEl.textContent = status
}

const updateBlockchainControl = (blockchain: Blockchain) => {
    blocksEl.innerHTML = blockchain.chain.map((b,i) => generateBlockHtml(b,i)).join('')
}

const addTransaction = (blockchain: Blockchain) => {
    const transaction = {recipient : recipientEl.value, amount: parseInt(amountEl.value), sender: senderEl.value }
    blockchain.createTransaction(transaction)
} 

const clearTrasnactionControls = () => {
    senderEl.value = ''
    recipientEl.value = ''
    amountEl.value = '0'
}

const updateTransactionControls = (blockchain: Blockchain) => {
    pendingTransactionsEl.textContent = blockchain
                                            .pendingTrasnactions
                                            .map(t => `${t.sender} ? ${t.recipient} : $${t.amount}`)
                                            .join('\n')

    clearTrasnactionControls()
}


const updateMiningControls = () => {
    pendingTransactionsEl.textContent = 'No pending transactions at the moment.'
}

const toggleState = (confirmation: boolean) => (transferFrom: boolean) => {
    transferBtn.disabled = amountEl.disabled = recipientEl.disabled = senderEl.disabled = transferFrom
    confirmBtn.disabled = confirmation
}  

const transactionAction = (blockchain: Blockchain) => () => {
    setStatusControl(Status.ReadyToMine)
    toggleState(false)(false)
    addTransaction(blockchain)
    updateTransactionControls(blockchain)
}

const miningAction = (blockchain: Blockchain) => async () => {

    setStatusControl(Status.MineInProgress)
    await blockchain.minePendingTransaction()
    setStatusControl(Status.AddTransation)
    updateMiningControls()
    updateBlockchainControl(blockchain)
    toggleState(false)(false)
}

const addEventListeners = (blockchain: Blockchain) => {
    const add = transactionAction(blockchain)
    const minning = miningAction(blockchain)
    transferBtn.addEventListener('click', add)
    confirmBtn.addEventListener('click', minning)
}


(async function main(): Promise<void> {
    setStatusControl(Status.MineInProgress)
    const blockchain = await initializeBlockchain()
    addEventListeners(blockchain)
    updateBlockchainControl(blockchain)
    toggleState(true)(false)
    setStatusControl(Status.AddTransation)


    transactionAction(blockchain)

    miningAction(blockchain)

})()