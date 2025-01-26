import React,{useState} from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AgGridReact } from 'ag-grid-react';
import { useTransactions } from "../TxAPIcalls";
import { AllCommunityModule, checkboxStyleDefault, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import EditDialogBox from "../components/EditDialogBox";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const Transactions = () => {
  const { transactions,editTransaction, deleteTransaction } = useTransactions();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenEditDialog(true);
  };

  const handleEditSave = (updatedTransaction) => {
    console.log("`hello..");
    console.log(updatedTransaction._id);
    editTransaction(updatedTransaction._id, updatedTransaction);
    setOpenEditDialog(false);
    setSelectedTransaction(null);
  };


  const cols = [
    {
      headerName: 'Title',
      field: "title",
      flex: 1.25,
    },
    {
      headerName: 'Date',
      field: "dateTime",
      flex: 1,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString(),
    },
    {
      headerName: 'Tx type',
      field: "type",
      cellEditorParams: {
        values: ["Income", "Expense"],
      },
      flex: 1
    },
    {
      headerName: 'Amount(Rs.)',
      field: "amount",
      filter: "agNumberColumnFilter",
      flex: 1
    },
    {
      headerName: 'Description',
      field: "description",
      flex: 1.5
    },
    {
      headerName: 'Actions',
      flex: 1,
      cellRenderer: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <IconButton
              color="primary"
              aria-label="edit"
              onClick={() => handleEditClick(params.data)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="delete"
              onClick={async() => {
                await deleteTransaction(params.data._id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      <div style={{ width: "100%", height: 550 }}>
        <AgGridReact
          rowData={transactions}
          columnDefs={cols}
          theme={themeQuartz}
          defaultColDef={defaultColDef}
          rowHeight={48}
        />
      </div>

      <EditDialogBox
        open={openEditDialog}
        data={selectedTransaction}
        onClose={() => setOpenEditDialog(false)}
        onSave={handleEditSave}
      />

    </Box>
  );
};

export default Transactions;
