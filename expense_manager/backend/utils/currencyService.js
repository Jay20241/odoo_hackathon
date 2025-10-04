// utils/currencyService.js
const axios = require('axios');

const getCurrencyForCountry = async (countryName) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const country = response.data[0];
        const currencyCode = Object.keys(country.currencies)[0];
        return currencyCode;
    } catch (error) {
        console.error('Failed to fetch currency for country:', error.message);
        // Fallback or throw error
        throw new Error('Could not find currency for the specified country.');
    }
};

module.exports = { getCurrencyForCountry };