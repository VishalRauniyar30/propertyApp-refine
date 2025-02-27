import { useEffect, useState } from "react"

import { 
    Box, Button, Collapse, Drawer, 
    List, ListItemButton, ListItemIcon, 
    ListItemText, Paper, Tooltip 
} from "@mui/material"

import { 
    ChevronLeft, ChevronRight, Dashboard, 
    ExpandLess, ExpandMore, ListOutlined, Logout 
} from '@mui/icons-material'

import { CanAccess, type ITreeMenu, useIsExistAuthentication, 
    useLogout, useTitle, useTranslate, useRouterContext, 
    useRouterType, useLink, useMenu, useRefineContext, 
    useActiveAuthProvider, pickNotDeprecated, useWarnAboutChange
} from "@refinedev/core"

import { useThemedLayoutContext, type ThemedSiderV2 } from "@refinedev/mui"

import { Title as DefaultTitle } from "../title"

export const Sider: typeof ThemedSiderV2 = ({ 
    render, meta, Title: TitleFromProps 
}) => {
    const { 
        siderCollapsed: collapsed,
        setSiderCollapsed: setCollapsed,
        mobileSiderOpen : opened, 
        setMobileSiderOpen : setOpened
    } = useThemedLayoutContext()
    
    const drawerWidth = () => {
        if (collapsed) return 64
        return 240
    };

    const t = useTranslate()
    const { Link: LegacyLink } = useRouterContext()
    const { hasDashboard } = useRefineContext()
    const translate = useTranslate()
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta })

    const isExistAuthentication = useIsExistAuthentication()

    const authProvider = useActiveAuthProvider()
    const { mutate: mutateLogout } = useLogout({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    })

    const TitleFromContext = useTitle()

    const routerType = useRouterType()
    const Link = useLink()
    const ActiveLink = routerType === "legacy" ? LegacyLink : Link

    const { warnWhen, setWarnWhen } = useWarnAboutChange()

    const [open, setOpen] = useState<{ [k: string]: any }>({})

    useEffect(() => {
        setOpen((previous) => {
            const previousKeys: string[] = Object.keys(previous)
            const previousOpenKeys = previousKeys.filter((key) => previous[key])

            const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys])
            const uniqueKeysRecord = Object.fromEntries(
                Array.from(uniqueKeys.values()).map((key) => [key, true]),
            )
            return uniqueKeysRecord
        })
    }, [defaultOpenKeys])

    const RenderToTitle = TitleFromContext ?? DefaultTitle ?? TitleFromProps

    const handleClick = (key: string) => {
        setOpen({ ...open, [key]: !open[key] })
    }

    const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName, meta, options } = item
            const isOpen = open[item.key || ""] || false

            const isSelected = item.key === selectedKey
            const isNested = !( pickNotDeprecated(meta?.parent, options?.parent, parentName) === undefined)

            if (children.length > 0) {
                return (
                    <CanAccess
                        key={item.key}
                        resource={name}
                        action="list"
                        params={{
                            resource: item,
                        }}
                    >
                        <div key={item.key}>
                            <Tooltip
                                title={label ?? name}
                                placement="right"
                                disableHoverListener={!collapsed}
                                arrow
                            >
                                <ListItemButton
                                    onClick={() => {
                                        if (collapsed) {
                                            setCollapsed(false);
                                            if (!isOpen) {
                                                handleClick(item.key || "");
                                            }
                                        } else {
                                            handleClick(item.key || "");
                                        }
                                    }}
                                    sx={{
                                        pl: isNested ? 4 : 2,
                                        justifyContent: "center",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            justifyContent: "center",
                                            minWidth: "36px",
                                            transition: "margin-right 0.3s",
                                            marginRight: collapsed ? "0px" : "12px",
                                            color: "primary.contrastText",
                                        }}
                                    >
                                        {icon ?? <ListOutlined />}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            fontSize: "16px",
                                            fontWeight: isSelected ? 'bold' : 'normal'
                                        }}
                                    />
                                    {!collapsed && (isOpen ? (
                                        <ExpandLess sx={{ color: 'text.icon' }} />
                                    ) : (
                                        <ExpandMore sx={{ color: 'text.icon' }} />
                                    ))}
                                </ListItemButton>
                            </Tooltip>
                            {!collapsed && (
                                <Collapse
                                    in={open[item.key || ""]}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        {renderTreeView(children, selectedKey)}
                                    </List>
                                </Collapse>
                            )}
                        </div>
                    </CanAccess>
                )
            }

            return (
                <CanAccess
                    key={item.key}
                    resource={name}
                    action="list"
                    params={{ resource: item }}
                >
                    <Tooltip
                        title={label ?? name}
                        placement="right"
                        disableHoverListener={!collapsed}
                        arrow
                    >
                        <ListItemButton
                            component={ActiveLink}
                            to={route}
                            selected={isSelected}
                            sx={{
                                pl: isNested ? 4 : 2,
                                py: isNested ? 1.25 : 1,
                                "&.Mui-selected": {
                                    "&:hover": {
                                        backgroundColor: isSelected ? '#1e36e8' : "transparent",
                                    },
                                    backgroundColor: isSelected ? '#475be8' : "transparent",
                                },
                                justifyContent: "center",
                                margin: "10px auto",
                                borderRadius: "12px",
                                minHeight: "56px",
                                width: "90%",
                            }}
                            onClick={() => {
                                setOpened(false);
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    justifyContent: "center",
                                    transition: "margin-right 0.3s",
                                    marginRight: collapsed ? "0px" : "12px",
                                    minWidth: "36px",
                                    color: isSelected ? '#fff' : '#808191',
                                }}
                            >
                                {icon ?? <ListOutlined />}
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: '16px',
                                    fontWeight: isSelected ? 'bold' : 'normal',
                                    color: isSelected ? "#fff" : "#808191",
                                    marginLeft: "10px",
                                }}
                            />
                        </ListItemButton>
                    </Tooltip>
                </CanAccess>
            )
        })
    }

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Tooltip
                title={translate("dashboard.title", "Dashboard")}
                placement="right"
                disableHoverListener={!collapsed}
                arrow
            >
                <ListItemButton
                    component={ActiveLink}
                    to="/"
                    selected={selectedKey === "/"}
                    onClick={() => {
                        setOpened(false);
                    }}
                    sx={{
                        pl: 2,
                        py: 1,
                        justifyContent: "center",
                        "&.Mui-selected": {
                            "&:hover": {
                            backgroundColor: "transparent",
                            },
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            justifyContent: "center",
                            minWidth: "36px",
                            transition: "margin-right 0.3s",
                            marginRight: "14px",
                            color: "#808191",
                            fontSize: "16px",
                            marginLeft: '12px'
                        }}
                    >
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText
                        primary={translate("dashboard.title", "Dashboard")}
                        primaryTypographyProps={{
                            noWrap: true,
                            fontSize: "16px",
                            ml: 1,
                            fontWeight: selectedKey === "/" ? "bold" : "normal",
                        }}
                    />
                </ListItemButton>
            </Tooltip>
        </CanAccess>
    ) : null

    const handleLogout = () => {
        if (warnWhen) {
            const confirm = window.confirm(
                t(
                "warnWhenUnsavedChanges",
                "Are you sure you want to leave? You have unsaved changes.",
                ),
            )

            if (confirm) {
                setWarnWhen(false)
                mutateLogout()
            }
        } else {
            mutateLogout()
        }
    };

    const logout = isExistAuthentication && (
        <Tooltip
            title={t("buttons.logout", "Logout")}
            placement="right"
            disableHoverListener={!collapsed}
            arrow
        >
            <ListItemButton
                key="logout"
                onClick={() => handleLogout()}
                sx={{
                    justifyContent: "center",
                    margin: "10px auto",
                    borderRadius: "12px",
                    minHeight: "56px",
                    width: "90%",
                }}
            >
                <ListItemIcon
                    sx={{
                        justifyContent: "center",
                        minWidth: "36px",
                        transition: "margin-right 0.3s",
                        marginRight: "12px",
                        color: "#808191",
                    }}
                >
                    <Logout />
                </ListItemIcon>
                <ListItemText
                    primary={t("buttons.logout", "Logout")}
                    primaryTypographyProps={{
                        noWrap: true,
                        fontSize: "16px",
                        ml: 1
                    }}
                />
            </ListItemButton>
        </Tooltip>
    )

    const items = renderTreeView(menuItems, selectedKey)

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                logout,
                items,
                collapsed,
            })
        }
        return (
            <>
                {dashboard}
                {items}
                {logout}
            </>
        )
    }

    const drawer = (
        <List
            disablePadding
            sx={{
                flexGrow: 1,
                paddingTop: "16px",
                mt: 1, color: '#808191'
            }}
        >
            {renderSider()}
        </List>
    )

    return (
        <>
            <Box
                sx={{
                    width: { xs: drawerWidth() },
                    display: {
                        xs: "none",
                        md: "block",
                    },
                    transition: "width 0.3s ease",
                }}
            />
            <Box
                component="nav"
                sx={{
                    position: "fixed",
                    zIndex: 1101,
                    width: { sm: drawerWidth() },
                    display: "flex",
                }}
            >
                <Drawer
                    variant="temporary"
                    open={opened}
                    onClose={() => setOpened(false)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {
                        sm: "block",
                        md: "none",
                        },
                        "& .MuiDrawer-paper": {
                            width: 256,
                            bgcolor: "#fcfcdc",
                        },
                    }}
                >
                    <Box
                        sx={{
                            width: drawerWidth(),
                        }}
                    >
                        <Box
                            sx={{
                                height: 64,
                                display: "flex",
                                alignItems: "center",
                                paddingLeft: "16px",
                                fontSize: "16px",
                                bgcolor: "#fcfcdc",
                            }}
                        >
                            <RenderToTitle collapsed={false} />
                        </Box>
                        {drawer}
                    </Box>
                </Drawer>
                <Drawer
                    variant="permanent"
                    PaperProps={{ elevation: 0 }}
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth(),
                            overflow: "hidden",
                            bgcolor: "#FCFCDC",
                            transition: "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
                        },
                    }}
                    open
                >
                    <Paper
                        sx={{
                            fontSize: "16px",
                            width: "100%",
                            height: 64,
                            display: "flex",
                            flexShrink: 0,
                            alignItems: "center",
                            justifyContent: collapsed ? "center" : "space-between",
                            variant: "outlined",
                            borderRadius: 0,
                            bgcolor: "#fcfcdc",
                        }}
                    >
                        <RenderToTitle collapsed={collapsed} />
                    </Paper>
                    <Box
                        sx={{
                        flexGrow: 1,
                        overflowX: "hidden",
                        overflowY: "auto",
                        }}
                    >
                        {drawer}
                    </Box>
                    <Button
                        sx={{
                            background: '#475be8',
                            color: "primary.contrastText",
                            textAlign: 'center',
                            borderRadius: 0,
                            borderTop: '1px solid #ffffff1a',
                            "&:hover": {
                                background: '#1e36e8'
                            }
                        }}
                        fullWidth
                        size='large'
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </Button>
                </Drawer>
            </Box>
        </>
    )
}
