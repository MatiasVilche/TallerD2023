import React from 'react'
import { useState,useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex , Input, VStack, StackDivider,Th,Center} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {getProyecto} from '../../data/proyecto'
import { getMateriales} from '../../data/materiales'

const Proyectos = () => {

    const [proyecto, setProyecto] = useState({
        _id: '',
        nombre: '',
        materiales: []
    })

    const [material, setMaterial] = useState([{
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: ''
    }])

    const router = useRouter()

    // Cuando los datos estén cargados, actualiza isLoading a false

    const contentTable = () => {
        return (
            Array.isArray(proyecto) && proyecto.map((proyecto, index) => (
                <Tr key={index}>
                    <Td>{proyecto.nombre}</Td>
                    <Td>{proyecto.cliente}</Td>
                    <Td>{proyecto.fechaInicio}</Td>
                    <Td style={{visibility: proyecto.fechaTermino === "0" ? 'hidden' : 'visible'}}>{proyecto.fechaTermino}</Td>
                    <Td>{proyecto.materiales.map(material => material.nombre).join(', ')}</Td>
                    <Td>{proyecto.materiales.map(material => material.cantidad).join(', ')}</Td>
                    <Td>

                    <HStack>
                        <Button colorScheme={"orange"} onClick={() => router.push(`./editarMateriales/${proyecto._id}`)}>Ver materiales</Button>
                        <Button colorScheme={"green"} onClick={() => router.push(`./editar/${proyecto._id}`)}>Editar proyecto</Button>
                        <Button colorScheme={"blue"} onClick={() => router.push(`./editar/${proyecto._id}`)}>Generar PDF</Button>
                    </HStack>
                    </Td>
                </Tr>
            ))
        )
    }

    const filterNames = e => {
        const search = e.target.value.toLowerCase();
        if (search === "") {
            getProyecto().then(res => {
                setProyecto(res.data);
            });
        } else {
            const filteredProyecto = proyecto.filter(names => names.nombre.toLowerCase().includes(search));
            setProyecto(filteredProyecto);
        }
    }

    //Trae la lista de proyectos
    useEffect(() => {
        getProyecto().then(res => {
            const proyectoData = res.data;
            setProyecto(proyectoData);
        })
    }, [])

    //Trae la lista de materiales
    useEffect(() => {
        getMateriales().then(res => {
            setMaterial(res.data)
        })
    }, [])
    
    return (
        <>
        <Container maxW="container.xl">
            <Heading as="h1" size="2xl" textAlign="center" mt="10">
                Proyectos
            </Heading>
            <Flex>
                <Button variant='outline' colorScheme='red'  onClick={()=> router.push('../mostrar')}>
                Salir
                </Button>

                <Button marginLeft='85%' variant='outline' colorScheme='green'  onClick={()=> router.push('./crearProyecto')}>
                Crear proyecto
                </Button>
            </Flex>
            <Center mt="3%">
                        <Input textAlign="center" placeholder='Ingrese el nombre del proyecto' size='lg' width="50%" onChange={(e) => filterNames(e)}/>
            </Center>

            <Stack spacing={4} mt="10">
            <Table variant="simple">
                <Thead>
                <Tr>
                    <Th>Nombre del Proyecto</Th>
                    <Th>Cliente</Th>
                    <Th>Fecha de inicio</Th>
                    <Th>Fecha de término</Th>
                    <Th>Nombre de los materiales</Th>
                    <Th>Cantidad</Th>
                </Tr>
                </Thead>
                <Tbody>
                {contentTable()}
                </Tbody>
            </Table>
            </Stack>
        </Container>
        </>
    )

}

export default Proyectos