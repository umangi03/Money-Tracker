import { useState, useEffect } from "react";
import React from "react";
import { Box, 
    Paper, 
    TextField,
    Typography,
    Button,
    MenuItem
 } from "@mui/material";
import axios from "axios";
import { useTransactions } from "../TxAPIcalls.js";
 
const MTapp = () => {
    const {balance, addTransaction} = useTransactions();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
    const [description, setDescription] = useState('');


    const handleAddTransaction = () => {
        if (!title || !amount || !dateTime) {
          alert("Please fill in all the required fields.");
          return;
        }
    
        const newTransaction = {
          title,
          amount: Number(amount),
          type,
          dateTime,
          description,
        };
    
        try {
        addTransaction(newTransaction);
        setTitle("");
        setAmount("");
        setType("income");
        setDateTime(new Date().toISOString().slice(0, 16));
        setDescription("");
    } catch (error) {
        console.error('Error adding transaction:', error);
    }
      };

    return (
            <Paper elevation={3} sx={{ justifyContent: 'space-evenly', gap: 2, padding: 4, width: '100%' }}>
                <Box >
                    <Typography variant="h4" align="center" sx={{marginBottom: 3}}>
                    Current Balance: Rs.{balance}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number"
                                fullWidth
                            />
                            <TextField
                                label="Date & Time"
                                type="datetime-local"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                select
                                label="Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Income">Income</MenuItem>
                                <MenuItem value="Expense">Expense</MenuItem>
                            </TextField>
                            <TextField
                                label="Description (Optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={2}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{mx: 'auto'}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTransaction}
                            // fullWidth
                            sx={{ zIndex: 2, px: 4, py: 1 }}
                        >
                            Add Transaction
                        </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
    );
};

export default MTapp;
