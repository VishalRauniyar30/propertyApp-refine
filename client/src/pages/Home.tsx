import { useList } from '@refinedev/core'
import { Box, Stack, Typography } from '@mui/material'

import { Error, Loader, PieChart, 
    PropertyCard, PropertyReferrals, TotalRevenue 
} from '../components'

const Home = () => {
    const { data, isLoading, isError } = useList({
        resource: 'properties',
        config: {
            pagination: {
                pageSize: 6
            }
        }
    }) 

    const latestProperties = data?.data ?? []

    if(isLoading){
        return <Loader />
    }

    if(isError) {
        return <Error />
    }

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color='#11142d'>
                Dashboard
            </Typography>
            <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
                <PieChart
                    title='Properties For Sale'
                    value={684}
                    series={[52, 33, 15]} // Adjusted for more balanced distribution
                    colors={['#007bff', '#00d4ff', '#ff7300']} // Vibrant blue, cyan, and orange
                />
                <PieChart
                    title='Properties For Rent'
                    value={550}
                    series={[28, 35, 22, 15]} // Randomized values
                    colors={['#ff4d4d', '#ffc107', '#4caf50', '#673ab7']} // Red, yellow, green, purple
                />
                <PieChart
                    title='Total Customers'
                    value={5684}
                    series={[46, 32, 22]} // Balanced values
                    colors={['#f44336', '#2196f3', '#ff9800']} // Red, blue, orange
                />
                <PieChart
                    title='Properties in Cities'
                    value={555}
                    series={[25, 41, 34]} // Adjusted values
                    colors={['#e91e63', '#9c27b0', '#3f51b5']} // Pink, purple, deep blue
                />
            </Box>
            <Stack
                mt='25px'
                width='100%'
                direction={{ xs: 'column', lg: 'row' }}
                gap={4}
            >
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>
            <Box
                flex={1}
                borderRadius='15px'
                padding='20px'
                bgcolor='#fcfcdc'
                display='flex'
                flexDirection='column'
                minWidth='100%'
                mt='25px'
            >
                <Typography fontSize='18px' fontWeight={600} color='#11142d'>
                    Latest Properties
                </Typography>
                <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {latestProperties.map((property) => (
                        <PropertyCard
                            id={property._id}
                            key={property._id}
                            location={property.location}
                            photo={property.photo}
                            price={property.price}
                            title={property.title}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Home