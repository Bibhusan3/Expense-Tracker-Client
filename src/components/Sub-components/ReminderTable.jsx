import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai'; // Import icons
import axios from 'axios'; // Import axios for HTTP requests

// StyledBox component with custom styles
const StyledBox = styled('div')(({ theme }) => ({
  height: 300,
  width: '100%',
  '& .MuiDataGrid-cell--editing': {
    backgroundColor: 'rgb(255,215,115, 0.19)',
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
}));

// Function to handle row deletion
const handleDeleteRow = async (row) => {
  // ask for confirmation before deleting the row
  if (window.confirm(`Are you sure you want to delete this row? \n"${row.name}"`)) {
    // delete the row
    const res = await axios.post('http://localhost:8080/api/v1/bills/delete-bill', { billId: row._id });
    if (res.status === 200) {
      // refresh the page
      window.location.reload();
    } else {
      console.log('Failed to delete expense');
    }
  }
};


// Functional component to render a conditional validation grid
export default function ConditionalValidationGrid({ billData }) {
  // Columns configuration for the data grid
  const columns = [
    { field: 'name', headerName: 'Name', width: 160, editable: true },
    {
      field: 'dueDate',
      headerName: 'Due date',
      type: 'date',
      width: 120,
      editable: true,
      valueGetter: (params) => new Date(params),
    },

    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      editable: true,
      renderCell: (params) => {
        // Handler function for input change
        const handleChange = (event) => {
          const { value } = event.target;
          params.setValue(value);
          if (value.toLowerCase() === 'paid') {
            params.setCellMode(params.id, params.field, 'view');
          }
        };

        // Handler function for key down event
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            params.setCellMode(params.id, params.field, 'view');
          }
        };

        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: params.value.toLowerCase() === 'paid' ? 'green' : 'red' }}>
              {params.value ? params.value : 'unpaid'}
            </span>
            <input
              type="text"
              value={params.value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              style={{
                border: 'none',
                outline: 'none',
                color: 'transparent',
                width: '80px',
                position: 'absolute',
                zIndex: '-1',
              }}
            />
            {params.value.toLowerCase() === 'paid' && <AiOutlineCheck style={{ marginLeft: '5px' }} />}
          </div>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete', // Change header name to "Delete"
      width: 80,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} onClick={() => handleDeleteRow(params.row)}>
          <AiOutlineDelete />
        </div >
      ),
    },
  ];

  return (
    <StyledBox>
      {/* Render DataGrid with specified rows and columns */}
      <DataGrid rows={billData} columns={columns} editMode="row" getRowId={(row) => row._id} />
    </StyledBox>
  );
}
