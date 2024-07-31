import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageTransactions.css';
import Logout from "./Logout";
import api from '../API/api';

const ManageTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        description: '',
        amount: 0,
        type: '',
        budgetId: ''
    });
    const [budgets, setBudgets] = useState([]);
    const [selectedBudgetId, setSelectedBudgetId] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [error, setError] = useState('');
    const [budgetMap, setBudgetMap] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
        fetchBudgets();
    }, []);

    const fetchTransactions = async () => {
        try {
            const params = {};

            if (selectedBudgetId) {
                params.budgetId = selectedBudgetId;
            }

            const response = await api.get('/Transaction', { params });
            const transactionsWithBudgets = response.data.map(transaction => ({
                ...transaction,
                budgetName: getBudgetName(transaction.budgetId)
            }));
            const sortedTransactions = transactionsWithBudgets.sort((a, b) => b.transactionId - a.transactionId);
            setTransactions(sortedTransactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError('Nie udało się pobrać transakcji');
        }
    };

    const getBudgetName = (budgetId) => {
        const budget = budgets.find(b => b.budgetId === budgetId);
        return budget ? budget.name : '';
    };

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'budgetId') {
            setSelectedBudgetId(value);
        } else {
            setNewTransaction(prevState => ({
                ...prevState,
                [name]: name === 'amount' ? parseFloat(value) : value
            }));
        }
    };

    const handleCreateTransaction = async () => {
        try {
            const response = await api.post('/Transaction', {
                ...newTransaction,
                date: new Date().toISOString(),
                budgetId: parseInt(selectedBudgetId)
            });
            console.log('Transaction created:', response.data);
            setNewTransaction({
                description: '',
                amount: 0,
                type: '',
                budgetId: ''
            });
            fetchTransactions();
        } catch (error) {
            console.error('Error creating transaction:', error);
            setError('Nie udało się utworzyć transakcji');
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            await api.delete(`/Transaction/${id}`);
            console.log('Transaction deleted:', id);
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            setError('Nie udało się usunąć transakcji');
        }
    };

    const handleScroll = (e) => {
        const { scrollTop } = e.target;
        setScrollPosition(scrollTop);
    };

    const transactionType = (type) => {
        return type === 'Income' ? 'Wpływ' : 'Wydatek';
    };

    const goToManageBudgets = () => {
        navigate('/manage-budgets');
    };

    const goToHomePage = () => {
        navigate('/home');
    };

    return (
        <div className="manageTransactionsContainer">
            <div className="topBar">
                <div className="menuContainer">
                    <button onClick={goToHomePage} className="menuItem">Strona główna</button>
                    <button onClick={goToManageBudgets} className="menuItem">Zarządzaj portfelami</button>
                </div>
                <Logout />
            </div>

            <div className="panelsContainer">
                <div className="leftPanel">
                    <h2>Dodaj transakcję</h2>
                    <div>
                        <label>Opis:</label>
                        <input type="text" name="description" value={newTransaction.description} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Kwota (PLN):</label>
                        <input type="number" name="amount" value={newTransaction.amount} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Rodzaj:</label>
                        <select name="type" value={newTransaction.type} onChange={handleChange}>
                            <option value="">Wybierz rodzaj</option>
                            <option value="Income">Wpływ</option>
                            <option value="Expense">Wydatek</option>
                        </select>
                    </div>
                    <div>
                        <label>Portfel:</label>
                        <select name="budgetId" value={selectedBudgetId} onChange={handleChange}>
                            <option value="">Wybierz portfel</option>
                            {budgets.map(budget => (
                                <option key={budget.budgetId} value={budget.budgetId}>{budget.name}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleCreateTransaction}>Utwórz transakcję</button>
                </div>

                <div className="rightPanel" onScroll={handleScroll}>
                    <h2>Transakcje</h2>
                    <ul style={{ top: scrollPosition }}>
                        {transactions.map(transaction => (
                            <li key={transaction.transactionId}>
                                <div>
                                    <strong>{transactionType(transaction.type)}</strong>{" "}
                                    <strong>{"Opis: "}{transaction.description}</strong> {transaction.amount.toFixed(2)} PLN
                                    <br />
                                    Data: {new Date(transaction.date).toLocaleDateString()} {' '}
                                    Portfel: {budgetMap[transaction.budgetId]}
                                </div>
                                <button onClick={() => handleDeleteTransaction(transaction.transactionId)}>Usuń</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ManageTransactions;
