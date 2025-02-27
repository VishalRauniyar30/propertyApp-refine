import { Link } from 'react-router'
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { Place } from '@mui/icons-material'
import millify from 'millify'

import { PropertyCardProps } from '../../interfaces/property'

const PropertyCard = ({ id, location, photo, price, title }: PropertyCardProps) => {
    return (
        <Card
            component={Link}
            to={`/properties/${id}`}
            sx={{
                width: '330px',
                padding: '10px',
                transition: 'all 0.3s ease-in-out',
                "&:hover": {
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                    transform: "translateY(-3px)"
                },
                cursor: 'pointer',
                borderRadius: '10px' 
            }}
            elevation={3}
        >
            <CardMedia 
                component='img'
                width='100%'
                height={210}
                image={photo}
                alt='card-image'
                sx={{ 
                    borderRadius: '10px', 
                    objectFit: 'cover' 
                }}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: '10px',
                    paddingX: '5px'
                }}
            >
                <Stack direction='column' gap={1}>
                    <Typography fontSize={16} fontWeight={500} color='#11142d'>
                        {title}
                    </Typography>
                    <Stack direction='row' gap={0.5} alignItems='flex-start'>
                        <Place sx={{ fontSize: 18, color: '#11142d', marginTop: 0.25 }}/>
                        <Typography fontSize={14} color='#808191'>
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
                <Box px={1.5} py={0.5} borderRadius={1} bgcolor='#dadefa' height='fit-content'>
                    <Typography fontSize={12} fontWeight={600} color='#475be8'>
                        ₹{millify(Number(price))}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PropertyCard