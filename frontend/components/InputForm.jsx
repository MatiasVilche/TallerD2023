import React from 'react'
import { Input, FormControl, FormLabel } from '@chakra-ui/react'

const InputForm = ({ label, handleChange, name, placeholder, type, value, handleBlur}) => {
    return (
        <FormControl id={name}>
            <FormLabel>{label}</FormLabel>
            <Input type={type} name={name} onChange={handleChange} value={value} onBlur={handleBlur} placeholder={placeholder}/>
        </FormControl>
    )
}

export default InputForm