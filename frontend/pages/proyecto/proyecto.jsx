import React from 'react'
import { useState,useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex , Input, VStack, StackDivider,Th,Center} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {getProyecto,getProyectoEspecifico} from '../../data/proyecto'
import { getMateriales} from '../../data/materiales'
import { getClientes} from '../../data/cliente'

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Image from 'next/image'
import Logo from '../../public/logoBiosur.png'

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

    const [clientes, setClientes] = useState([{
        nombre: '',
        numero: '',
        mail: '',
        estadoCliente: ''
    }])


    const generatePDF = async (proyecto) => {

        let proyectoActual = await getProyectoEspecifico(proyecto)

        let materialesParaPDF = proyectoActual.data.materiales.map((material, index) => {
            return { text: 'Material ' + (index + 1) + ': ' + material.nombre +'.'+' Cantidad: '+material.cantidad};
        });

        const docDefinition = { 
            content: [
                //Info proyecto
                'Proyecto: ' + proyectoActual.data.nombre,
                'Cliente: ' + proyectoActual.data.cliente,
                'Fecha de inicio: ' + proyectoActual.data.fechaInicio,
                'Fecha de termino: '+ proyectoActual.data.fechaTermino,
                '\n',

                //Info materiales proyecto
                ...materialesParaPDF
            ]
        };

        pdfMake.createPdf(docDefinition).download();
    }
    
    const router = useRouter()

    const contentTable = () => {
        return (
            Array.isArray(proyecto) && proyecto.filter(proyecto => proyecto.estado !== 1).map((proyecto, index) => {
                // Busca el cliente correspondiente al ID del cliente en el proyecto
                const clienteProyecto = clientes.find(cliente => cliente._id === proyecto.cliente);
                return (
                <Tr key={index}>
                    <Td>{proyecto.nombre}</Td>
                    <Td>{clienteProyecto ? clienteProyecto.nombre : 'Cliente no encontrado'}</Td>
                    <Td>{proyecto.fechaInicio}</Td>
                    <Td style={{visibility: proyecto.fechaTermino === "0" ? 'hidden' : 'visible'}}>{proyecto.fechaTermino}</Td>
                    <Td>{proyecto.estado === 0 ? 'Activo' : proyecto.estado}</Td>
                    <Td>{proyecto.materiales.map(material => material.nombre).join(', ')}</Td>
                    <Td>{proyecto.materiales.map(material => material.cantidad).join(', ')}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`./editarMateriales/${proyecto._id}`)}>Ver materiales</Button>
                            <Button colorScheme={"green"} onClick={() => router.push(`./editar/${proyecto._id}`)}>Editar proyecto</Button>
                            <Button colorScheme={"blue"} onClick={() => generatePDF(proyecto._id)}>Generar PDF</Button>
                            <Button colorScheme={"red"} >Eliminar proyecto</Button>
                        </HStack>
                    </Td>
                    </Tr>
                )
            })
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

    //Trae la lista de clientes
    useEffect(() => {
        getClientes().then(res => {
            setClientes(res.data)
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
            <Button mt="3%" marginLeft='85%' variant='outline' colorScheme='orange'  onClick={()=> router.push('')}>
                Ver proyectos terminados
                </Button>
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
                    <Th>Estado del proyecto</Th>
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