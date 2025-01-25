// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, Typography, Box } from "@mui/material";
import DrawerComponent from "./components/DrawerComponent";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";

const drawerWidth = 200;

const App = () => {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
         <CssBaseline />
          {/* AppBar */}
        <AppBar
           position="fixed"
           sx={{
             zIndex: (theme) => theme.zIndex.drawer + 1,
             backgroundColor: "#1976d2",
          }}
         >
           <Toolbar>
             <Typography variant="h6" noWrap component="div">
               Money Tracker
             </Typography>
           </Toolbar>
        </AppBar>

      <DrawerComponent />
      <div className="flex-grow ml-16 mt-16 xl:ml-[15rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Box>
    </Router>
  );
};

export default App;

//  <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//          {/* AppBar */}
//         <AppBar
//           position="fixed"
//           sx={{
//             zIndex: (theme) => theme.zIndex.drawer + 1,
//             backgroundColor: "#1976d2",
//           }}
//         >
//           <Toolbar>
//             <Typography variant="h6" noWrap component="div">
//               Money Tracker
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         {/* Drawer */}
//         <DrawerComponent drawerWidth={drawerWidth} />
//         {/* Main Content */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             // marginLeft: { sm: `${drawerWidth}px` },
//             marginTop: "50px", // AppBar height
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/transactions" element={<Transactions />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//           </Routes>
//         </Box>
//       </Box> 



// const App = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [title, setTitle] = useState('');
//   const [amount, setAmount] = useState('');
//   const [type, setType] = useState('income');
//   const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
//   const [description, setDescription] = useState('');
//   const [balance, setBalance] = useState(0);

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_URL+"/transactions");
//       setTransactions(response.data);
//       calculateBalance(response.data);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   const calculateBalance = (transactions) => {
//     const totalBalance = transactions.reduce((acc, transaction) => {
//       return transaction.type === 'income'
//         ? acc + transaction.amount
//         : acc - transaction.amount;
//     }, 0);
//     setBalance(totalBalance);
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const addTransaction = async () => {
//     if (!title || !amount || !dateTime) {
//       alert('Please fill in all the required fields.');
//       return;
//     }

//     const newTransaction = {
//       title,
//       amount: Number(amount),
//       type,
//       dateTime,
//       description,
//     };

//     try {
//       await axios.post(process.env.REACT_APP_URL+"/transactions", newTransaction);
//       fetchTransactions();
//       setTitle('');
//       setAmount('');
//       setType('income');
//       setDateTime(new Date().toISOString().slice(0, 16));
//       setDescription('');
//     } catch (error) {
//       console.error('Error adding transaction:', error);
//     }
//   };

//   const deleteTransaction = async (id) => {
//     try {
//       await axios.delete(process.env.REACT_APP_URL+ `transactions/${id}`);
//       fetchTransactions();
//     } catch (error) {
//       console.error('Error deleting transaction:', error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5',
//       }}
//     >
//       <Paper elevation={3} sx={{ display: 'flex', justifyContent: 'space-evenly',gap: 2, padding: 4, width: '100%' , maxWidth: 1200 }}>
//         <Box >
//         <Typography variant="h4" align="center" gutterBottom>
//           Money Tracker
//         </Typography>
//         <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
//           Current Balance: Rs.{balance}
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//           />

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <TextField
//               label="Amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               type="number"
//               fullWidth
//             />
//             <TextField
//               label="Date & Time"
//               type="datetime-local"
//               value={dateTime}
//               onChange={(e) => setDateTime(e.target.value)}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Box>

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <TextField
//               select
//               label="Type"
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               fullWidth
//             >
//               <MenuItem value="income">Income</MenuItem>
//               <MenuItem value="expense">Expense</MenuItem>
//             </TextField>
//             <TextField
//               label="Description (Optional)"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               multiline
//               rows={2}
//               fullWidth
//             />
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={addTransaction}
//             fullWidth
//           >
//             Add Transaction
//           </Button>
//         </Box>
//         </Box>

//         <Box>
//         <Typography variant="h6" sx={{ marginTop: 4 }}>
//           Recent Transactions
//         </Typography>
//         <List>
//           {transactions.slice(0, 5).map((transaction) => (
//             <ListItem key={transaction._id} sx={{ borderBottom: '1px solid #ddd' }}>
//               <ListItemText
//                 primary={`${transaction.title} (${transaction.type})`}
//                 secondary={`${transaction.description || ''} - $${transaction.amount} - ${new Date(
//                   transaction.dateTime
//                 ).toLocaleString()}`}
//               />
//               <IconButton
//                 edge="end"
//                 aria-label="delete"
//                 onClick={() => deleteTransaction(transaction._id)}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </ListItem>
//           ))}
//         </List>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default App;
