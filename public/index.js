const connectionStatus = document.getElementById('connection-status')
const investedAmount = document.getElementById('investment-amount')
const investBtn = document.getElementById('invest-btn')
const form = document.querySelector('form')
const priceDisplay = document.getElementById('price-display')
const dialogModal = document.querySelector('dialog')
const investedSummary = document.getElementById('investment-summary')
const exitInvestedSummaryBtn = document.querySelector('dialog > button')

const priceEventSource = new EventSource('/sse')


priceEventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.price
  priceDisplay.textContent = price
  connectionStatus.textContent = 'Live Price 🟢'
}

priceEventSource.onerror = (err) => {
  console.log("Error:", err)
}

form.addEventListener('submit', handleInvestBtn)

async function handleInvestBtn(e) {

  e.preventDefault()
  const invested = investedAmount.value
  const currentGoldPrice = parseFloat(priceDisplay.textContent)
  const goldOuncesBought = invested / currentGoldPrice
  investedSummary.textContent = `You just bought ${goldOuncesBought.toFixed(2)} ounces (ozt) for £${invested}. \n You will receive documentation shortly.`
  dialogModal.show()

  try {
    const response = await fetch('/log', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          investment: invested,
          goldOuncesBought,
          goldPrice: currentGoldPrice
      })
    })

    const data = await response.json()
    if (!data.success) {
      console.error('Failed to log investment:', data.error)
    }
  } catch  (err) {
    console.error('Error sending investment to server:', err);
  }
}

exitInvestedSummaryBtn.addEventListener('click', () => {
  dialogModal.close()
})
