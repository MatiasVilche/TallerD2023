import React from 'react'
import { useState,useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex , Input, VStack, StackDivider,Th,Center,Box} from '@chakra-ui/react'
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

    let styles = {
        title: {
            fontSize: 18,
            bold: true,
            alignment: 'center'
        }
    };

    const generatePDF = async (proyecto) => {

        let proyectoActual = await getProyectoEspecifico(proyecto)

        let materialesParaPDF = proyectoActual.data.materiales.map((material, index) => {
            return { nombre: material.nombre, cantidad: material.cantidad };
        });

        let cuerpoTabla = materialesParaPDF.map(material => {
            return [material.nombre, material.cantidad];
        });

        const docDefinition = {
            styles: styles,
            content: [
                { text: 'Biosur ventanas PVC', style: 'title' },
                //Info proyecto
                'Proyecto: ' + proyectoActual.data.nombre,
                'Cliente: ' + proyectoActual.data.cliente,
                'Fecha de inicio: ' + proyectoActual.data.fechaInicio,
                'Fecha de termino: '+ proyectoActual.data.fechaTermino,
                '\n',
                //Info materiales proyecto
                {
                    style: 'tableExample',
                    table: {
                        body: [['Nombre del material', 'Cantidad']].concat(cuerpoTabla)
                    }
                }
            ]
        };

        pdfMake.createPdf(docDefinition).download('Informe proyecto ' + proyectoActual.data.nombre);
    }

    const router = useRouter()

    const contentTable = () => {
        return (
            Array.isArray(proyecto) && proyecto.filter(proyecto => proyecto.estado !== 1).map((proyecto, index) => {
                // Busca el cliente correspondiente al ID del cliente en el proyecto
                const clienteProyecto = clientes.find(cliente => cliente._id === proyecto.cliente);
                return (
                <Tr border="2px" borderColor="black.200" key={index}>
                    <Td border="2px" borderColor="black.200">{proyecto.nombre}</Td>
                    <Td border="2px" borderColor="black.200">{clienteProyecto ? clienteProyecto.nombre : 'Cliente no encontrado'}</Td>
                    <Td border="2px" borderColor="black.200">{proyecto.fechaInicio}</Td>
                    <Td border="2px" borderColor="black.200" style={{visibility: proyecto.fechaTermino === "0" ? 'hidden' : 'visible'}}>{proyecto.fechaTermino}</Td>
                    <Td border="2px" borderColor="black.200">{proyecto.estado === 0 ? 'Activo' : proyecto.estado}</Td>
                    <Td border="2px" borderColor="black.200">{proyecto.materiales.map(material => material.nombre).join(', ')}</Td>
                    <Td border="2px" borderColor="black.200">{proyecto.materiales.map(material => material.cantidad).join(', ')}</Td>
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
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
        <Container maxW="container.xl">
            <Heading visibility="hidden">a</Heading>
            <Heading as="h1" size="2xl" textAlign="center">
                Proyectos
            </Heading>
            <Flex>
                <Button  colorScheme='red'  onClick={()=> router.push('../mostrar')}>
                Atras
                </Button>
                <Button marginLeft='65%' colorScheme='green'  onClick={()=> router.push('./crearProyecto')}>
                Crear proyecto
                </Button>
                
                <Button ml="1%" colorScheme='orange'  onClick={()=> router.push('')}>
                Ver proyectos terminados
                </Button>
                
            </Flex>
            
            <VStack spacing={4} align='stretch'>
                <Center mt="2%">
                        <Input border="2px" borderColor="black.200" backgroundColor= 'white' textAlign="center" placeholder='Ingrese el nombre del proyecto' size='lg' width="50%" onChange={(e) => filterNames(e)}/>
                </Center>
            </VStack>

            <Stack spacing={4} mt="10">
            <Table variant="simple" bg="white">
                <Thead>
                <Tr border="2px" borderColor="black.200">
                    <Td textAlign="center">Nombre del Proyecto</Td>
                    <Td textAlign="center">Cliente</Td>
                    <Td textAlign="center">Fecha de inicio</Td>
                    <Td textAlign="center">Fecha de término</Td>
                    <Td textAlign="center">Estado del proyecto</Td>
                    <Td textAlign="center">Nombre de los materiales</Td>
                    <Td textAlign="center" >Cantidad</Td>
                    <Td textAlign="center" border="2px" borderColor="black.200">Acciones</Td>
                </Tr>
                </Thead>
                <Tbody>
                    {contentTable()}
                </Tbody>
            </Table>
            </Stack>
        </Container>
        </Box>
        </>
    )
}

export default Proyectos