import { useState,useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, FormControl, FormLabel,Input,Select,Box} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createProyecto} from '../../data/proyecto'
import { getClientes} from '../../data/cliente'
import  Swal  from 'sweetalert2'

const Proyectos = () => {

    const router = useRouter()

    const [proyecto, setProyecto] = useState({
        _id: '',
        nombre: '',
        materiales: [
            
        ],
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

        if (!proyecto.cliente || !proyecto.nombre || !proyecto.fechaInicio) {
            alert('Por favor, completa todos los campos requeridos antes de enviar el proyecto.');
            return;
        }

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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Ingrese los datos del proyecto a crear</Heading>
            <Stack spacing={4} mt={10}>
                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input width="60%" backgroundColor= 'white' borderColor= 'black'color='black' pattern="[a-zA-Z]+" name={"nombre"} placeholder="Proyecto liceo AB12" type="text" onChange = {handleChange}/>
                </FormControl>

                <FormControl id="cliente"> 
                <FormLabel>Nombre del cliente</FormLabel>
                    <Select width="60%" backgroundColor= 'white' borderColor= 'black'color='black' placeholder="Seleccione el cliente" name={"cliente"} onChange = {handleChange}>
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
                <Button colorScheme="green" mt={10} mb={10} onClick={submitProduct}>Crear proyecto</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('./proyecto')}>Cancelar</Button>
            </HStack>
        </Container> 
        </Box>
        </Box>
    )
}

export default Proyectos

