import { useState, useEffect } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Line_graph from './Sub-components/Line_graph';
import LinearProgressWithLabel from './Sub-components/progress_bar';
import AskConfirmationBeforeSave from './Sub-components/ExpenseTable';
import ConditionalValidationGri from './Sub-components/ReminderTable';

import axios from 'axios';
import { useAuth } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

// function to calculate the total number of days left before the 1st of next month
function daysLeft() {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysLeft = lastDayOfMonth.getDate() - today.getDate();
    return daysLeft;
}

function DashboardFunction() {

    const { user } = useAuth();
    const [refreshlist, setRefreshList] = useState(false);
    const [expensesData, setExpensesData] = useState([]);
    const [billData, setBillData] = useState([]);
    const [mytarget, setMyTarget] = useState(10000);
    // State for Add Transaction Dialog
    const [openAddTransactionDialog, setOpenAddTransactionDialog] = useState(false);
    const [transactionData, setTransactionData] = useState({
        name: '',
        date: '',
        amount: '',
        type: ''
    });

    // State for Edit Your Target Dialog
    const [openEditTargetDialog, setOpenEditTargetDialog] = useState(false);
    const [targetData, setTargetData] = useState({
        amount: '',
        dueDate: ''
    });

    // State for Add Bill Reminder Dialog
    const [openAddBillReminderDialog, setOpenAddBillReminderDialog] = useState(false);
    const [billReminderData, setBillReminderData] = useState({
        name: '',
        amount: '',
        dueDate: ''
    });

    // Handlers for Add Transaction Dialog
    const handleOpenAddTransactionDialog = () => {
        setOpenAddTransactionDialog(true);
    };

    const handleCloseAddTransactionDialog = () => {
        setOpenAddTransactionDialog(false);
    };

    const handleChangeTransactionData = (event) => {
        const { name, value } = event.target;
        setTransactionData({ ...transactionData, [name]: value });
    };

    async function handleSubmitTransaction(e) {
        e.preventDefault();
        console.log(transactionData);
        let response = await axios.post(
            "http://localhost:8080/api/v1/expenses/add-expense",
            {
                userid: user['_id'],
                name: transactionData.name,
                date: transactionData.date,
                amount: transactionData.amount,
                type: transactionData.type,
            }
        );
        console.log(response.data);
        setRefreshList(!refreshlist);
        handleCloseAddTransactionDialog();
    }

    // Handlers for Edit Your Target Dialog
    const handleOpenEditTargetDialog = () => {
        setOpenEditTargetDialog(true);
    };

    const handleCloseEditTargetDialog = () => {
        setOpenEditTargetDialog(false);
    };

    const handleChangeTargetData = (event) => {
        const { name, value } = event.target;
        setTargetData({ ...targetData, [name]: value });
    };

    const handleSubmitTarget = () => {
        setMyTarget(targetData.amount);
        handleCloseEditTargetDialog();
    };

    // Handlers for Add Bill Reminder Dialog
    const handleOpenAddBillReminderDialog = () => {
        setOpenAddBillReminderDialog(true);
    };

    const handleCloseAddBillReminderDialog = () => {
        setOpenAddBillReminderDialog(false);
    };

    const handleChangeBillReminderData = (event) => {
        const { name, value } = event.target;
        setBillReminderData({ ...billReminderData, [name]: value });
    };

    async function handleSubmitBillReminder(e) {
        e.preventDefault();
        console.log(billReminderData);
        let response = await axios.post(
            "http://localhost:8080/api/v1/bills/add-bill",
            {
                userid: user['_id'],
                name: billReminderData.name,
                dueDate: billReminderData.dueDate,
                amount: billReminderData.amount,
            }
        );
        console.log(response.data);
        setRefreshList(!refreshlist);
        handleCloseAddBillReminderDialog();
    }



    async function getExpenses() {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/expenses/get-expense", { userid: user['_id'] });
            setExpensesData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getBills() {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/bills/get-bill", { userid: user['_id'] });
            setBillData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    if (!user) return (<Navigate to='/LoginPage' />);

    useEffect(() => {
        getExpenses();
        getBills();
    }, [refreshlist]);

    return (
        <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-2'>

            {/* Left side */}
            <div className="ml-14">
                {/* Content of the left side */}
                <div className="mt-5 text-center text-3xl font-bold">
                    <h1>Welcome back</h1>
                    <span className="text-blue-500">{user.username}</span>
                </div>

                {/* Other content of the left side */}
                <div className="mt-10 flex justify-between 2xl:mx-10">
                    <div className=" rounded-lg border border-grey-400 shadow-md p-10 bg- text-center">
                        <h2 className='text-[21px] font-bold'>Day Before Salary:</h2>
                        <span className="text-red-500 text-[30px]"> {daysLeft()} days</span>
                    </div>
                    <div className="rounded-lg border border-grey-400 shadow-md p-10 bg-white text-center">
                        <h2 className='text-[21px] font-bold'>Expected Balance: </h2>
                        <span className="text-green-500 text-[30px]">5000 AUD</span>
                    </div>
                </div>


                {/* Graph */}
                <div className='hidden md:block rounded-lg border border-grey-400 shadow-md p-5 text-center mt-5'>
                    <Line_graph />
                </div>

                {/* Saving goal */}
                <div className='mt-5'>
                    <h2 className='text-[30px] mb-2'>Saving Goal</h2>
                    <div className='rounded-lg border border-grey-400 shadow-md p-10 '>
                        <h2 className='font-bold text-[20px] md-2 '> Saving target</h2>
                        <LinearProgressWithLabel percent={7000 / mytarget * 100} />
                        <div>
                            <p className='mt-2 font-medium text-green-500'>7000
                                <span className='text-black mx-2'>/</span>
                                <span className='text-red-500'>{mytarget}</span></p>
                        </div>
                        <button className='border bg-[#1E94FD] text-white mt-2 p-2 rounded-xl' onClick={handleOpenEditTargetDialog}>Edit your target</button>
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className='ml-16 mt-5'>
                {/* Transaction */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className='text-[40px] mb-3'>Transaction</h2>
                        <button className='border p-4 rounded-full bg-[#1E94FD] text-white text-xl' onClick={handleOpenAddTransactionDialog}>Add Transaction</button>
                    </div>
                    {
                        expensesData.length > 0 && <AskConfirmationBeforeSave expensesData={expensesData} />
                    }
                </div>

                {/* Catagory & subscription */}
                <div style={{ height: 340, width: '100%' }}>
                    {/* Content of the right side */}
                    <div className='mt-5'>
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className='text-[30px] mb-3'>Bill Reminder</h2>
                                <button className='border p-3 rounded-full bg-[#1E94FD] text-white text-xl' onClick={handleOpenAddBillReminderDialog}>Add Bill Reminder</button>
                            </div>
                            <ConditionalValidationGri billData={billData} />
                        </div>
                    </div>

                </div>
            </div>

            {/* Add Transaction Dialog */}
            <Dialog open={openAddTransactionDialog} onClose={handleCloseAddTransactionDialog}>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={transactionData.name}
                        onChange={handleChangeTransactionData}
                    />
                    <TextField
                        margin="dense"
                        id="date"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={transactionData.date}
                        onChange={handleChangeTransactionData}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={transactionData.amount}
                        onChange={handleChangeTransactionData}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            name="type"
                            value={transactionData.type}
                            onChange={handleChangeTransactionData}
                        >
                            <MenuItem value="education">Education</MenuItem>
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="entertainment">Entertainment</MenuItem>
                            <MenuItem value="food">Food</MenuItem>
                            <MenuItem value="outcome">Outcome</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddTransactionDialog}>Cancel</Button>
                    <Button onClick={handleSubmitTransaction} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Your Target Dialog */}
            <Dialog open={openEditTargetDialog} onClose={handleCloseEditTargetDialog}>
                <DialogTitle>Edit Your Target</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Enter your amount"
                        type="number"
                        fullWidth
                        value={targetData.amount}
                        onChange={handleChangeTargetData}
                    />
                    <TextField
                        margin="dense"
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        fullWidth
                        value={targetData.dueDate}
                        onChange={handleChangeTargetData}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditTargetDialog}>Cancel</Button>
                    <Button onClick={handleSubmitTarget} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Bill Reminder Dialog */}
            <Dialog open={openAddBillReminderDialog} onClose={handleCloseAddBillReminderDialog}>
                <DialogTitle>Add Bill Reminder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Bill's Name"
                        type="text"
                        fullWidth
                        value={billReminderData.name}
                        onChange={handleChangeBillReminderData}
                    />
                    <TextField
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={billReminderData.amount}
                        onChange={handleChangeBillReminderData}
                    />
                    <TextField
                        margin="dense"
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        fullWidth
                        value={billReminderData.dueDate}
                        onChange={handleChangeBillReminderData}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddBillReminderDialog}>Cancel</Button>
                    <Button onClick={handleSubmitBillReminder} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default DashboardFunction;
