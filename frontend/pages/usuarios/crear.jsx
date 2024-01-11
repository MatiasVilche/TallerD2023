import { useState } from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel, FormHelperText,Input, FormErrorMessage,Box} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createUsuario} from '../../data/usuarios'
import  Swal  from 'sweetalert2'
import {  validate, format } from 'rut.js'
import bcrypt from 'bcryptjs'

const Usuarios = () => {
    
    const [Usuario, setProduct] = useState({
        rut:'',
        password:'',
        nombre:'',
        numero:'',
        tipoUsuario:'',
        estadoUsuario:''
    })

    const router = useRouter()

    function validar(){

        let rut = document.getElementById("rut").value;
        let password = document.getElementById("password").value;
        let nombre = document.getElementById("nombre").value;
        let numero = document.getElementById("numero").value;
        let tipoUsuario = document.getElementById("tipoUsuario").value;
        let estadoUsuario = document.getElementById("estadoUsuario").value;

        const expresionNombre = /^([a-zA-ZÁÉÍÓÚáéíóú]{2,}\s[a-zA-ZÁÉÍÓÚáéíóú]{1,}'?[a-zA-ZÁÉÍÓÚáéíóú]{2,}\s?([a-zA-ZÁÉÍÓÚáéíóú]{1,})?)/;

        const expresionTelefono = /^\d{9}$/;

        if(rut === "" || password ==="" || nombre === "" || numero === "" || tipoUsuario === "" || estadoUsuario === ""){
            return false;
        }else if(!validate(rut)){
            alert("El rut no es valido")
            return false;
        }else if(!expresionNombre.test(nombre)){
            alert("El nombre no es valido")
            return false;
        }else if(!expresionTelefono.test(numero)){
            alert("El número de teléfono no valido(8 digitos maximos)")
            return false;
        }
        return true; 
    }

    const handleChange = (e) => {
        setProduct({
            ...Usuario,
            [e.target.name]: e.target.value
        })  
    }

    const handleChangeRut = (e) => {
        setProduct({
            ...Usuario,
            [e.target.name]: format(e.target.value)
        })  
    }

    const submitProduct = async (e) => {
        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        } else if (v === true){
            e.preventDefault()

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Usuario.password, salt);

            Usuario.password = hashedPassword;

            createUsuario(Usuario).then(res => {
                Swal.fire({
                    title: 'Nuevo usuario creado',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                    router.push('./mostrar')
                    }
                }) 
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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Ingrese los datos del usuario a crear</Heading>
            <Stack spacing={4} mt={10}>
                <FormControl id="rut" isRequired> 
                    <FormLabel>RUT</FormLabel>
                    <Input width="25%" backgroundColor= 'white' borderColor= 'black'color='black' name="rut" placeholder="12.345.678-9" type="text" maxLength="12" onChange = {handleChangeRut}/>
                    {!validate(Usuario.rut) ? (
                        <FormHelperText>
                            Rut Invalido
                        </FormHelperText>
                    ) : 
                        <FormErrorMessage>El rut es obligatorio</FormErrorMessage>
                    }
                </FormControl> 
                <FormControl id="password" isRequired> 
                    <FormLabel>Contraseña</FormLabel>
                    <Input width="60%" backgroundColor= 'white' borderColor= 'black'color='black' pattern="[a-zA-Z]+" name={"password"} placeholder="********" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="nombre" isRequired> 
                    <FormLabel>Nombre y apellido</FormLabel>
                    <Input width="60%" backgroundColor= 'white' borderColor= 'black'color='black' pattern="[a-zA-Z]+" name={"nombre"} placeholder="Norman Vergara" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="numero" isRequired> 
                    <FormLabel>Número de teléfono</FormLabel>
                    <Input width="60%" backgroundColor= 'white' borderColor= 'black'color='black' name={"numero"} placeholder="12345678" type="tel" maxLength="9" onChange = {handleChange}/>   
                </FormControl> 

                <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select width="60%" backgroundColor= 'white' borderColor= 'black'color='black' name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Trabajador</option>
                    </Select>
                </FormControl> 
                <FormControl id="estadoUsuario">
                    <h1>Estado del usuario</h1>
                    <Select width="60%" backgroundColor= 'white' borderColor= 'black'color='black' name={"estadoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='0'>Empleado activo</option>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='1'>Empleado desvinculado</option>
                    </Select>
                </FormControl> 

                </Stack>
            <HStack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitProduct}>Crear usuario</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('./mostrar')}>Cancelar</Button>
            </HStack>
        </Container> 
        </Box>
        </Box>
    )
}

export default Usuarios