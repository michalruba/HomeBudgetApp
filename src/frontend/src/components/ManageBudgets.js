import React, { useState, useEffect } from 'react';
import api from '../API/api';
import '../styles/ManageBudgets.css';
import Logout from "./Logout";
import {useNavigate} from "react-router-dom";

const ManageBudgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [newBudget, setNewBudget] = useState({
        name: '',
        totalAmount: 0,
        startDate: new Date(),
        endDate: new Date(),
        userId: ''
    });
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        fetchBudgets();
        fetchUsers();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await api.get('/Budget');
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
            setError('Nie udało się pobrać budżetów');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get('/User');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Nie udało się pobrać użytkowników');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBudget(prevState => ({
            ...prevState,
            [name]: name === 'totalAmount' ? parseFloat(value) : value
        }));
    };

    const handleCreateBudget = async () => {
        try {
            const response = await api.post('/Budget', newBudget);
            console.log('Budget created:', response.data);
            setNewBudget({
                name: '',
                totalAmount: 0,
                startDate: new Date().toLocaleDateString(),
                endDate: new Date().toLocaleDateString(),
                userId: ''
            });
            fetchBudgets();
        } catch (error) {
            console.error('Error creating budget:', error);
            setError('Nie udało się utworzyć budżetu');
        }
    };

    const handleDeleteBudget = async (id) => {
        try {
            await api.delete(`/Budget/${id}`);
            console.log('Budget deleted:', id);
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget:', error);
            setError('Nie udało się usunąć budżetu');
        }
    };
    const goToManageTransactions = () => {
        navigate('/manage-transactions');
    };

    const goToHomePage = () => {
        navigate('/home');
    };
    return (
        <div className="manageBudgetsContainer">
            <div className="topBar">
                <div className="menuContainer">
                    <button onClick={goToHomePage} className="menuItem">Strona główna</button>
                    <button onClick={goToManageTransactions} className="menuItem">Zarządzaj transakcjami</button>
                </div>
                <Logout/>
            </div>
            <h3>Utwórz nowy budżet</h3>
            <div>
                <label>Nazwa:</label>
                <input type="text" name="name" value={newBudget.name} onChange={handleChange}/>
            </div>
            <div>
                <label>Łączna kwota (PLN):</label>
                <input type="number" name="totalAmount" value={newBudget.totalAmount} onChange={handleChange}/>
            </div>
            <div>
                <label>Data rozpoczęcia:</label>
                <input type="date" name="startDate" value={newBudget.startDate} onChange={handleChange}/>
            </div>
            <div>
                <label>Data zakończenia:</label>
                <input type="date" name="endDate" value={newBudget.endDate} onChange={handleChange}/>
            </div>
            <div>
                <label>Użytkownik:</label>
                <select name="userId" value={newBudget.userId} onChange={handleChange}>
                    <option value="">Wybierz użytkownika</option>
                    {users.map(user => (
                        <option key={user.userId} value={user.userId}>{user.username}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleCreateBudget}>Utwórz budżet</button>
            {error && <p>{error}</p>}
            <h2>Budżety</h2>
            <ul>
                {budgets.map(budget => (
                    <li key={budget.budgetId}>
                        <div>
                            <strong>{budget.name}</strong> - {budget.totalAmount.toFixed(2)} PLN
                            <br/>
                        </div>
                        <button onClick={() => handleDeleteBudget(budget.budgetId)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageBudgets;
