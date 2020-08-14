### DISCLAIMER
1. I used the Yahoo Finance API (https://rapidapi.com/apidojo/api/yahoo-finance1/details), which unfortunately had: 
  - Slow responses, hence slow rendering on the app (please allow for a couple seconds for the graph to load, and for the occasional 503 network error to occur)
  - Missing data, hence missing data points
  - No bond market data, and because I was running out of time, I left out calling data on bonds and instead only on the stocks 

2. I was unsure of what the USD-SGD conversion would result in, and therefore while I multiplied the 1.45 (March 25th '20) value to each stock price, because of the normalization to 100k, it did not result in any changes. 
