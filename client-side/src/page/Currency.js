import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "../component/Select";

function Currency() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/rates");
        console.log(data.data);
        if (data && data.data) {
          setRates(data.data);
        } else {
          console.error("Unexpected response data:", data);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!Object.keys(rates).length) {
    return (
      <div className="text-center mt-5">Failed to load currency rates.</div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Currency Converter</h1>
      <div className="row">
        <div className="col-md-6">
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            rates={rates}
            htmlFor="fromCurrency"
            id="fromCurrency"
            label="From"
          />
        </div>
        <div className="col-md-6">
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            rates={rates}
            htmlFor="toCurrency"
            id="toCurrency"
            label="To"
          />
        </div>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h2>
          Converted Amount: {convertedAmount} {toCurrency}
        </h2>
      </div>
    </div>
  );
}

export default Currency;
