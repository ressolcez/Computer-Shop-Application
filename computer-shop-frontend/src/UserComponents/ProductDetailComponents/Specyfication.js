import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function Specyfication({details}) {
  console.log(details)
  return (
    <Table striped bordered hover>
    <tbody>
      {details &&
        Object.keys(details).slice(1).map((key, i)=>(
            <> 
              <tr key={i}>
                <td> {key.charAt(0).toUpperCase() + key.slice(1)}  </td>
                <td>{details[key]} </td>
              </tr>   
            </>  
        ))
    }
    </tbody>
    </Table>
  )
}

export default Specyfication