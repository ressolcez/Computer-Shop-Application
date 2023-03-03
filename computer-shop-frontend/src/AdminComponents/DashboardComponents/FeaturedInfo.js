import React from 'react'
import "./FeaturedInfo.css"
import { Avatar,Box } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import AddchartIcon from '@mui/icons-material/Addchart';

function FeaturedInfo({numberOfUsers,activeUsers,numberOfOrders,waitingOrders,profit}) {
  return (
    <div className='featuredInfo__wrapper'>
        <Box sx = {{boxShadow: 4}} className='card__info'>
            <div className='card__info__content'>
                <div className='card__title'>
                    Użytkownicy
                </div>
                <div className='card__count'>
                    <h2>{numberOfUsers}</h2>
                </div>
            </div>
            <div className='card__avatar'>
                <Avatar
                sx={{
                backgroundColor: '#fbc02d',
                height: 56,
                width: 56
                }}
            >
                <GroupAddIcon fontSize='large' />
            </Avatar>
            </div>
        </Box>
        <Box sx = {{boxShadow: 4}} className='card__info'>
            <div className='card__info__content'>
                <div className='card__title'>
                    Zalogowani
                </div>
                <div className='card__count'>
                    <h2>{activeUsers}</h2>
                </div>
            </div>
            <div className='card__avatar'>
                <Avatar
                sx={{
                backgroundColor: '#2e7d32',
                height: 56,
                width: 56
                }}
            >
                <RecordVoiceOverIcon fontSize='large' />
            </Avatar>
            </div>
        </Box>
        <Box sx = {{boxShadow: 4}} className='card__info'>
            <div className='card__info__content'>
                <div className='card__title'>
                    Zamówienia
                </div>
                <div className='card__count'>
                    <h2>{numberOfOrders}</h2>
                </div>
            </div>
            <div className='card__avatar'>
                <Avatar
                sx={{
                backgroundColor: '#2962ff',
                height: 56,
                width: 56
                }}
            >
                <AddchartIcon fontSize='large' />
            </Avatar>
            </div>
        </Box>
        <Box sx = {{boxShadow: 4}} className='card__info'>
            <div className='card__info__content'>
                <div className='card__title'>
                    Oczekujące
                </div>
                <div className='card__count'>
                    <h2>{waitingOrders}</h2>
                </div>
            </div>
            <div className='card__avatar'>
                <Avatar
                sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
                }}
            >
                <InsertChartIcon fontSize='large' />
            </Avatar>
            </div>
        </Box>
        <Box sx = {{boxShadow: 4}} className='card__info'>
            <div className='card__info__content'>
                <div className='card__title'>
                    Przychód
                </div>
                <div className='card__count'>
                    <h5>PLN {profit}</h5>
                </div>
            </div>
            <div className='card__avatar'>
                <Avatar
                sx={{
                backgroundColor: '#00e676',
                height: 56,
                width: 56
                }}
            >
                <PaidIcon fontSize='large' />
            </Avatar>
            </div>
        </Box>
        
    </div>
  )
}

export default FeaturedInfo