import React from 'react'
import { 
    Box, Button, FormControl, FormHelperText, MenuItem, 
    Select, Stack, TextareaAutosize, TextField, Typography 
} from '@mui/material'

import { FormProps } from '../../interfaces/common'
import CustomButton from './CustomButton'

const propertyType = ['Apartment', 'Villa', 'Farmhouse', 'Condos', 'Townhouse', 'Duplex', 'Studio', 'Charlet']

const Form = ({ 
    formLoading, 
    handleImageChange, 
    handleSubmit, 
    onFinishHandler, 
    propertyImage, 
    register, 
    type 
}: FormProps) => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color='#11142d'>
                {type} a Property
            </Typography>
            <Box mt={2.5} borderRadius='15px' padding='20px' paddingX={5} bgcolor='#fcfcdc'>
                <form 
                    className='form-form' 
                    onSubmit={handleSubmit}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: '10px 0',
                                fontSize: 16,
                                color: '#11142d'
                            }}
                        >
                            Enter Property Name
                        </FormHelperText>
                        <TextField 
                            fullWidth
                            required
                            id='outlined-basic'
                            color='info'
                            variant='outlined'
                            { ...register('title', {required: true }) }
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: '10px 0',
                                fontSize: 16,
                                color: '#11142d'
                            }}
                        >
                            Enter Description
                        </FormHelperText>
                        <TextareaAutosize 
                            minRows={5}
                            required
                            placeholder='Write Description'
                            color='info'
                            className='form-textareaautosize'
                            { ...register('description', {required: true }) }
                        />
                    </FormControl>
                    <Stack direction='row' gap={4}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: '10px 0',
                                    fontSize: 16,
                                    color: '#11142d'
                                }}
                            >
                                Select Property Type
                            </FormHelperText>
                            <Select
                                variant='outlined'
                                color='info'
                                displayEmpty
                                required
                                slotProps={{ input: { 'aria-label': 'Without label' } }}
                                defaultValue='apartment'
                                { ...register('propertyType', { required: true }) }
                            >
                                {propertyType.map((type) => (
                                    <MenuItem value={type.toLowerCase()}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: '10px 0',
                                    fontSize: 16,
                                    color: '#11142d'
                                }}
                            >
                                Enter Property Price
                            </FormHelperText>
                            <TextField 
                                fullWidth
                                required
                                id='outlined-basic'
                                color='info'
                                type='number'
                                variant='outlined'
                                { ...register('price', {required: true }) }
                            />
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: '10px 0',
                                fontSize: 16,
                                color: '#11142d'
                            }}
                        >
                            Enter Location
                        </FormHelperText>
                        <TextField 
                            fullWidth
                            required
                            id='outlined-basic'
                            color='info'
                            variant='outlined'
                            { ...register('location', {required: true }) }
                        />
                    </FormControl>
                    <Stack direction='column' gap={1} justifyContent='center' mb={2}>
                        <Stack direction='row' gap={2}>
                            <Typography color='#11142d' fontSize={16} fontWeight={500} my='10px'>
                                Property Photo
                            </Typography>
                            <Button 
                                component='label'
                                sx={{
                                    width: 'fit-content',
                                    color: '#fcfcdc',
                                    textTransform: 'capitalize',
                                    fontSize: 16,
                                    bgcolor: '#f03a12',
                                    padding: '12px 16px'
                                }}
                            >
                                Upload *
                                <input 
                                    type="file" 
                                    hidden
                                    accept='image/*'
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        //@ts-ignore
                                        handleImageChange(e.target.files[0])
                                    }}
                                />
                            </Button>
                        </Stack>
                        <Typography fontSize={14} color='#808191' sx={{ wordBreak: 'break-all' }}>
                            {propertyImage?.name}
                        </Typography>
                    </Stack>
                    <Box display='flex' justifyContent='flex-start'>
                        <CustomButton 
                            type='submit'
                            title={formLoading ? 'Submitting...' : 'Submit' }
                            backgroundColor='#475be8'
                            color='#fcfcfc'
                        />
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Form