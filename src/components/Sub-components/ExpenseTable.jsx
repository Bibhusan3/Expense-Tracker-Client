import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import axios from 'axios';


// Custom hook to simulate a mutation (HTTP request) to save data
const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(); // Reject promise if user name is empty
          } else {
            resolve(user); // Resolve promise if user name is not empty
          }
        }, 200);
      }),
    [],
  );
};

// Function to determine the mutation message based on changes in row data
function computeMutation(newRow, oldRow) {
  if (newRow.name !== oldRow.name) {
    return `Name changed from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.amount !== oldRow.amount) {
    return `Amount changed from '${oldRow.amount || ''}' to '${newRow.amount || ''}'`;
  }
  if (newRow.date !== oldRow.date) {
    return `Date changed from '${oldRow.date || ''}' to '${newRow.date || ''}'`;
  }
  if (newRow.type !== oldRow.type) {
    return `Type changed from '${oldRow.type || ''}' to '${newRow.type || ''}'`;
  }
  if (newRow.actions !== oldRow.actions) {
    return `Actions changed from '${oldRow.actions || ''}' to '${newRow.actions || ''}'`;
  }
  return null; // Return null if no changes detected
}

// Function to handle row deletion
const handleDeleteRow = async (row) => {
  // ask for confirmation before deleting the row
  if (window.confirm(`Are you sure you want to delete this row? \n"${row.name}"`)) {
    // delete the row
    const res = await axios.post('http://localhost:8080/api/v1/expenses/delete-expense', { expenseId: row._id });
    if (res.status === 200) {
      // refresh the page
      window.location.reload();
    } else {
      console.log('Failed to delete expense');
    }
  }
};




// Component to handle confirmation dialog before saving changes
export default function AskConfirmationBeforeSave({ expensesData }) {
  const mutateRow = useFakeMutation(); // Hook to simulate mutation
  const noButtonRef = React.useRef(null); // Ref for the "No" button in the confirmation dialog
  const [promiseArguments, setPromiseArguments] = React.useState(null); // State to store promise arguments

  const [snackbar, setSnackbar] = React.useState(null); // State for Snackbar (notification)
  // Function to close the Snackbar (notification)
  const handleCloseSnackbar = () => setSnackbar(null);


  // Function to process row update with confirmation dialog
  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow); // Determine the mutation message
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Resolve with the old row if no changes detected
        }
      }),
    [],
  );



  // Function to handle "No" button click in the confirmation dialog
  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to cancel the update
    setPromiseArguments(null);
  };

  // Function to handle "Yes" button click in the confirmation dialog
  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    console.log('Saving user:', newRow);
    try {
      // Simulate HTTP request to save the updated data
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' }); // Show success message
      resolve(response); // Resolve promise with the updated data
      setPromiseArguments(null);
      const res = await axios.post('http://localhost:8080/api/v1/expenses/edit-expense', newRow);
      console.log(res);
    } catch (error) {
      setSnackbar({ children: 'Name cannot be empty', severity: 'error' }); // Show error message
      reject(oldRow); // Reject promise and revert changes
      setPromiseArguments(null);
    }
  };

  // Function to focus on the "No" button when the dialog is opened
  const handleEntered = () => {
    // autoFocus is not used to prevent accidental activation of "No" button on Enter
    // Manually focus on the "No" button when the dialog is fully open
    // noButtonRef.current?.focus();
  };

  // Columns configuration for the DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 180,
      editable: true,
      valueGetter: (params) =>
        new Date(params)
    },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 180, editable: true },
    { field: 'type', headerName: 'Type', width: 180, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" color="secondary" onClick={() => handleDeleteRow(params.row)}>
          Delete
        </Button>
      ),
    },
  ];


  // Function to render the confirmation dialog
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };



  return (
    <div style={{ height: 510, width: '100%' }}>
      {renderConfirmDialog()}
      <DataGrid
        rows={expensesData}
        getRowId={(row) => row._id}

        columns={columns}
        processRowUpdate={processRowUpdate}
        sortingOrder={['asc', 'desc']}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'name',
                sort: 'asc',
              },
            ],
          },
        }}

      />
      {!!snackbar && (
        <Snackbar
          open
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}



