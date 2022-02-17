import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios'


const DataTable = () => {
    const data = useState([])
    axios.get('http://localhost:3000/posts')
        .then(({ data }) => console.log(data))
    const rows = { data }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'author', headerName: 'Author', width: 130 },
    ];
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

export default DataTable