import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useTable } from '@refinedev/core'
import { Box, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'

import { CustomButton, Error, Loader, PropertyCard } from '../components'

const propertyType = ['Apartment', 'Villa', 'Farmhouse', 'Condos', 'Townhouse', 'Duplex', 'Studio', 'Charlet']

const sizeType = [9, 18, 27, 36, 45]

const AllProperties = () => {
    const navigate = useNavigate()
    const { 
        tableQuery: { data, isError, isLoading },
        current, setCurrent,
        setPageSize, pageCount,
        sorter, setSorter,
        filters, setFilters, pageSize
    } = useTable()

    useEffect(() => {
        setPageSize(9)
    }, [])
    const allProperties = data?.data ?? []
    
    const currentPrice = sorter.find((item) => item.field === 'price')?.order

    const toggleSort = (field: string) => {
        setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }])
    }

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) => "field" in item ? item : [])

        return {
            title: logicalFilters.find((item) => item.field === 'title')?.value || '',
            propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
        }
    }, [filters])

    if(isLoading) {
        return <Loader />
    }
    if(isError) {
        return <Error />
    }
    console.log(allProperties)
    
    return (
        <Box>
            <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Stack direction='column' width='100%'>
                    <Typography fontSize={25} fontWeight={700} color='#11142d'>
                        {!allProperties?.length ? 'There are No Properties' : 'All Properties'}
                    </Typography>
                    <Box mb={2} mt={3} display='flex' width='84%' justifyContent='space-between' flexWrap='wrap'>
                        <Box display='flex' gap={2} flexWrap='wrap' mb={{ xs: '20px', sm: 0 }}>
                            <CustomButton 
                                title={`Sort Price ${ currentPrice === 'asc' ? "↑" : "↓" }`}
                                backgroundColor='#475be8'
                                color='#fcfcfc'
                                handleClick={() => toggleSort('price')}
                            />
                            <TextField 
                                variant='outlined'
                                color='info'
                                placeholder='Search by title'
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([{
                                        field: 'title',
                                        operator: 'contains',
                                        value: e.currentTarget.value ? e.currentTarget.value : undefined,
                                    }])
                                }}
                            />
                            <Select
                                variant='outlined'
                                color='info'
                                displayEmpty
                                required
                                slotProps={{ input: { 'aria-label' : 'Without label' } }}
                                defaultValue=''
                                value={currentFilterValues.propertyType}
                                onChange={(e) => {
                                    setFilters([{
                                        field: 'propertyType',
                                        operator: 'eq',
                                        value: e.target.value
                                    }], 'replace')
                                }}
                            >
                                <MenuItem value=''>All</MenuItem>
                                {propertyType.map((type) => (
                                    <MenuItem value={type.toLowerCase()} key={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <CustomButton 
                    backgroundColor='#475be8'
                    color='#fcfcdc'
                    handleClick={() => navigate('/properties/create')}
                    icon={<Add />}
                    title='Add Property'
                />
            </Stack>
            <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {allProperties?.map((property) => (
                    <PropertyCard 
                        key={property._id}
                        id={property._id}
                        title={property.title}
                        location={property.location}
                        price={property.price}
                        photo={property.photo}
                    />
                ))}
            </Box>
            {allProperties?.length > 0 && (
                <Box display='flex' gap={2} mt={3} flexWrap='wrap'>
                    <CustomButton 
                        title='Previous'
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor='#475be8'
                        color='#fcfcdc'
                        disabled={!(current > 1)}
                    />
                    <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems='center' gap='5px'>
                        Page{' '}
                        <strong>
                            {current} of {pageCount}
                        </strong>
                    </Box>
                    <CustomButton 
                        title='Next'
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor='#475be8'
                        color='#fcfcdc'
                        disabled={current === pageCount}
                    />
                    <Select
                        variant='outlined'
                        color='info'
                        displayEmpty
                        required
                        slotProps={{ input: { 'aria-label' : 'Without label' } }}
                        defaultValue={9}
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(e.target.value ? Number(e.target.value) : 9)
                            setCurrent(1)
                        }}
                    >
                        {sizeType.map((size) => (
                            <MenuItem key={size} value={size}>
                                show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </Box>
    )
}

export default AllProperties