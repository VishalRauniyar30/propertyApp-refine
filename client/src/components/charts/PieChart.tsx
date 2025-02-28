import { Box, Stack, Typography } from '@mui/material'
import ReactApexChart from 'react-apexcharts'

import { PieChartProps } from '../../interfaces/home'

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
    return (
        <Box
            id='chart' flex={1}
            display='flex' justifyContent='space-between'
            bgcolor='#fcfcdc' alignItems='center'
            flexDirection='row' pl={3.5}
            py={2} gap={1}
            borderRadius='15px'
            minHeight='110px'
            width='fit-content'
        >
            <Stack direction='column'>
                <Typography fontSize={14} color='#808191'>
                    {title}
                </Typography>
                <Typography fontSize={24} color='#11142d' fontWeight={700} mt={1}>
                    {value}
                </Typography>
            </Stack>
            <ReactApexChart 
                options={{
                    chart: { type: 'donut' }, 
                    colors,
                    legend: { show: false },
                    dataLabels: { enabled: true }
                }}
                series={series}
                type='donut'
                width='125px'
            />
        </Box>
    )
}

export default PieChart