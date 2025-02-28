import { Box, CircularProgress, Stack, Typography } from '@mui/material'

const Loader = () => {
    return (
        <Box minHeight='95vh'>
            <Stack direction='row' justifyContent='center' alignItems='center' height='80vh'>
                <CircularProgress size={100}  />
            </Stack>
        </Box>
    )
}

export default Loader