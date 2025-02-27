import React from 'react'
import { Link } from 'react-router'
import { pickNotDeprecated, useActiveAuthProvider, useGetIdentity, useMenu } from '@refinedev/core'
import { RefineThemedLayoutV2HeaderProps } from '@refinedev/mui'
import { AppBar, Avatar, Stack, Toolbar, Typography } from '@mui/material'
import { HamburgerMenu } from '../hamburgerMenu'

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky, isSticky }) => {
    const authProvider = useActiveAuthProvider()

    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy)
    })

 
    const showUserInfo = user && (user.name || user.avatar)

    const preferredSticky = pickNotDeprecated(sticky, isSticky) ?? true

    return (
        <AppBar
            color='default'
            position={preferredSticky ? 'sticky' : 'relative'}
            elevation={0}
            sx={{ background: '#fcfcdc' }}
        >
            <Toolbar>
                <HamburgerMenu />
                <Stack
                    direction='row'
                    width='100%'
                    justifyContent='flex-end'
                    alignItems='center'
                    gap={2}
                >
                    <Stack
                        direction='row'
                        width='100%'
                        justifyContent='flex-end'
                        alignItems='center'
                    >
                        {showUserInfo && (
                            <Stack 
                                component={Link} 
                                to={'/my-profile'} 
                                sx={{ cursor: 'pointer' }} 
                                direction='row' 
                                gap='16px' 
                                alignItems='center' 
                                justifyContent="center"
                            >
                                {user?.name && (
                                    <Typography variant='body1' sx={{ display: { xs: 'none', sm: 'inline-block', color: '#11142d' } }}>
                                        {user?.name}
                                    </Typography>
                                )}
                                {user?.avatar && (
                                    <Avatar src={user?.avatar} alt={user?.name} sx={{ width: 50, height: 50 }} />
                                )}
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
