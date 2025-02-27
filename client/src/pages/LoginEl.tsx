import React, { useEffect, useRef } from "react"
import { useLogin } from "@refinedev/core"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import { yariga } from "../assets"
import type { CredentialResponse } from "../interfaces/google"

const GOOGLE_CLIENT_ID = import.meta.env.REFINE_GOOGLE_ID

export const LoginEl: React.FC = () => {
    const { mutate: login } = useLogin<CredentialResponse>()

    const GoogleButton = (): JSX.Element => {
        const divRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            if (typeof window === "undefined" || !window.google || !divRef.current) {
                return
            }
            try {
                window.google.accounts.id.initialize({
                    ux_mode: "popup",
                    auto_select: false,
                    client_id: GOOGLE_CLIENT_ID,
                    callback: async (res: CredentialResponse) => {
                        if (res.credential) {
                            login(res)
                        }
                    },
                })
                window.google.accounts.id.renderButton(divRef.current, {
                    theme: "filled_blue",
                    size: "medium",
                    type: "standard",
                })
            } catch (error) {
                console.log(error)
            }
        }, [])
        return <div ref={divRef} />
    };

    return (
        <Box component='div' sx={{ backgroundColor: '#fcfcdc' }}>
            <Container
                component='main'
                maxWidth='xs'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <img src={yariga} alt="yariga logo" />
                    </div>
                    <Box mt={4}>
                        <GoogleButton />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
