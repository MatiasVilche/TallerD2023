import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Spacer , Input, VStack, StackDivider} from '@chakra-ui/react'
import {getHistorial} from '../data/historial'
import { getUsuarios  } from '../data/usuarios'
import { getMateriales} from '../data/materiales'
import { useState,useEffect } from 'react'

const Mostrar = () => {

    const [historial, setHistorial] = useState([{
        rutTrabajador: '',
        codigoProducto: '',
        tipo: '',
        proyecto: '',
        cantidad: '',
        descripcion:"",
        fecha: '',
    }])

    const [conserjes, setConserjes] = useState([{
        id: '',
        rut: '',
        nombre: '',
        domicilio: '',
        email: '',
        numero: '',
        tipoUsuario: '',
        estadoUsuario: ''
    }])

    const [material, setMaterial] = useState([{
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: ''
    }])

    const router = useRouter()

    

    const contentTable = () => {
        return (

            historial.map((historial,index) => {
                const trabajador = conserjes.find((t) => t._id === historial.rutTrabajador);
                const materiales = material.find((t) => t._id === historial.codigoProducto);
            return (
                <Tr key={index}>
                    <Td>{trabajador ? trabajador.nombre : ''}</Td>
                    <Td>{materiales ? materiales.nombre : ''}</Td>
                    <Td>{historial.tipo}</Td>
                    <Td>{historial.proyecto}</Td>
                    <Td>{historial.descripcion}</Td>
                    <Td>{historial.cantidad}</Td>   
                    <Td>{historial.fecha}</Td>
                    <Td>
                        <HStack>
                        </HStack>
                    </Td>
                </Tr>
            )
        }))
    }


    useEffect(() => {
        getHistorial().then(res => {
            setHistorial(res.data)
        })
    }, [])

    useEffect(() => {
        getUsuarios().then(res => {
            setConserjes(res.data)
        })
    }, [])

    //Trae la lista de materiales
    useEffect(() => {
        getMateriales().then(res => {
            setMaterial(res.data)
        })
    }, [])

    const filterNames = e => {
        //console.log(e.target.value)
        if(e.target.value.toLowerCase() === ""){
            getHistorial().then(res => {
                setHistorial(res.data)
            })
        }else{
            const search = e.target.value.toLowerCase()
            const filteredTrabajadores = conserjes.filter(names => names.nombre.toLowerCase().includes(search))
            const filteredTrabajadoresIds = filteredTrabajadores.map(conserje => conserje._id);
            const filteredNames = historial.filter(names => filteredTrabajadoresIds.includes(names.rutTrabajador));
            setHistorial(filteredNames)}
    }

    return (
        <>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Historial de retiro de materiales</Heading>
                <Button variant='outline' colorScheme='red'  onClick={()=> router.push('./mostrar')}>Salir</Button>
                <VStack divider={<StackDivider borderColor='gray.200' />}spacing={4} align='stretch'>
                    <Flex>
                        <Stack spacing={4} direction={['column', 'row']}>
                        </Stack>
                    </Flex>
                    <Flex>
                        <Input placeholder='Ingrese el nombre del producto que desea buscar' size='lg' onChange={(e) => filterNames(e)}/>
                    </Flex>
                </VStack>

                <Stack spacing={4} mt="10">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Td>Nombre del trabajador</Td>
                                <Td>Nombre del producto</Td>
                                <Td>Razon</Td>
                                <Td>Proyecto</Td>
                                <Td>Descripción</Td>
                                <Td>Cantidad</Td>
                                <Td>Fecha de retiro</Td>
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

export default Mostrar