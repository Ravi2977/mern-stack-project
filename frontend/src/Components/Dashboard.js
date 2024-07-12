import axios from 'axios';
import React, { useEffect, useState } from 'react';
import transaction from './Transaction.json'

function Dashboard() {
    const transactionData = transaction;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [filter, setFilter] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(3);
    const [transactions, setTransactions] = useState([])

    const handleInputChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    for (let i = 0; i < transactionData.length; i++) {
        console.log(transactionData[i].id, ":-", parseInt(transactionData[i].dateOfSale.split("-")[1]))
    }
    console.log(selectedMonth)
    return (
        <div>
            <div className='text-3xl font-bold my-4 text-blue-700 text-center'>Transaction Dashboard</div>
            <div className='m-6 flex justify-around'>
                <div className='flex justify-center items-center flex-col'>
                    <label htmlFor="searchName">Filter</label>
                    <input
                        type="text"
                        name="filter"
                        value={filter}
                        onChange={handleInputChange}
                        className='border-2 rounded-lg p-2 shadow-lg'
                    />
                </div>
                <div className='flex justify-center items-center flex-col'>
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
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-36">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Sold</th>
                            <th scope="col" className="px-6 py-3">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transaction.map((data, index) => {
    const saleMonth = parseInt(data.dateOfSale.split("-")[1]);
    const selectedMonthInt = parseInt(selectedMonth);
    const lowerCaseFilter = filter.toLowerCase();

    if (selectedMonthInt === saleMonth) {
        if (!filter || 
            data.title.toLowerCase().includes(lowerCaseFilter) ||
            data.description.toLowerCase().includes(lowerCaseFilter) ||
            data.price.toString().includes(lowerCaseFilter)
        ) {
            return (
                <tr key={index} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900">{data.id}</th>
                    <td className="px-6 py-4 font-medium text-gray-900">{data.title}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 w-96">
                        <p className='text-wrap'>{data.description}</p>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">Rs.{data.price}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{data.category}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{data.sold ? "sold" : "not Sold"}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                        <img src={data.image} className='h-20' alt={data.title} />
                    </td>
                </tr>
            );
        }
    }
    return null;
})}



                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
