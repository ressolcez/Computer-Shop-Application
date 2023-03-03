import React from 'react'
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis
} from '@devexpress/dx-react-chart-material-ui';
import { PieChart,Series,Label,Connector  } from 'devextreme-react/pie-chart';
import { Box } from '@mui/material';
import { Animation } from '@devexpress/dx-react-chart';
import "./ChartStatistic.css"

function SalesByCategory({salesByCategory,mostOrderdByProducents}) {

  const pointLabels = (pointInfo) => {
    return pointInfo.value;
}

  return (
  <div className='chart__statistic__wrapper'>
    <Box className = "chart__BarSeries__wrapper" sx = {{boxShadow: 4,width:'45%',marginLeft:'2.5%'}}>
      <Paper>
          <Chart
          data={salesByCategory}
          
          >
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries
            valueField="liczba"
            argumentField="category_name"
          />
          <Title text="Liczba sprzedanych przedmiotów z każdej kategorii" />
          <Animation />
        </Chart>
      </Paper>
      </Box>
      <Box className = "chart__BarSeries__wrapper" sx = {{boxShadow: 4, width:'45.5%'}}>
      <PieChart
            dataSource={mostOrderdByProducents}
            type="doughnut"
            style = {{width:'100%',marginTop:'50px'}}
            title="Top 5 najlepiej sprzedawanych producentów"
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
      </Box>
    </div>
  )
}

export default SalesByCategory