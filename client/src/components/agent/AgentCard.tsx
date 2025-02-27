import { Link } from 'react-router'
import { useActiveAuthProvider, useGetIdentity } from '@refinedev/core'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { EmailOutlined, LocationCity, Phone, Place } from '@mui/icons-material'

import { AgentCardProp, InfoBarProps } from '../../interfaces/agent'

const InfoBar = ({ icon, name }: InfoBarProps) => (
    <Stack flex={1} minWidth={{ xs: '100%', sm: 300 }} gap={1.5} direction='row'>
        {icon}
        <Typography fontSize={14} color='#808191'>
            {name}
        </Typography>
    </Stack>
)

const AgentCard = ({ avatar, email, id, name, noOfProperties }: AgentCardProp) => {
    const authProvider = useActiveAuthProvider()

    const { data: currentUser } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy)
    })
    
    const generateLink = () => {
        if(currentUser?.email === email){
            return '/my-profile'
        }
        return `/agents/${id}`
    }

    return (
        <Box
            component={Link}
            to={generateLink()}
            width= '100%'
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                transition: 'all 0.3s ease-in',
                gap: '20px',
                padding: '20px',
                '&:hover': {
                    boxShadow: '0 22px 45px 2px rgba(0, 0, 0, 0.1)'
                }
            }}
        >
            <Avatar 
                src={avatar} 
                alt='user' 
                sx={{ borderRadius: '8px', objectFit: 'cover', width: 90, height: 90 }}
            />
            <Stack direction='column' justifyContent='space-between' flex={1} gap={{ xs: 4, sm: 2 }}>
                <Stack gap={2} direction='row' flexWrap='wrap' alignItems='center'>
                    <Typography fontSize={22} fontWeight={600} color='#11142d'>
                        {name}
                    </Typography>
                    <Typography fontSize={14} mt={0.4} color='#808191'>
                        Real-Estate Agent
                    </Typography>
                </Stack>
                <Stack direction='row' flexWrap='wrap' justifyContent='space-between' alignItems='center' gap={1}>
                    <InfoBar 
                        icon={<EmailOutlined sx={{ color: '#808191' }} />} 
                        name={email} 
                    />
                    <InfoBar 
                        icon={<Place sx={{ color: '#808191' }} />} 
                        name='Bhubaneswar'
                    />
                    <InfoBar 
                        icon={<Phone sx={{ color: '#808191' }} />} 
                        name='+91-8789760658' 
                    />
                    <InfoBar 
                        icon={<LocationCity sx={{ color: '#808191' }} />} 
                        name={`${noOfProperties} Properties`} 
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default AgentCard