import React from 'react'
import { Input, FormControl, FormLabel } from '@chakra-ui/react'

const InputForm = ({ label, handleChange, name, placeholder, type, value, handleBlur,width,backgroundColor,borderColor,color,maxLength}) => {
    return (
        <FormControl id={name}>
            <FormLabel>{label}</FormLabel>
            <Input width ={width} type={type} name={name} onChange={handleChange} value={value} onBlur={handleBlur} placeholder={placeholder} backgroundColor= {backgroundColor} maxLength={maxLength}borderColor= {borderColor} color={color}/>
        </FormControl>
    )
}

export default InputForm