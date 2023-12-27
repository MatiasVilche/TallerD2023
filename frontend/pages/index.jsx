import { useState } from 'react'
import { Button, Heading, Input, Stack, FormControl, FormLabel, useToast, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { login, isAdmin, getUsuario } from '../data/usuarios'
import { format } from 'rut.js'
import Image from 'next/image'
import Logo from '../public/logoBiosur.png'

const Index = () => {

	const [rut, setRUT] = useState('')
	const router = useRouter()

	const handleChange = (e) => {
		setRUT(e.target.value)
	}

	const toast = useToast()

	const onSubmit = async (e) => {
		e.preventDefault();
		let rutF = format(rut);
	
		const response = await login(rutF);
	
		if (response.success && response.message === "Inicio exitoso") {
			const usrType = await isAdmin(rutF);
			const usrState = await getUsuario(usrType.data.userId);
			
			if(usrState.data.estadoUsuario === 0){
				localStorage.setItem('token', usrState.data.userId);
				localStorage.setItem('userType', usrState.data.tipoUsuario);
				localStorage.setItem('nombreUsuario', usrState.data.nombre);
				router.push('./mostrar');
			} else {
				toast({
					title: 'Login invalido',
					description: "El rut que ingreso no corresponde a empleados activos de la empresa.",
					status: 'error',
					duration: 2000,
					isClosable: false,
				});				
			}
		} else {
			toast({
				title: 'El rut ingresado no es valido, ingrese su RUT nuevamente.',
				description: response.message,
				status: 'error',
				duration: 8000,
				isClosable: true,
			});
		}
	}

	const handleKeyDown = (event) => {
		if(event.key === 'Enter'){
			onSubmit(event);
		}
	}

	return (
		<Box
      bgGradient="linear(to-r, #007bff, #8a2be2)"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onKeyDown={handleKeyDown}
  >
      <Box
      bg="transparent"
      p={8}
      mx="auto"
      maxWidth="500px"
      textAlign="center"
      >
      <Heading as="h1" size="2xl" fontFamily="Giorgia" mt="10">
		<Image src={Logo} alt='logo' width="1%" height="1%" placeholder='blur'></Image>
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
