import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Email, Phone, Place } from '@mui/icons-material'

import { ProfileProps, PropertyProps } from '../../interfaces/common'
import PropertyCard from './PropertyCard'

const Profile = ({ type, name, email, avatar, properties }: ProfileProps) => {
    return (
        <Box>
            <Typography fontSize={26} fontWeight={700} color='#11142d'>
                {type} Profile
            </Typography>
            <Box mt='20px' borderRadius='15px' padding='25px' bgcolor='#fcfcdc'>
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2.5 
                    }}
                >
                    <Avatar 
                        src='https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
                        alt='abstract'
                        sx={{
                            width: '340px',
                            height: '320px',
                            borderRadius: 0,
                            borderTopLeftRadius: '15px',
                            borderBottomLeftRadius: '15px'
                        }}
                    />
                    <Box
                        flex={1}
                        sx={{
                            marginTop: { md: '58px' },
                            marginLeft: { xs: '20px', md: '0px' }
                        }}
                    >
                        <Box
                            flex={1}
                            display='flex'
                            flexDirection={{ xs: 'column', md: 'row' }}
                            gap='20px'
                        >
                            <Avatar 
                                src={avatar}
                                alt='user-profile'
                                sx={{
                                    width: 78,
                                    height: 78,
                                    marginLeft: '-64px',
                                }}
                            />
                            <Box
                                flex={1}
                                display='flex'
                                flexDirection='column'
                                justifyContent='space-between'
                                gap='30px'
                            >
                                <Stack direction='column' mt={1}>
                                    <Typography fontSize={22} fontWeight={600} color='#11142d'>
                                        {name}
                                    </Typography>
                                    <Typography fontSize={16} color='#808191'>
                                        Real-Estate Agent
                                    </Typography>
                                </Stack>
                                <Stack direction='column' gap='30px'>
                                    <Stack gap='15px'>
                                        <Typography fontSize={14} fontWeight={500} color='#808191'>
                                            Address
                                        </Typography>
                                        <Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
                                            <Place sx={{ color: '#11142d', ml: '-4px' }} />
                                            <Typography fontSize={14} color='#11142d'>
                                                IIIT Bhubaneswar, GothaPatna, Malipada, Bhubneswar, Odisha - 751003
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction='row' flexWrap='wrap' gap='20px' pb={4}>
                                        <Stack flex={1} gap='15px'>
                                            <Typography fontSize={14} fontWeight={500} color='#808191'>
                                                Phone Number
                                            </Typography>
                                            <Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
                                                <Phone sx={{ color: '#11142d' }} />
                                                <Typography fontSize={14} color='#11142d' noWrap>
                                                    +91-8789760658
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Stack flex={1} gap='15px'>
                                            <Typography fontSize={14} fontWeight={500} color='#808191'>
                                                Email
                                            </Typography>
                                            <Box display='flex' flexDirection='row' alignItems='center' gap='10px'>
                                                <Email sx={{ color: '#11142d' }} />
                                                <Typography fontSize={14} color='#11142d'>
                                                    {email}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {properties?.length > 0 && (
                <Box mt={2.5} borderRadius='15px' padding='25px' bgcolor='#fcfcdc'>
                    <Typography fontSize={22} fontWeight={600} color='#11142d'>
                        {type} Properties
                    </Typography>
                    <Box 
                        mt={2.5}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2.5
                        }}
                    >
                        {properties?.map((property: PropertyProps) => (
                            <PropertyCard 
                                key={property._id}
                                id={property._id}
                                title={property.title}
                                location={property.location}
                                price={property.price}
                                photo={property.photo}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Profile