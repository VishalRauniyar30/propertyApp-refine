import { useParams } from "react-router"
import { useOne } from "@refinedev/core"

import { Error, Loader, Profile } from "../components"

const AgentProfile = () => {
    const { id } = useParams()

    const { data, isError, isLoading } = useOne({
        resource: 'users',
        id: id as string
    })

    const agentProfile = data?.data ?? {}

    if(isLoading){
        return <Loader />
    }

    if(isError) {
        return <Error />
    }

    return (
        <Profile 
            type='Agent'
            name={agentProfile.name}
            email={agentProfile.email}
            avatar={agentProfile.avatar}
            properties={agentProfile.allProperties}
        />
    )
}

export default AgentProfile