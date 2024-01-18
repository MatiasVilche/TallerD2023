import { useState } from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel, FormHelperText,Input, FormErrorMessage,Box,InputGroup,InputLeftAddon} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createCliente} from '../../data/cliente'
import  Swal  from 'sweetalert2'

const Clientes = () => {

    const [Cliente, setProduct] = useState({
        nombre:'',
        numero:'',
        email:'',
        estadoCliente:''
    })

    const router = useRouter()

    function validar(){

        var nombre,numero,email;

        nombre = document.getElementById("nombre").value;
        console.log(nombre)

        numero = document.getElementById("numero").value;
        console.log(numero)

        email = document.getElementById("email").value;

        const expresionNombre = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        const expresionTelefono = /^\d{9}$/;
        const expresionMail = /^[a-z0-9]+(?:[-\._]?[a-z0-9]+)*@(?:[a-z0-9]+(?:-?[a-z0-9]+)*\.)+[a-z]+$/;

        if(nombre === "" || numero === "" || email === "" || estadoCliente === ""){
            return false;
        }else if(!expresionNombre.test(nombre)){
            alert("El nombre no es valido")
            return false;
        }else if(!expresionTelefono.test(numero)){
            alert("El número de teléfono no valido(8 digitos maximos)")
            return false;
        }else if(!expresionMail.test(email)){
            alert("El correo electrinico ingresado no es valido")
            return false;
        }
        return true; 
    }

    const handleChange = (e) => {
        setProduct({
            ...Cliente,
            [e.target.name]: e.target.value
        })  
    }

    const submitProduct = (e) => {

        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        }else if (v === true){
            e.preventDefault()
        createCliente(Cliente).then(res => {
        })
        
        
        Swal.fire({
            title: 'Se creó un nuevo cliente',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
            router.push('./mostrar')
            }
        })    
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
      	        bg="white"
      	        p={8}
      	        mx="auto"
      	        maxWidth="700px"
            >
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Ingrese los datos del cliente a crear</Heading>
            <Stack spacing={4} mt={10}>

                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input width="45%" backgroundColor= 'white' borderColor= 'black'color='black' pattern="[a-zA-Z]+" name={"nombre"} placeholder="Norman Vergara" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="numero" isRequired> 
                    <FormLabel>Número de teléfono</FormLabel>
                    <InputGroup>
                    <InputLeftAddon>
                        +56
                    </InputLeftAddon>
                    <Input width="25%" backgroundColor= 'white' borderColor= 'black'color='black' name={"numero"} placeholder="912345678" type="text" maxLength="9" onChange = {handleChange}/>   
                    </InputGroup>
                </FormControl> 

                <FormControl id="email"> 
                    <FormLabel>Email</FormLabel>
                    <Input width="55%" backgroundColor= 'white' borderColor= 'black'color='black' name={"email"} placeholder="prueba@gmail.cl" type="text" onChange = {handleChange}/>   
                </FormControl>
                </Stack>
            <HStack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitProduct}>Crear cliente</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('./mostrar')}>Cancelar</Button>
            </HStack>
        </Container> 
        </Box>
        </Box>
    )
}

export default Clientes