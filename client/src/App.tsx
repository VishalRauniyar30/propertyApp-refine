import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import {
    AccountCircleOutlined, ChatBubbleOutline, PeopleAltOutlined, 
    StarOutlineRounded, VillaOutlined,
} from "@mui/icons-material"
import {
    AuthProvider,
    Authenticated,
    Refine,
} from "@refinedev/core"
import { DevtoolsProvider } from "@refinedev/devtools"
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"

import {
    RefineSnackbarProvider,
    useNotificationProvider,
} from "@refinedev/mui"

import routerBindings, {
    CatchAllNavigate, DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router"
import dataProvider from "@refinedev/simple-rest"
import axios from "axios"
import { BrowserRouter, Outlet, Route, Routes } from "react-router"
import { ColorModeContextProvider } from "./contexts/color-mode"
import { CredentialResponse } from "./interfaces/google"
import { parseJwt } from "./utils/parse-jwt"
import {
    Agent, AgentProfile, AllProperties, CreateProperty, 
    EditProperty, Home, LoginEl, MyProfile, PropertyDetails,
} from "./pages"
import { Layout } from "./components/layout"
import { Title } from "./components/layout/title"
import { Sider } from "./components/layout/sider"
import { Header } from "./components/layout/header"

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
})

function App() {
    const authProvider: AuthProvider = {
        login: async ({ credential }: CredentialResponse) => {
            const profileObj = credential ? parseJwt(credential) : null

            //save user to mongoDB

            if(profileObj) {
                const response = await fetch('http://localhost:8080/api/v1/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: profileObj.name,
                        email: profileObj.email,
                        avatar: profileObj.picture,
                    })
                })

                const data = await response.json()

                if(response.status === 200){
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            ...profileObj,
                            avatar: profileObj.picture,
                            userid: data._id
                        })
                    )
                } else {
                    return Promise.reject()
                }
                localStorage.setItem("token", `${credential}`)
        
                return {
                    success: true,
                    redirectTo: "/",
                }
            }

            return {
                success: false,
            }
        },
        logout: async () => {
            const token = localStorage.getItem("token")

            if (token && typeof window !== "undefined") {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                axios.defaults.headers.common = {}
                window.google?.accounts.id.revoke(token, () => {
                    return {}
                })
            }

            return {
                success: true,
                redirectTo: "/login",
            }
        },
        onError: async (error) => {
            console.error(error)
            return { error }
        },
        check: async () => {
            const token = localStorage.getItem("token")

            if (token) {
                return {
                    authenticated: true,
                }
            }

            return {
                authenticated: false,
                error: {
                    message: "Check failed",
                    name: "Token not found",
                },
                logout: true,
                redirectTo: "/login",
            }
        },
        getPermissions: async () => null,
        getIdentity: async () => {
            const user = localStorage.getItem("user")
            if (user) {
                return JSON.parse(user)
            }

            return null
        },
    }

    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <CssBaseline />
                    <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
                    <RefineSnackbarProvider>
                        <DevtoolsProvider>
                            <Refine
                                dataProvider={dataProvider("http://localhost:8080/api/v1")}
                                notificationProvider={useNotificationProvider}
                                routerProvider={routerBindings}
                                authProvider={authProvider}
                                resources={[
                                    {
                                        name: "properties",
                                        list: AllProperties,
                                        show: PropertyDetails,
                                        create: CreateProperty,
                                        edit: EditProperty,
                                        icon: <VillaOutlined />,
                                    },
                                    {
                                        name: "agents",
                                        list: Agent,
                                        show: AgentProfile,
                                        icon: <PeopleAltOutlined />,
                                    },
                                    {
                                        name: "reviews",
                                        list: Home,
                                        icon: <StarOutlineRounded />,
                                    },
                                    {
                                        name: "messages",
                                        list: Home,
                                        icon: <ChatBubbleOutline />,
                                    },
                                    {
                                        name: "my-profile",
                                        options: { label: "My Profile" },
                                        list: MyProfile,
                                        icon: <AccountCircleOutlined />,
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: "5f0t2S-0F3HwW-w2Ltj2",
                                }}
                                Title={Title}
                                Sider={Sider}
                                Layout={Layout}
                                Header={Header}
                                LoginPage={LoginEl}
                                DashboardPage={Home}
                            >
                                <Routes>
                                    <Route
                                        element={
                                            <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/login" />}>
                                                <Layout Title={Title} Sider={Sider} Header={Header}>
                                                    <Outlet />
                                                </Layout>
                                            </Authenticated>
                                        }
                                    >
                                        {/* <Route index element={<NavigateToResource resource="properties" />} /> */}
                                        <Route index element={<Home />} />
                                        {/* ✅ Add explicit routes for your resources */}
                                        <Route path="/" element={<Home />} />
                                        <Route path="/properties" element={<AllProperties />} />
                                        <Route path="/properties/:id" element={<PropertyDetails />} />
                                        <Route path="/properties/create" element={<CreateProperty />} />
                                        <Route path="/properties/edit/:id" element={<EditProperty />} />

                                        <Route path="/agents" element={<Agent />} />
                                        <Route path="/agents/:id" element={<AgentProfile />} />

                                        <Route path="/reviews" element={<Home />} />
                                        <Route path="/messages" element={<Home />} />
                                        <Route path="/my-profile" element={<MyProfile />} />
                                    </Route>
                                    <Route path="/login" element={<LoginEl />} />
                                </Routes>
                                <RefineKbar />
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                        </DevtoolsProvider>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    )
}

export default App
  