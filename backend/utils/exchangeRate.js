const axios = require('axios');

const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const rate = response.data.rates[toCurrency];
    if (!rate) {
      throw new Error(`No se pudo obtener la tasa de cambio para ${toCurrency}`);
    }
    return rate;
  } catch (error) {
    console.error('Error al obtener la tasa de cambio:', error);
    throw new Error('Error al obtener la tasa de cambio');
  }
};

module.exports = { getExchangeRate };
