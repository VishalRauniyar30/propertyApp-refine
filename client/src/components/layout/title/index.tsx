import React from 'react'
import { useLink, useRouterContext, useRouterType } from '@refinedev/core'
import { Button, Link as MuiLink } from '@mui/material'
import { RefineLayoutThemedTitleProps } from '@refinedev/mui'

import { logo, yariga } from '../../../assets'

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({ collapsed, wrapperStyles }) => {
    const { Link: LegacyLink } = useRouterContext()

    const routerType = useRouterType()

    const Link = useLink()

    const activeLink = routerType === 'legacy' ? LegacyLink : Link

    return (
        <Button fullWidth variant='text' disableRipple>
            <MuiLink to='/' component={activeLink} underline='none' sx={{ display: 'flex', alignItems: 'center', gap:'12px', ...wrapperStyles }}>
                {collapsed ? (
                    <img src={logo} alt="yariga" width={28} />
                ) : (
                    <img src={yariga} alt="refine" width={140} />
                )}
            </MuiLink>
        </Button>
    )
}
