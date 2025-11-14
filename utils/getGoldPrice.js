let lastGoldPrice = 2000

export function getGoldPrice() {

  const plusminus= Math.random() < 0.5 ? -1 : 1
  const percentage = (Math.random()*5)/100

  lastGoldPrice = lastGoldPrice * (1 + plusminus * percentage)
  return lastGoldPrice.toFixed(2)

}