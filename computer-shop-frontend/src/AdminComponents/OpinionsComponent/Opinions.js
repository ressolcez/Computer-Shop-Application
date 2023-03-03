import React,{useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditOpinionsModal from '../SharedComponents/Modals/EditOpinionsModal';
import Rating from "@mui/material/Rating";
import "./Opinions.css"

function Opinions({opinions,page,setPage,rowCount,openModalEditopinions,setOpenModalEditOpinions,deleteOpinion}) {
  
  const [editOpinion, setEditOpinion] = useState();
  const handleCloseModalEditOpinion = () => setOpenModalEditOpinions(false);
  const [success,setSuccess] = useState();  

    const columns = [
        { 
        field: 'id', 
        headerName: 'ID', 
        width: 90,
        sortable: false,  
        },
        { 
          field: 'userId', 
          headerName: 'Identyfikator Użytkownika', 
          width: 190,
          sortable: false,  
          renderCell: (params) => {
            return (
              <div style = {{display:'flex', justifyContent: 'flex-start',width:'100%'}}>
                {params.row.userModel.id}
              </div>
            );
        }
          },
          { 
            field: 'productId', 
            headerName: 'Identyfikator Produktu', 
            width: 190,
            sortable: false,  
            renderCell: (params) => {
              return (
                <div style = {{display:'flex', justifyContent: 'flex-start',width:'100%'}}>
                  {params.row.productModel.id}
                </div>
              );
          }
            },

        {
        field: 'comment',
        headerName: 'Komentarz',
        width: 950,
        sortable: false,
        },
        {
        field: 'rate',
        headerName: 'Ocena',
        width: 200,
        sortable: false,
        renderCell: (params) => {
          return (
            <div style = {{display:'flex', justifyContent: 'flex-start',width:'100%'}}>
               <Rating value= {parseFloat(params.row.rate)}  readOnly precision={0.5} />
            </div>
          );
      }
        },
        {
            field: 'fullNamed',
            headerName: 'Akcja',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                  return (
                    <div style = {{display:'flex', justifyContent: 'center'}}>
                    <IconButton onClick = {()=>{
                    setEditOpinion({id: params.id, comment: params.row.comment, rate: params.row.rate})
                    setSuccess()
                    setOpenModalEditOpinions(true)
                    }}>
                    <EditIcon/>
                      </IconButton>
                      <IconButton onClick = {()=>deleteOpinion(params.id)}>
                        <DeleteIcon />
                      </IconButton>
                      </div>
                  );
              }
          },
      ];



  return (
    <div className='admin__opinions__wrapper'>
      {editOpinion && <EditOpinionsModal openModal = {openModalEditopinions} handleCloseModal = {handleCloseModalEditOpinion}  opinion = {editOpinion} success = {success} setSuccess = {setSuccess}/>}
        <h1 style = {{fontFamily:'"Courier New", Courier, monospace', marginTop:'15px'}}>Opinie</h1>
        <div className='table__wrapper'>
            <DataGrid
            rows={opinions}
            columns={columns}
            disableColumnFilter 
            pageSize={11}
            density={"comfortable"}
            rowsPerPageOptions={[11]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            pagination
            page={page}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            rowCount={rowCount}
        />   
      </div>
    </div>
  )
}

export default Opinions