import { useState } from 'react'
import { Button, Heading, Input, Stack, FormControl, FormLabel, useToast, Box ,Center} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { login, isAdmin, getUsuario } from '../data/usuarios'
import { format } from 'rut.js'
import Image from 'next/image'
import Logo from '../public/logoBiosur.png'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie';

const Index = () => {

	const [rut, setRUT] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const handleChange = (e) => {
		setRUT(e.target.value)
	}

	const handleChangePassword = (e) => {
		setPassword(e.target.value)
	}

	const toast = useToast()

	const onSubmit = async (e) => {
		e.preventDefault();
		let rutF = format(rut);
	
		const response = await login(rutF);

		if (response.data.success === true && response.data.message === "Inicio exitoso") {
			const usrType = await isAdmin(rutF);
			const usrState = await getUsuario(usrType.data.userId);

			bcrypt.compare(password, usrState.data.password, (err, response) =>{
				if(response === false){
					toast({
						title: 'Login invalido',
						description: 'El usuario no existe o la contraseña es incorrecta, ingrese los datos nuevamente.',
						status: 'error',
						duration: 8000,
						isClosable: true,
					});
				}
				if(response === true){
					if(usrState.data.estadoUsuario === 0){
						Cookies.set('token', usrState.data.userId);
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
				}
			})

		} else {
			toast({
				title: 'Login invalido',
				description: 'El rut ingresado no es valido, ingrese su RUT nuevamente.',
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
      	bg="white"
      	p={8}
      	mx="auto"
      	maxWidth="700px"
      	textAlign="center"
    >
      <Heading as="h1" size="2xl" fontFamily="Calibri">
	  	<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
   			<Image src={Logo} alt='logo' width={400} height={150} />
		</div>
          Sistema de inventario BIOSUR
      </Heading>
      <Stack my={5}>
          			<FormControl>
							<Input placeholder = "Ingrese su RUT" maxW="sm" style={{backgroundColor: 'white', borderColor: 'black',color: 'black',textAlign: 'center'}} onChange={handleChange} />
							<Input mt='1' type="password" placeholder = "Ingrese su contraseña" maxW="sm" style={{backgroundColor: 'white', borderColor: 'black',color: 'black',textAlign: 'center'}} onChange={handleChangePassword}/>
					</FormControl>
          <Button mt={5} colorScheme="green" onClick={onSubmit} mx="auto">
          Ingresar
          </Button>
      	</Stack>
      	</Box>
  	</Box>
	)
}

export default Index
