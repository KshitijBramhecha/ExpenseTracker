import React from 'react'
import { Progress } from 'antd'

const Analytics = ({ allTransaction }) => {
    //category
    const categories = ['salary', 'bills', 'food', 'movie', 'fees','tax'];

    //total transactions
    const totalTransaction = allTransaction.length
    const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100
    const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100

    //total turnover
    const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0)

    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalExpenseTurnover/totalTurnover) * 100    

    return (
        <>
            <div className='row m-3'>
                <div className='col-md-5'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Transactions : {totalTransaction}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income : {totalIncomeTransactions.length}</h5>
                            <h5 className='text-danger'>Expense : {totalExpenseTransactions.length}</h5>
                            <div className="d-flex justify-content-center align-items-center"> 
                                <Progress
                                    type='circle'
                                    strokeColor={'green'}
                                    className='mx-2 mt-3'
                                    percent={totalIncomePercent.toFixed(0)}
                                />
                                <Progress
                                    type='circle'
                                    strokeColor={'red'}
                                    className='mx-2 mt-3'
                                    percent={totalExpensePercent.toFixed(0)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-5'>
                    <div className='card'>
                        <div className='card-header'>
                            Total TurnOver : {totalTurnover}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Progress
                                    type='circle'
                                    strokeColor={'green'}
                                    className='mx-2 mt-3'
                                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                                />
                                <Progress
                                    type='circle'
                                    strokeColor={'red'}
                                    className='mx-2 mt-3'
                                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-4'>
                    <h5 className="bg-dark p-2 text-light rounded-5 text-center">Categorywise Income</h5>
                    {
                        categories.map(category => {
                            const amount = allTransaction.filter((transaction) => transaction.type === 'income' && transaction.category === category)
                            .reduce((acc, transaction) => acc + transaction.amount, 0)
                            return (
                                amount > 0 &&
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <Progress 
                                        percent={((amount/totalIncomeTurnover) * 100).toFixed(0)}/>                                    
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='col-md-4 '>
                    <h5 className="bg-warning p-2 rounded-5 text-center">Categorywise Expense</h5>
                    {
                        categories.map(category => {
                            const amount = allTransaction.filter((transaction) => transaction.type === 'expense' && transaction.category === category)
                            .reduce((acc, transaction) => acc + transaction.amount, 0)
                            return (
                                amount > 0 &&
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5>{category}</h5>
                                        <Progress 
                                        percent={((amount/totalExpenseTurnover) * 100).toFixed(0)}/>                                    
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="row mt-3 analytics"></div>
        </>
    )
}

export default Analytics