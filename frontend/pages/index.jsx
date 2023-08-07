import { useState } from 'react'
import { Button, Heading, Input, Stack, FormControl, FormLabel, useToast,Box} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { login,isAdmin,getUsuario} from '../data/usuarios'
import {  validate, clean, format, getCheckDigit } from 'rut.js'

const Index = () => {

	const [rut, setRUT] = useState('')
	const router = useRouter()

	const handleChange = (e) => {
	  setRUT(e.target.value)
    console.log(rut)
	}

	const toast = useToast()

	const onSubmit = async (e) => {
		e.preventDefault()
    let rutF = format(rut)
		const response = await login(rutF)
		if (response.status === 200) {			
			const usrType = await isAdmin(rutF)

			const usrState = await getUsuario(usrType.data.userId)	
			if(usrState.data.estadoUsuario === 0){

				localStorage.setItem('token', usrType.data.userId)
			if(usrType.status === 202){
				localStorage.setItem('userType', 0)
				router.push('./mostrar')
			} else if(usrType.status === 200){
				localStorage.setItem('userType', 1)
				router.push('./mostrarT')
			}}else {
				toast({
					title: 'Login invalido',
					description: "El rut que ingreso no corresponde a empleados activos de la empresa.",
					status: 'error',
					duration: 2000,
					isClosable: false,
				})				
			}
			
		}
	}

	return (
		<Box
        bgGradient="linear(to-r, #007bff, #8a2be2)"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <Box
        bg="transparent"
        p={8}
        mx="auto"
        maxWidth="500px"
        textAlign="center"
        >
        <Heading as="h1" size="2xl" fontFamily="Giorgia" mt="10">
            Sistema de inventario Biosur
        </Heading>
        <Stack my={5}>
            <FormControl>
						<FormLabel></FormLabel>
						<Input placeholder = "Ingrese su RUT" onChange={handleChange} />
					</FormControl>
            <Button onClick={onSubmit} mx="auto">
            Ingresar
            </Button>
        </Stack>
        </Box>
    </Box>
	)
}

export default Index