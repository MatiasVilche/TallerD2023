import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex , Input, VStack, StackDivider,Center} from '@chakra-ui/react'
import {getHistorial} from '../data/historial'
import { getUsuarios  } from '../data/usuarios'
import { getMateriales} from '../data/materiales'
import { getProyecto} from '../data/proyecto'
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

    const [proyectos, setProyectos] = useState([]);

    const router = useRouter()

    const contentTable = () => {
        return (
            historial.map((historial,index) => {
                const trabajador = conserjes.find((t) => t._id === historial.rutTrabajador);
                const materiales = material.find((t) => t._id === historial.codigoProducto);
                const proyectoHistorial = proyectos.find(p => p._id === historial.proyecto);
                return (
                    <Tr key={index}>
                        <Td border="2px" borderColor="black.200">{trabajador ? trabajador.nombre : ''}</Td>
                        <Td border="2px" borderColor="black.200">{materiales ? materiales.nombre : ''}</Td>
                        <Td border="2px" borderColor="black.200">{showRazon(historial.tipo)}</Td>
                        <Td border="2px" borderColor="black.200">{proyectoHistorial ? proyectoHistorial.nombre : 'Proyecto no encontrado'}</Td>
                        <Td border="2px" borderColor="black.200">{historial.descripcion}</Td>
                        <Td border="2px" borderColor="black.200">{historial.cantidad}</Td>  
                        <Td border="2px" borderColor="black.200" whiteSpace="nowrap">{historial.fecha}</Td>
                    </Tr>
                )
            })
        )
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

    //Trae la lista de proyectos
    useEffect(() => {
        getProyecto().then(res => {
            setProyectos(res.data);
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

    function showRazon(a){
        var s = ""
        if(a === 0){
            s = "Venta"
        }else if(a === 1){
            s = "Prestamo"    
        }else if(a === 2){
            s = "Fabricación"    
        }
            return s
        }

    return (
        <>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Historial de retiro de materiales</Heading>
                <Button mt="5%" variant='outline' colorScheme='red'  onClick={()=> router.push('./mostrar')}>Salir</Button>
                <VStack divider={<StackDivider borderColor='gray.200' />}spacing={4} align='stretch'>
                        <Center>
                            <Input border="2px" borderColor="black.200" width='50%' textAlign="center" placeholder='Ingrese el nombre del producto que desea buscar' size='lg' onChange={(e) => filterNames(e)}/>
                        </Center>
                </VStack>

                <Stack spacing={4} mt="10">
                    <Table variant="simple" >
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre del trabajador</Td>
                                <Td textAlign="center">Nombre del producto</Td>
                                <Td textAlign="center">Razon</Td>
                                <Td textAlign="center">Proyecto</Td>
                                <Td textAlign="center">Descripción</Td>
                                <Td textAlign="center">Cantidad</Td>
                                <Td textAlign="center">Fecha de retiro</Td>
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