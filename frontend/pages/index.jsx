import { useState } from 'react'
import { Button, Heading, Input, Stack, FormControl, FormLabel, useToast, Box ,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { login, isAdmin, getUsuario } from '../data/usuarios'
import { format } from 'rut.js'
import Image from 'next/image'
import Logo from '../public/logoBiosur.png'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie';
import { sendEmailPassword} from '../data/mailer'

const Index = () => {

	const [rut, setRut] = useState('')
	const [rutRecover, setRutRecover] = useState('')

	const [password, setPassword] = useState('')
	const router = useRouter()

	const handleChange = (event) => {
		let value = event.target.value;
		// Eliminamos los puntos y guiones
		value = value.replace(/\./g, '').replace(/-/g, '');
		// Agregamos los puntos y guiones en las posiciones correctas
		if (value.length > 2) {
		  value = value.slice(0, -7) + '.' + value.slice(-7);
		}
		if (value.length > 6) {
		  value = value.slice(0, -4) + '.' + value.slice(-4);
		}
		if (value.length > 3) {
		  value = value.slice(0, -1) + '-' + value.slice(-1);
		}
		setRut(value);
	};

	const handleChangeModal = (event) => {
		let value = event.target.value;
		// Eliminamos los puntos y guiones
		value = value.replace(/\./g, '').replace(/-/g, '');
		// Agregamos los puntos y guiones en las posiciones correctas
		if (value.length > 2) {
		  value = value.slice(0, -7) + '.' + value.slice(-7);
		}
		if (value.length > 6) {
		  value = value.slice(0, -4) + '.' + value.slice(-4);
		}
		if (value.length > 3) {
		  value = value.slice(0, -1) + '-' + value.slice(-1);
		}
		setRutRecover(value);
	};

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

	//Modal de contraseña
	const [isOpen, setIsOpen] = useState(false);

 	const handleOpen = () => {
    	setIsOpen(true);
 	};
 	const handleClose = () => {
		setRutRecover('');
    	setIsOpen(false);
 	};

	 function generarContraseñaAleatoria() {

		const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
		const letrasMayusculas = letrasMinusculas.toUpperCase();
		const numeros = '0123456789';
		let contraseña = '';
	
		// Genera  4 letras aleatorias
		for (let i =  0; i <  4; i++) {
			contraseña += letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)];
		}
	
		// Añade  4 números aleatorios
		for (let i =  0; i <  4; i++) {
			contraseña += numeros[Math.floor(Math.random() * numeros.length)];
		}
	
		// Añade un carácter aleatorio de letras mayúsculas o minúsculas
		contraseña += letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)];
		contraseña += letrasMayusculas[Math.floor(Math.random() * letrasMayusculas.length)];
	
		// Añade caracteres adicionales hasta llegar a una longitud de  8
		while (contraseña.length <  8) {
			const caracterAleatorio = letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)];
			contraseña += caracterAleatorio;
		}

		contraseña = contraseña.split('').sort(() => Math.random() -  0.5).join('');
	
		return contraseña;
	}

	const onSubmitRecover = async (e) => {

		let rutF = format(rutRecover);
		const response = await login(rutF);
		

		const usrType = await isAdmin(rutF);
		const usrState = await getUsuario(usrType.data.userId);

		console.log(usrState);

		if (response.data.success === true && response.data.message === "Inicio exitoso") {
			toast({
				title: 'Correo enviado',
				description: 'Correo de recuperación de contraseña enviado, revise el correo asociado a su cuenta para mas detalles.',
				status: 'success',
				duration: 8000,
				isClosable: true,
			});
		}
		else
		{
			toast({
				title: 'Login invalido',
				description: 'El rut ingresado no es valido, ingrese su RUT nuevamente.',
				status: 'error',
				duration: 8000,
				isClosable: true,
			});
		}

		let msg = {
			destino: usrState.data.email,
			user: usrState.data.nombre,
			password: generarContraseñaAleatoria()
		};

    	sendEmailPassword(msg)
	};

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
							<Input placeholder = "Ingrese su RUT" maxW="sm" style={{backgroundColor: 'white', borderColor: 'black',color: 'black',textAlign: 'center'}} value={rut} maxLength="12" onChange={handleChange} />
							<Input mt='1' type="password" placeholder = "Ingrese su contraseña" maxW="sm" style={{backgroundColor: 'white', borderColor: 'black',color: 'black',textAlign: 'center'}} onChange={handleChangePassword}/>
					</FormControl>
          <Button mt={5} colorScheme="green" onClick={onSubmit} mx="auto">
          Ingresar
          </Button>
      	</Stack>
		<Stack mt={5}>
			<a href="#" style={{color: 'blue', cursor: 'pointer'}} onClick={(e) => {e.preventDefault(); handleOpen();}}>
    			Olvidó su contraseña?
			</a>
		</Stack>
		
		<Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recuperación de contraseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
			<Input placeholder = "Ingrese su RUT" maxW="sm" style={{backgroundColor: 'white', borderColor: 'black',color: 'black',textAlign: 'center'}} value={rutRecover} maxLength="12" onChange={handleChangeModal} />
			<Button mt={4} colorScheme="blue" mx="auto" textAlign="center" justifyContent="center" onClick={onSubmitRecover}>
        		Enviar correo
      		</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  	</Box>
	)
}

export default Index
