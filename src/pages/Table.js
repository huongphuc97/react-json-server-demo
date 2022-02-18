import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'


const Table = () => {

    const [tableData, getTableData] = useState([])

    const [modal, modalData] = useState([])

    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(response => {
                getTableData(response.data)
            })
    }, [])

    const handleClickOpen = (item) => {
        setOpen(true);
        modalData(item)

    };

    const deleteUser = (item) => {
        axios.delete(`http://localhost:3000/posts/${item.row.id}`)
            .then(response => {
                alert('User deleted')
            })
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };

    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'author', headerName: 'Author', width: 130 },
        {
            field: 'action', headerName: 'Action', width: 300, renderCell: (cellValues) => {
                return (

                    <div>
                        <Button variant="outlined" onClick={() => {
                            handleClickOpen(cellValues);
                        }}>
                            Delete user
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"

                        >
                            <DialogTitle id="alert-dialog-title">
                                Delete
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => {
                                    deleteUser(modal);
                                }}>Agree</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                );
            }
        }

    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onCellClick={handleCellClick}
                onRowClick={handleRowClick}
            />
        </div>
    );
}

export default Table