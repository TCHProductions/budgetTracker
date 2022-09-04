const Expense = require('../models/Expense')
const Budget = require('../models/Budget')


module.exports = {
    getExpenses: async (req,res)=>{
        console.log(req.user)
        try{
            const expenseItems = await Expense.find({userId:req.user.id})
            const budget = await Budget.find({userId:req.user.id})
            const itemsLeft = await Expense.countDocuments({userId:req.user.id,completed: false})
            res.render('expenses.ejs', {expenses: expenseItems, left: itemsLeft, user: req.user, budget: budget})
        }catch(err){
            console.log(err)
        }
    },

    createExpense: async (req, res)=>{
        try{
            await Expense.create({expense: req.body.itemName, amount: req.body.itemAmount, completed: false, userId: req.user.id})
            console.log('Expense has been added!')
            res.redirect('/expenses')
        }catch(err){
            console.log(err)
        }
    },
    deleteExpense: async (req, res)=>{
        console.log(req.body.expenseIdFromJSFile)
        try{
            await Expense.findOneAndDelete({_id:req.body.expenseIdFromJSFile})
            console.log('Deleted Expense')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    
