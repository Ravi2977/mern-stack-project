import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stats() {
    const [selectedMonth, setSelectedMonth] = useState(3);
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({ totalSale: 0, soldItems: 0, unsoldItems: 0 });

    const months = [
        'All', 'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleSelectChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    useEffect(() => {
        const loadTransactions = async () => {
            const response = await axios.get("https://mern-stack-project-wcx3.onrender.com/transaction");
            setTransactions(response.data.transactions);
        }
        loadTransactions();
    }, []);

    useEffect(() => {
        let soldItems = 0;
        let unsoldItems = 0;
        let totalSale = 0;

        transactions.forEach(transaction => {
            const saleMonth = parseInt(transaction.dateOfSale.split("-")[1]);
            if (selectedMonth === 0 || selectedMonth === saleMonth) {
                if (transaction.sold) {
                    soldItems += 1;
                    totalSale += transaction.price;
                } else {
                    unsoldItems += 1;
                }
            }
        });

        setStats({ totalSale, soldItems, unsoldItems });
    }, [selectedMonth, transactions]);

    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='flex justify-center items-center flex-col mb-6'>
                <div className="text-red-700 text-center font-semibold">! Important: This app is deployed on render.com for free. Deployment sometimes it can take up to 1-2 minutes to respond. Kindly wait for 1-2 minutes.</div>

                <label htmlFor="month">Select month</label>
                <div className="relative inline-block text-left">
                    <select
                        value={selectedMonth}
                        onChange={handleSelectChange}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-2 rounded-lg p-2 shadow-lg"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='text-3xl font-bold my-4 text-blue-700 text-center'>Statistics: {months[selectedMonth]}</div>
            <div className="h-96 w-[30rem] bg-yellow-300 rounded-lg flex justify-center items-center">
                <div className="grid grid-cols-2 p-9">
                    <div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            Total Sale:
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            Sold Items:
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            Unsold Items:
                        </div>
                    </div>
                    <div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            {stats.totalSale}
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            {stats.soldItems}
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            {stats.unsoldItems}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;
