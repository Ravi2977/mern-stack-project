
const Transaction = require('../Modals/Transaction')

const addTransaction = async (req, resp) => {
    const transaction = req.body;
        const newTransaction = await Transaction.create({
            id: transaction.id,
            title: transaction.title,
            price: transaction.price,
            description: transaction.description,
            category: transaction.category,
            image: transaction.image,
            sold: transaction.sold,
            dateOfSale: transaction.dateOfSale
        });
        resp.json({ results });
    }

    


const fetchTransaction = async (req,resp)=>{
    const transactions =await Transaction.find();
    resp.json({transactions})
}
const deleteById=async (req,resp)=>{
    const id =req.params.id;
    const response =await Transaction.deleteOne({id:id});
    resp.json({"Success":"Deleted"})
}
const fetchById=async (req,resp)=>{
    const id =req.params.id;
    const response = await Transaction.findById(id)
    resp.json({response})
}
module.exports = ({
    addTransaction,
    fetchTransaction,
    deleteById,
    fetchById
})