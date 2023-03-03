import React,{useState} from 'react';
import {DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddProductModal from '../SharedComponents/Modals/AddProductModal';
import EditProductModal from '../SharedComponents/Modals/EditProductModal';
import "./Products.css";

function Products({products,openModalAddProduct,setOpenModalAddProduct,openModalEditProduct,setOpenModalEditProduct,page,setPage,rowCount,deleteProduct,onFilterChange}) {

  const [product,setProduct] = useState();

  const [successAdd, setSuccessAdd] = useState();
  const [successEdit,setSuccessEdit] = useState();

  const handleCloseModalAddProduct = () => setOpenModalAddProduct(false);
  const handleCloseModalEditProduct = () => setOpenModalEditProduct(false);

  const columns = [
    { 
      field: 'id',
       headerName: 'ID', 
       width: 90 },
    {
      field: 'name',
      sortable: false,
      headerName: 'Nazwa',
      width: 150,
    },
    {
      field: 'slider',
      sortable: false,
      headerName: 'Slider',
      width: 100,
    },
    {
      field: 'quantityAvailable',
      sortable: false,
      headerName: 'Ilość sztuk',
      width: 200,
    },
    {
      field: 'producent',
      sortable: false,
      headerName: 'Producent',
      width: 150,
    },
    {
      field: 'description',
      sortable: false,
      headerName: 'Opis',
      width: 400,
    },
    {
      field: 'image',
      sortable: false,
      headerName: 'Zdjęcie',
      width: 200,
    },
    {
      field: 'price',
      sortable: false,
      headerName: 'Cena',
      width: 150,
    },
    {
      field: 'categoryName',
      sortable: false,
      headerName: 'Kategoria',
      width: 150,
      valueSetter: (params) => {
        return {...params.row,categoryModel:{...params.row.categoryModel,categoryName:params.value}}
      },  
      renderCell: (params) => {
        return (
          <div>
            {params.row.categoryModel.categoryName}
          </div>
        )
      }    
    },
    {
        field: 'fullNamed',
        sortable: false,
        headerName: 'Akcja',
        width: 80,
        renderCell: (params) => {
              return (
                <div style = {{display:'flex', justifyContent: 'center'}}>
                  <IconButton onClick={() => {
                    setOpenModalEditProduct(true);
                    setProduct({id : params.id,name: params.row.name, description: params.row.description,slider: params.row.slider, producent: params.row.producent, image: params.row.image, price: params.row.price, quantityAvailable: params.row.quantityAvailable})                    
                    setSuccessEdit('')
                }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    deleteProduct(params.id)
                    }}>
                    <DeleteIcon />
                  </IconButton>
                  </div>
              );
          }
      },
  ];
  
  return (
    <div className='admin__product__wrapper'>
      <AddProductModal openModal = {openModalAddProduct} handleCloseModal = {handleCloseModalAddProduct} success = {successAdd} setSuccess = {setSuccessAdd}/>
      {product && <EditProductModal openModal = {openModalEditProduct} handleCloseModal = {handleCloseModalEditProduct} product = {product} success = {successEdit} setSuccess = {setSuccessEdit}/>}
        <h1 style = {{fontFamily:'"Courier New", Courier, monospace', marginTop:'15px'}}>Produkty</h1>
        <div className='admin__add__product'>
          <Button color = "success" variant = 'contained' onClick={()=> {
            setSuccessAdd()
            setOpenModalAddProduct(true)}
            }>Dodaj produkt</Button>
        </div>
        <div className='table__wrapper'>
          <DataGrid
            disableColumnFilter
            rows={products}
            columns={columns}
            pageSize={11}
            rowsPerPageOptions={[11]}
            pagination
            page={page}
            density={"comfortable"}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
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

export default Products