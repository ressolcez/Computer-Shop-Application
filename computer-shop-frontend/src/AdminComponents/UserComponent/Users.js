import React,{useState} from 'react';
import {DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddUserModal from '../SharedComponents/Modals/AddUserModal';
import EditUserModal from '../SharedComponents/Modals/EditUserModal';
import "./Users.css"

function Users({users,openModalEditUser,openModalAddUser,setOpenModalAddUser,setOpenModalEditUser,page,setPage,rowCount,deleteUser,onFilterChange}) {

  const [id,setId] = useState(1);
  const [user,setUser] = useState();

  const [successEdit, setSuccessEdit] = useState()
  const [successAdd, setSuccessAdd] = useState()

  const handleCloseModalAddUser = () => setOpenModalAddUser(false);
  const handleCloseModalEditUser = () => setOpenModalEditUser(false);

const columns = [
  { field: 'id', headerName: 'ID', width: 90,sortable: false,},
  {
    field: 'name',
    headerName: 'Imie',
    sortable: false,
    width: 180,
  },
  {
    field: 'login',
    headerName: 'Login',
    sortable: false,
    width: 200,
  },
  {
    field: 'password',
    headerName: 'Hasło',
    sortable: false,
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    width: 200,
  },
  {
    field: 'address',
    headerName: 'Adres',
    sortable: false,
    width: 200,
  },
  {
    field: 'houseNumber',
    headerName: 'Numer Domu',
    sortable: false,
    width: 200,
  },
  {
    field: 'postalCode',
    headerName: 'Kod Pocztowy',
    sortable: false,
    width: 200,
  },
  {
    field: 'roleName',
    headerName: 'Rola',
    sortable: false,
    width: 150, 
    renderCell: (params) => {
      return (
        <div>
          {params.row.rolesModel.name}
        </div>
      )
    }    
  },
  {
      field: 'action',
      headerName: 'Akcja',
      width: 80,
      renderCell: (params) => {
            return (
              <div style = {{display:'flex', justifyContent: 'center'}}>
                <IconButton onClick={() => {
                    setId(params.id);
                    setOpenModalEditUser(true);
                    setUser({id: params.id, name: params.row.name, surname: params.row.surname, login: params.row.login, email: params.row.email, address: params.row.address, houseNumber: params.row.houseNumber, posalCode: params.row.postalCode})
                    setSuccessEdit()
                  }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick = {()=> {                                    
                  deleteUser(params.id)}                 
                }>
                  <DeleteIcon />
                </IconButton>
                </div>
            );
        }
    },
];


return (
  <div className='admin__users__wrapper'>
    <AddUserModal openModal = {openModalAddUser} handleCloseModal = {handleCloseModalAddUser} success = {successAdd} setSuccess={setSuccessAdd}/>
    {user && <EditUserModal openModal = {openModalEditUser} handleCloseModal = {handleCloseModalEditUser} user = {user} id = {id} success = {successEdit} setSuccess = {setSuccessEdit}/>}
    
    <h1 style = {{fontFamily:'"Courier New", Courier, monospace', marginTop:'15px'}}>Użytkownicy</h1>
    <div className='admin__add__user'>
      <Button color = "success" variant = 'contained' onClick={() => {
        setSuccessAdd()
        setOpenModalAddUser(true)}}>Dodaj użytkownika</Button>
    </div>
    <div className='table__wrapper__user'>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={11}
        disableColumnFilter
        rowsPerPageOptions={[11]}
        density={"comfortable"}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        pagination
        page={page}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        rowCount={rowCount}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
      </div>
  </div>
)

}

export default Users