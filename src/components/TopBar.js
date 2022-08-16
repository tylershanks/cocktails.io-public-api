import React, {useState, useEffect} from 'react';
import './TopBar.css';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';




function TopBar() {
    return (
        <>
          <Box 
            className='topBar'
            display='flex'
            alignItems='center'
            justifyContent='center'
            sx={{
              // height: '100px',
              width: '1',
              bgcolor: '#5bccf6'
            }}
          >
            <Typography 
              variant="h1" 
              className='topBarTitle'
              fontSize= 'min(16vw, 90px)'
            >
                cocktails.io
            </Typography>
          </Box>
        </>
      )
}

export default TopBar