import { Link, useNavigate, useParams } from 'react-router'
import { useActiveAuthProvider, useDelete, useGetIdentity, useShow } from '@refinedev/core'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { ChatBubble, Delete, Edit, Phone, Place, Star } from '@mui/icons-material'
import millify from 'millify'

import { CustomButton, Error, Loader } from '../components'

const PropertyDetails = () => {
    const navigate = useNavigate()

    const authProvider = useActiveAuthProvider()

    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy)
    })
    const { id } = useParams()

    const { query: queryResult } = useShow({
        resource: 'properties',
        id : id as string
    })

    const { mutate } = useDelete()

    const { data, isError, isLoading } = queryResult
    
    const propertyDetails = data?.data ?? {}

    if(isLoading) {
        return <Loader />
    }
    
    if(isError) {
        return <Error />
    }
    
    const { 
        creator : { allProperties, avatar, email, name, _id: userId }, 
        description, location, photo, price, propertyType, title, _id 
    } = propertyDetails

    const isCurrentUser = user?.email === email
    
    const handleDeleteProperty = () => {
        const response = confirm('Are You Sure You Want To Delete This Property?')
        if(response) {
            mutate({
                resource: 'properties',
                id: id as string
            }, {
                onSuccess: () => {
                    navigate('/properties')
                }
            })
        }
    }

    return (
        <Box bgcolor='#fcfcdc' width='fit-content' padding='25px' borderRadius='15px'>
            <Typography fontSize={25} fontWeight={700} color='#11142d'>
                Property Details
            </Typography>
            <Box mt='20px' display='flex' flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
                <Box flex={1} maxWidth={825}>
                    <Avatar
                        src={photo}
                        alt={title}
                        sx={{
                            height: 546,
                            width: '100%',
                            objectFit: 'cover',
                            borderRadius: '10px'
                        }}
                    />
                    <Box mt='15px'>
                        <Stack direction='row' justifyContent='space-between' flexWrap='wrap' alignItems='center'>
                            <Typography fontSize={18} fontWeight={500} color='#11142d' textTransform='capitalize'>
                                {propertyType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star key={`star-${item}`} sx={{ color: '#f2c94c' }} />
                                ))}
                            </Box>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' flexWrap='wrap' alignItems='center' gap={2}>
                            <Box>
                                <Typography fontSize={22} fontWeight={600} mt='10px' color='#11142d'>
                                    {title}
                                </Typography>
                                <Stack mt={0.5} direction='row' alignItems='center' gap={0.5}>
                                    <Place sx={{ color: '#808191' }} />
                                    <Typography fontSize={14} color='#808191'>
                                        {location}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <Typography fontSize={16} fontWeight={600} mt='10px' color='#11142d'>
                                    Price
                                </Typography>
                                <Stack direction='row' alignItems='flex-end' gap={1}>
                                    <Typography fontSize={25} fontWeight={700} color='#475be8'>
                                        ₹{millify(price)}
                                    </Typography>
                                    <Typography fontSize={14} color='#808191' mb={0.5}>
                                        For Sale
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack mt='25px' direction='column' gap='10px'>
                            <Typography fontSize={18} fontWeight={600} color='#11142d'>
                                Description
                            </Typography>
                            <Typography fontSize={16} color='#808191'>
                                {description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
                <Box width='100%' flex={1} maxWidth={326} display='flex' flexDirection='column' gap='20px'>
                    <Stack width='100%' p={2} direction='column' justifyContent='center' alignItems='center' border='1px solid #e4e4e4' borderRadius={2} sx={{ cursor: 'pointer' }}>
                        <Stack mt={2} justifyContent='center' alignItems='center' textAlign='center'>
                            <Avatar 
                                src={avatar} 
                                alt="avatar"
                                sx={{
                                    borderRadius: '100%',
                                    objectFit: 'cover',
                                    width: 90,
                                    height: 90
                                }}
                            />
                            <Box mt='15px'>
                                <Typography fontSize={18} fontWeight={600} color='#11142d'>
                                    {name}
                                </Typography>
                                <Typography mt='5px' fontSize={14} fontWeight={400} color='#808191'>
                                    Agent
                                </Typography>
                            </Box>
                            <Stack mt='15px' direction='row' alignItems='center' gap={1}>
                                <Place sx={{ color: '#808191' }} />
                                <Typography fontSize={14} fontWeight={400} color='#808191'>
                                    Bhubaneswar, Odisha
                                </Typography>
                            </Stack>
                            <Typography mt={1} fontSize={16} fontWeight={600} color='#11142d'>
                                {allProperties.length} Properties
                            </Typography>
                        </Stack>
                        <Stack width='100%' mt='25px' direction='row' flexWrap='wrap' gap={2}>
                            <CustomButton 
                                title={!isCurrentUser ? 'Message' : 'Edit'}
                                backgroundColor='#475be8'
                                color='#fcfcfc'
                                fullWidth
                                icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                                handleClick={() => {
                                    if(isCurrentUser) {
                                        navigate(`/properties/edit/${_id}`)
                                    }
                                    else navigate(`/agents/${userId}`)
                                }}
                            />
                            <CustomButton 
                                title={!isCurrentUser ? 'Call' : 'Delete'}
                                backgroundColor={!isCurrentUser ? '#2ed480' : '#d42e2e'}
                                color='#fcfcfc'
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if(isCurrentUser) {
                                        handleDeleteProperty()
                                    }
                                    else navigate(`/agents/${userId}`)
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Stack>
                        <Avatar 
                            src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525" 
                            alt="map"
                            sx={{
                                width: '100%',
                                height: 306,
                                objectFit: 'cover',
                                borderRadius: '10px'
                            }}
                        />
                    </Stack>
                    <Box>
                    <CustomButton 
                        title='Book Now'
                        backgroundColor='#475be8'
                        color='#fcfcfc'
                        fullWidth
                    />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PropertyDetails