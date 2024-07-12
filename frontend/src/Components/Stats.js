import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Stats() {
    const [transaction, setTransactions] = useState([])
    useEffect(() => {
        loadTransactions();
    }, [])

    const loadTransactions = async () => {
        const response = await axios.get("http://localhost:8082/transaction")
        setTransactions(response.data.transactions)
        console.log(response.data.transactions)
    }
    let soldItems=0;
    let unsoldItems=0;
    let totalSale=0;
    for(let i=0;i<transaction.length;i++){
        if(transaction[i].sold){
            soldItems+=1;
           
        }else{
            unsoldItems+=1;
            
        }
        totalSale+=transaction[i].price;
    }
    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='text-3xl font-bold my-4 text-blue-700 text-center'>Statistics :- June</div>
            <div className="h-96 w-[30rem] bg-yellow-300 rounded-lg flex justify-center items-center">
                <div className="grid grid-cols-2 p-9">
                    <div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            Total Sale :-
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            sold items:-
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            Unsold Items:-
                        </div>
                    </div>
                    <div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            {totalSale}
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                            {soldItems}
                        </div>
                        <div className='m-2 p-2 text-xl font-semibold'>
                           {unsoldItems}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats
