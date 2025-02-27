import React from 'react'
import type { LayoutProps } from '@refinedev/core'
import Box, { type BoxProps } from '@mui/material/Box'
import { RefineThemedLayoutV2Props, ThemedLayoutContextProvider } from '@refinedev/mui'

import { Sider as DefaultSider } from './sider'
import { Header as DefaultHeader } from './header'

interface ExtendedRefineThemedLayoutV2Props extends RefineThemedLayoutV2Props {
  childrenBoxProps?: BoxProps;
  containerBoxProps?: BoxProps;
}

export const Layout: React.FC<ExtendedRefineThemedLayoutV2Props> = ({
    Sider, 
    Header, 
    Title, 
    Footer, 
    OffLayoutArea, 
    children, 
    initialSiderCollapsed, 
    onSiderCollapsed, 
    childrenBoxProps = {}, 
    containerBoxProps = {}
}) => {
    const SiderToRender = Sider ?? DefaultSider
    const HeaderToRender = Header ?? DefaultHeader
    
    const { sx: childrenSx, ...restChildrenProps } = childrenBoxProps
    const { sx: containerSx, ...restContainerProps } = containerBoxProps

    return (
        <ThemedLayoutContextProvider
            initialSiderCollapsed={initialSiderCollapsed}
            onSiderCollapsed={onSiderCollapsed}
        >
            <Box display='flex' flexDirection="row" { ...restContainerProps }>
                <SiderToRender Title={Title} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        minHeight: '100vh',
                    }}
                >
                    <HeaderToRender />
                    <Box
                        component='main'
                        sx={{
                            p: { xs: 1, md: 2, lg: 3 },
                            flexGrow: 1,
                            bgcolor: '#DDDAAF',
                            ...childrenSx
                        }}
                        { ...restChildrenProps }
                    >
                        {children}
                    </Box>
                    {Footer && <Footer />}
                </Box>
                {OffLayoutArea && <OffLayoutArea />}
            </Box>
        </ThemedLayoutContextProvider>
    )
}
