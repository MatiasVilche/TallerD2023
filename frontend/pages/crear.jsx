import { useState } from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel, FormHelperText,Input, FormErrorMessage} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createMaterial} from '../data/materiales'
import  Swal  from 'sweetalert2'

const Usuarios = () => {

    const [material, setMaterial] = useState([{
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: ''
    }])

    const router = useRouter()

    const handleChange = (e) => {
        setMaterial({
            ...material,
            [e.target.name]: e.target.value
        })
        //console.log(e.target.value)
    }


    const submitProduct = (e) => {
            e.preventDefault()
        createMaterial(material).then(res => {
            console.log(res.data)
        })

        Swal.fire({
            title: 'Se agrego un material',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
            router.push('./mostrar')
            }
        })
    }

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Ingrese los datos del material a ingresar</Heading>
            <Button variant='outline' colorScheme="red" onClick={()=> router.push('./mostrar')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <FormControl id="codigo"> 
                    <FormLabel>Codigo</FormLabel>
                    <Input name="codigo" placeholder="1234" type="text" maxLength="12" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input pattern="[a-zA-Z]+" name={"nombre"} placeholder="Perfil aluminio 10 metros" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="descripcion"> 
                    <FormLabel>Descripcion</FormLabel>
                    <Input name={"descripcion"} placeholder="marca acme" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="cantidad"> 
                    <FormLabel>Cantidad</FormLabel>
                    <Input name={"cantidad"} placeholder="1" type="number" onChange = {handleChange}/>
                </FormControl>
                </Stack>
            <HStack>
                <Button colorScheme="blue" mt={10} mb={10} onClick={submitProduct}>Crear</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('./mostrar')}>Cancelar</Button>
            </HStack>
        </Container> 
    )
}

export default Usuarios