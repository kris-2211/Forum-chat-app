import { Skeleton, Stack } from '@mui/material'
import React from 'react'

function ChatLoading() {
    return (
        <div>
            <Stack>
                <Skeleton variant="rectangular" height="45px" sx={{mt:1,borderRadius:"10px"}} />
                <Skeleton variant="rectangular" height="45px" sx={{mt:1,borderRadius:"10px"}}/>
                <Skeleton variant="rectangular" height="45px" sx={{ mt: 1, borderRadius: "10px" }} />
                <Skeleton variant="rectangular" height="45px" sx={{mt:1,borderRadius:"10px"}} />
                <Skeleton variant="rectangular" height="45px" sx={{mt:1,borderRadius:"10px"}}/>
                <Skeleton variant="rectangular" height="45px" sx={{ mt: 1, borderRadius: "10px" }} />
                <Skeleton variant="rectangular" height="45px" sx={{mt:1,borderRadius:"10px"}} />
                <Skeleton variant="rectangular" height="45px" sx={{mt:1,borderRadius:"10px"}}/>
                <Skeleton variant="rectangular" height="45px" sx={{mt:1,borderRadius:"10px"}}/>

            </Stack>
        </div>
    )
}

export default ChatLoading
