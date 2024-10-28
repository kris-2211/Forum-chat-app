import { Box } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function UserBadgeItem({user,handleFunction}) {
    return (
        <Box
            sx={{display:'flex',alignItems:'center', px: 2, py: 1,color:'white', borderRadius: "20px", m: 1, mb: 2, bgcolor: 'blueviolet', cursor: 'pointer', fontSize: 12, "&:hover": { backgroundColor: "red", color: 'white' } }} onClick={handleFunction}
        >
            {user.name} <CloseIcon ml={3} fontSize='xs'/>
        </Box>
    )
}

export default UserBadgeItem
