import { useList } from '@refinedev/core'
import { Box, Typography } from '@mui/material'

import { AgentCard, Error, Loader } from '../components'

const Agent = () => {
    const { data, isError, isLoading } = useList({ resource: 'users' })

    const allAgents = data?.data ?? []
    
    if(isLoading) {
        return <Loader />
    }

    if(isError){
        return <Error />
    }
    
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color='#11142d'>
                Agents List
            </Typography>
            <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', bgcolor: '#fcfcdc' }}>
                {allAgents.map((agent) => (
                    <AgentCard 
                        key={agent._id}
                        id={agent._id}
                        name={agent.name}
                        email={agent.email}
                        avatar={agent.avatar}
                        noOfProperties={agent.allProperties.length}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Agent