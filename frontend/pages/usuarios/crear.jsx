import { useState } from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel, FormHelperText,Input, FormErrorMessage} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createUsuario} from '../../data/usuarios'
import  Swal  from 'sweetalert2'
import {  validate, format } from 'rut.js'

const Usuarios = () => {

    const [Usuario, setProduct] = useState({
        rut:'',
        nombre:'',
        numero:'',
        tipoUsuario:'',
        estadoUsuario:''
    })

    const router = useRouter()

    function validar(){

        var rut,nombre,numero,tipoUsuario,estadoUsuario;
    
        rut = document.getElementById("rut").value;
        nombre = document.getElementById("nombre").value;
        numero = document.getElementById("numero").value;
        tipoUsuario = document.getElementById("tipoUsuario").value;
        estadoUsuario = document.getElementById("estadoUsuario").value;
        const expresionNombre = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        const expresionTelefono = /^\d{8}$/;

        if(rut === "" || nombre === "" || numero === "" || tipoUsuario === ""){
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

    const submitProduct = (e) => {

        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        }else if (v === true){
            e.preventDefault()
        createUsuario(Usuario).then(res => {
            //console.log(res.data.name)
        })
        
        
        Swal.fire({
            title: 'Se creo un nuevo usuario',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
            router.push('../mostrar')
            }
        })    
        }
        
    }

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear Usuario</Heading>
            <Button variant='outline' colorScheme="red" onClick={()=> router.push('../mostrar')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <FormControl id="rut" isRequired> 
                    <FormLabel>RUT</FormLabel>
                    <Input name="rut" placeholder="12.345.678-9" type="text" maxLength="12" onChange = {handleChangeRut}/>
                    {!validate(Usuario.rut) ? (
                        <FormHelperText>
                            Rut Invalido
                        </FormHelperText>
                    ) : 
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    }
                </FormControl> 

                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input pattern="[a-zA-Z]+" name={"nombre"} placeholder="Norman Vergara" type="text" onChange = {handleChange}/>
                </FormControl> 
                <FormControl id="numero"> 
                    <FormLabel>Número de teléfono</FormLabel>
                    <Input name={"numero"} placeholder="12345678" type="tel" maxLength="8" onChange = {handleChange}/>   
                </FormControl> 

                <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Trabajador</option>
                    </Select>
                </FormControl> 
                <FormControl id="estadoUsuario">
                    <h1>Estado del usuario</h1>
                    <Select name={"estadoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='0'>Empleado activo</option>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='1'>Empleado desvinculado</option>
                    </Select>
                </FormControl> 

                </Stack>
            <HStack>
                <Button colorScheme="blue" mt={10} mb={10} onClick={submitProduct}>Crear</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
            </HStack>
        </Container> 
    )
}

export default Usuarios