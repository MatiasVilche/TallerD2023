import React from 'react'
import { useState,useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Spacer , Input, VStack, StackDivider,Th} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {getProyecto} from '../../data/proyecto'
import { getUsuarios  } from '../../data/usuarios'
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
                    <Td>{proyecto.materiales.map(material => material._id).join(', ')}</Td>
                    <Td>{proyecto.materiales.map(material => material.nombre).join(', ')}</Td>
                    <Td>{proyecto.materiales.map(material => material.cantidad).join(', ')}</Td>
                    <Td>
                        <HStack>
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
                Historial de retiro de materiales
            </Heading>
            <Button variant='outline' colorScheme='red'  onClick={()=> router.push('../mostrar')}>
                Salir
            </Button>
            <Button variant='outline' colorScheme='blue'  onClick={()=> router.push('./crearProyecto')}>
                Crear proyecto
            </Button>
            <Flex>
                        <Input placeholder='Ingrese el nombre del proyecto que desesa buscar' size='lg' onChange={(e) => filterNames(e)}/>
                    </Flex>
            <VStack divider={<StackDivider borderColor='gray.200' />}spacing={4} align='stretch'>
            <Flex>
                <Stack spacing={4} direction={['column', 'row']}>
                </Stack>
            </Flex>
            <Flex>
                
            </Flex>
            </VStack>

            <Stack spacing={4} mt="10">
            <Table variant="simple">
                <Thead>
                <Tr>
                    <Th>Nombre del Proyecto</Th>
                    <Th>Id de los materiales</Th>
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