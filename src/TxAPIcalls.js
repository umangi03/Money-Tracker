import { useState, useEffect } from "react";
import axios from "axios";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/transactions`);
      const data = Array.isArray(response.data) ? response.data : Object.values(response.data);
      setTransactions(data);
      calculateBalance(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const calculateBalance = (data) => {
    const totalBalance = data.reduce((acc, transaction) => {
      return transaction.type === "Income"
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
    setBalance(totalBalance);
  };

  const addTransaction = async (newTransaction) => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/transactions`, newTransaction);
      fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const editTransaction = async (id, updatedTransaction) => {
    console.log("hellooo");
    console.log(id);
    try {
      await axios.put(`${process.env.REACT_APP_URL}/transactions/${id}`, updatedTransaction);
      fetchTransactions();
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    balance,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };
};
