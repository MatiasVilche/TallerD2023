import React from 'react'
import { Input, FormControl, FormLabel } from '@chakra-ui/react'

const InputFormDates = ({ label, handleChange, name, placeholder, type, value,min,max, handleBlur}) => {
    return (
        <FormControl id={name}>
            <FormLabel>{label}</FormLabel>
            <Input type={type} name={name} onChange={handleChange} value={value} min={min} max={max} onBlur={handleBlur} placeholder={placeholder}/>
        </FormControl>
    )
}

export default InputFormDates   