import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Chartbar() {
  const [transaction, setTransactions] = useState([])
    useEffect(() => {
        loadTransactions();
    }, [])

    const loadTransactions = async () => {
        const response = await axios.get("https://mern-stack-project-wcx3.onrender.com/transaction")
        setTransactions(response.data.transactions)
        console.log(response.data.transactions)
    }
  const [selectedMonth, setSelectedMonth] = useState(3);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const handleSelectChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  function groupProductsByPriceRange(transaction) {

    // Define the price ranges
    const data = [
      { name: '0-100', min: 0, max: 100, quantity: 0 },
      { name: '101-200', min: 101, max: 200, quantity: 0 },

      { name: '201-300', min: 201, max: 300, quantity: 0 },
      { name: '301-400', min: 301, max: 400, quantity: 0 },
      { name: '401-500', min: 401, max: 500, quantity: 0 },
      { name: '501-600', min: 501, max: 600, quantity: 0 },
      { name: '601-700', min: 601, max: 700, quantity: 0 },
      { name: '701-800', min: 701, max: 800, quantity: 0 },
      { name: '801-900', min: 801, max: 900, quantity: 0 },
      { name: '901-above', min: 901, max: Infinity, quantity: 0 }
    ];

    // Iterate over each product in the transaction array
    transaction.forEach(product => {
      // Find the corresponding price range for the product
      console.log("Sale date ", product.dateOfSale)
      const saleMonth = parseInt(product.dateOfSale.split("-")[1])
      const selectedMonthInt = parseInt(selectedMonth);
      if (saleMonth === selectedMonthInt) {
        const range = data.find(range => product.price >= range.min && product.price <= range.max);

        // Increment the quantity for the found range
        if (range) {
          range.quantity += 1;
        }
      }
    });

    return data.map(range => ({ name: range.name, quantity: range.quantity }));
  }

  const groupedProducts = groupProductsByPriceRange(transaction);

  return (
    <div className='flex justify-center items-center p-32 flex-col'>
      <div className='flex justify-center items-center flex-col mb-6'>
      <div className="text-red-700 text-center font-semibold">! Importetnt :- This app is deployed on render.com for free Deployment sometimes it can take upto 1-2 minutes to responding kindly wait for 1-2 minute</div>

        <label htmlFor="month">Select month</label>
        <div className="relative inline-block text-left">
          <select
            value={selectedMonth}
            onChange={handleSelectChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-2 rounded-lg p-2 shadow-lg"
          >
            <option value="" disabled>Select a month</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="80%" height={500}>
        <BarChart
          width={200}
          height={200}
          data={groupedProducts} // use groupedProducts here
          margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis  />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chartbar;
