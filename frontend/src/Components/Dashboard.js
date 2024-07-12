import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(3);

    const transactionsPerPage = 5;
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        const response = await axios.get("https://mern-stack-project-wcx3.onrender.com/transaction");
        setTransactions(response.data.transactions);
    };

    const handleSelectChange = (event) => {
        setSelectedMonth(event.target.value);
        setCurrentPage(1);
    };

    const handleInputChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const filteredTransactions = transactions.filter(data => {
        const saleMonth = parseInt(data.dateOfSale.split("-")[1]);
        const selectedMonthInt = parseInt(selectedMonth);
        const lowerCaseFilter = filter.toLowerCase();
        
        return (selectedMonthInt === saleMonth) && (
            !filter ||
            data.title.toLowerCase().includes(lowerCaseFilter) ||
            data.description.toLowerCase().includes(lowerCaseFilter) ||
            data.price.toString().includes(lowerCaseFilter)
        );
    });

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

    return (
        <div>
            <div className='text-3xl font-bold my-4 text-blue-700 text-center'>Transaction Dashboard</div>
            <div className="text-red-700 text-center font-semibold">! Importetnt :- This app is deployed on render.com for free Deployment sometimes it can take upto 1-2 minutes to responding kindly wait for 1-2 minute</div>
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
                        {currentTransactions.map((data, index) => (
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
                        ))}
                    </tbody>
                </table>
            </div>
           
            <div className='flex justify-between mt-4 mb-4 mx-36'>
            <div> Page {currentPage} </div>
                <div className='flex'>
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className='border-2 rounded-lg p-2 shadow-lg mx-2'
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={indexOfLastTransaction >= filteredTransactions.length}
                        className='border-2 rounded-lg p-2 shadow-lg mx-2'
                    >
                        Next
                    </button>
                </div>
                <div>total pages :-{totalPages}</div>
            </div>
            
        </div>
    );
}

export default Dashboard;
