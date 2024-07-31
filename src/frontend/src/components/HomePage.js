import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from "./Logout";
import '../styles/HomePage.style.css';

const HomePage = () => {
    const [budgets, setBudgets] = useState([]);
    const [budgetMap, setBudgetMap] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBudgets();
        fetchTransactions();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('https://localhost:7219/api/Budget');
            const budgetData = response.data.reduce((map, budget) => {
                map[budget.budgetId] = budget.name;
                return map;
            }, {});
            setBudgetMap(budgetData);
            setBudgets(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('https://localhost:7219/api/Transaction');
            const sortedTransactions = response.data.sort((a, b) => b.transactionId - a.transactionId);
            setTransactions(sortedTransactions);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const transactionType = (type) => {
        return type === 'Income' ? 'Wpływ' : 'Wydatek';
    };


    const handleScroll = (e) => {
        const { scrollTop } = e.target;
        setScrollPosition(scrollTop);
    };



    const goToManageBudgets = () => {
        navigate('/manage-budgets');
    };

    const goToManageTransactions = () => {
        navigate('/manage-transactions');
    };

    return (
        <div className="homePageContainer">
            <div className="topBar">
                <div className="menuContainer">
                    <button onClick={goToManageBudgets} className="menuItem">Zarządzaj portfelami</button>
                    <button onClick={goToManageTransactions} className="menuItem">Zarządzaj transakcjami</button>
                </div>
                <Logout />
            </div>

            <div className="contentContainer">
                <div className="budgetContainer">
                    <h2>Portfele</h2>
                    <ul className="budgetList">
                        {budgets.map(budget => (
                            <li key={budget.budgetId} className="budgetItem">
                                <div>
                                    <h3>{budget.name}</h3>
                                    <p>{budget.totalAmount.toFixed(2)} PLN</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="transactionsContainer">
                    <h2>Ostatnie transakcje</h2>
                    <div className="transactionListContainer" onScroll={handleScroll}>
                        <ul style={{top: scrollPosition}}>
                            {transactions.map(transaction => (
                                <li key={transaction.transactionId}>
                                    <div>
                                        <strong>{transactionType(transaction.type)}</strong>{" "}
                                        <strong>{"Opis: "}{transaction.description}</strong> {transaction.amount.toFixed(2)} PLN
                                        <br/>
                                        Data: {new Date(transaction.date).toLocaleDateString()} {' '}
                                        Portfel: {budgetMap[transaction.budgetId]}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
