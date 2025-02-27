import { useActiveAuthProvider, useGetIdentity, useOne } from '@refinedev/core'

import { Error, Loader, Profile } from '../components'

const MyProfile = () => {
    const authProvider = useActiveAuthProvider()
    
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy)
    })

    const { data, isError, isLoading } = useOne({
        resource: 'users',
        id: user?.userid
    })

    const myProfile = data?.data ?? {}

    if(isLoading){
        return <Loader />
    }

    if(isError) {
        return <Error />
    }
    
    return (
        <Profile 
            type='My'
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            properties={myProfile.allProperties}
        />
    )
}

export default MyProfile