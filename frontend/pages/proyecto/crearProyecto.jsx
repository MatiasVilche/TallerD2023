import { useState } from 'react'
import { Button, Container, Heading, HStack, Stack, FormControl, FormLabel,Input} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createProyecto} from '../../data/proyecto'
import  Swal  from 'sweetalert2'

const Proyectos = () => {

    const [proyecto, setProyecto] = useState({
        _id: '',
        nombre: '',
        materiales: []
    })

    const router = useRouter()

    const handleChange = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const submitProduct = (e) => {
            e.preventDefault()
            createProyecto(proyecto).then(res => {
            console.log(res.data)
        })

        Swal.fire({
            title: 'Se agrego un material',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
            router.push('./proyecto')
            }
        })
    }

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear un proyecto</Heading>
            <Button variant='outline' onClick={()=> router.push('./mostrar')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input pattern="[a-zA-Z]+" name={"nombre"} placeholder="Perfil aluminio 10 metros" type="text" onChange = {handleChange}/>
                </FormControl>
                </Stack>
            <HStack>
                <Button colorScheme="blue" mt={10} mb={10} onClick={submitProduct}>Crear</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('./proyecto')}>Cancelar</Button>
            </HStack>
        </Container> 
    )
}

export default Proyectos