import { useState,useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, FormControl, FormLabel,Input,Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createProyecto} from '../../data/proyecto'
import { getClientes} from '../../data/cliente'
import  Swal  from 'sweetalert2'

const Proyectos = () => {

    const router = useRouter()

    const [proyecto, setProyecto] = useState({
        _id: '',
        nombre: '',
        materiales: [],
        cliente:'',
        fechaInicio:'',
        fechaTermino:''
    })

    const [clientes, setClientes]= useState([]);

    useEffect(() => {
        getClientes().then(res => {
        setClientes(res.data)
        })
    }, [])

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
            title: 'Se agregó un material',
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
            <Button variant='outline' colorScheme="red" onClick={()=> router.push('./proyecto')}>Atras</Button>
            <Stack spacing={4} mt={10}>
                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input pattern="[a-zA-Z]+" name={"nombre"} placeholder="Proyecto liceo AB12" type="text" onChange = {handleChange}/>
                </FormControl>

                <FormControl id="cliente"> 
                <FormLabel>Nombre del cliente</FormLabel>
                    <Select name={"cliente"} onChange = {handleChange}>
                        {clientes.map((cliente, index) => (
                        <option key={index} value={cliente._id}>{cliente.nombre}</option>
                    ))}
                    </Select>
                </FormControl>

                <FormControl id="cliente"> 
                    <FormLabel>Fecha de inicio</FormLabel>
                    <input type="date" name="fechaInicio"  onChange = {handleChange}/>
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

