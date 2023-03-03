import React from 'react'
import { PieChart,Series,Label,Connector  } from 'devextreme-react/pie-chart';

function MostOrderdByProducents({mostOrderdByProducents}) {

  const pointLabels = (pointInfo) => {
    return pointInfo.value;
}


  return (
    <div style={{width:'20%',marginTop:'50px'}}>
        <PieChart
            dataSource={mostOrderdByProducents}
            type="doughnut"
        >
            <Series 
                argumentField="producent" 
                valueField="liczba"
            >
                <Label 
                    visible={true}
                    position="columns"
                    customizeText={pointLabels}
                >
                    <Connector visible={true}></Connector>
                </Label>
            </Series>
        </PieChart>
    </div>
  )
}

export default MostOrderdByProducents