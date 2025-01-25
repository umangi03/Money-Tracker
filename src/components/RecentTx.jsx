import React from "react";
import { Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Paper,
    Tooltip,
    Divider
 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useTransactions } from "../TxAPIcalls.js";
import { green, grey, red, teal } from "@mui/material/colors";
import EditDialogBox from "./EditDialogBox.jsx";

const RecentTx = () => {
  const { transactions, editTransaction, deleteTransaction } = useTransactions();

    return (
        <Paper elevation={3} sx={{ justifyContent: 'space-evenly', gap: 2, padding: 4, width: '100%' }}>
        <Box>
            <Typography variant="h5">
                Recent Transactions
            </Typography>
            <Typography variant="body1" fontStyle={"oblique"}>View your latest transactions here...</Typography>
            <List>
      {transactions.slice(0, 5).map((transaction) => (
        <Tooltip title={transaction.description || "No description available"} arrow key={transaction._id}>
        <ListItem
          key={transaction._id}
          sx={{
            borderBottom: "1px solid #ddd",
            bgcolor: transaction.type === "Income" ? green[50] : red[50],
            display: "flex",
            alignItems: "center",
            }
          }
        >
          <ListItemText
            className="transaction-text"
            primary={`${transaction.title} (Rs. ${transaction.amount})`}
            secondary={`${new Date(transaction.dateTime).toLocaleString()}`}
            sx={{ flexGrow: 1 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => {<EditDialogBox data={transaction} />}}
              sx={{
                ":hover": {
                bgcolor: grey['A400'],
                }
              }}
            >
              <EditIcon />
          </IconButton>
          <IconButton
            className="delete-icon"
            edge="end"
            aria-label="delete"
            onClick={() => deleteTransaction(transaction._id)}
            sx={{
              ":hover": {
              bgcolor: grey['A400'],
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
          </Box>
        </ListItem>
        <Divider style={{borderColor: "grey"}}/>
        </Tooltip>
      ))}
    </List>
        </Box>
        </Paper>
    );

};

export default RecentTx;