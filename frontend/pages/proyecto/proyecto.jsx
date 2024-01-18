import React from 'react'
import { useState,useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex , Input, VStack, StackDivider,Th,Center,Box,Select} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {getProyecto,getProyectoEspecifico,updateEstadoProyecto} from '../../data/proyecto'
import { getMateriales} from '../../data/materiales'
import { getClientes} from '../../data/cliente'
import Sidebar from '../../components/Sidebar2';
import  Swal  from 'sweetalert2'

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Image from 'next/image'
import Logo from '../../public/logoBiosur.png'

const Proyectos = () => {

    const [userType, setUserType] = useState("")

    useEffect(() => {
        let currentLogUser = localStorage.getItem('userType') || ""
        setUserType(currentLogUser)
    }, [])

    const [proyecto, setProyecto] = useState({
        _id: '',
        nombre: '',
        cliente:'',
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

        let clienteActual = clientes.find(cliente => cliente._id === proyectoActual.data.cliente);

        const docDefinition = {
            styles: styles,
            content: [
                { text: 'Biosur ventanas PVC', style: 'title' },
                //Info proyecto
                'Proyecto: ' + proyectoActual.data.nombre,
                'Cliente: ' + clienteActual.nombre,
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

    //Desactivar proyectos
    const delProyect = async (id) => {
        const response = await updateEstadoProyecto(id)
    }

    const confirmDelete = async (id) => {

        Swal.fire({
            title: 'Está seguro que quiere deshabilitar el proyecto?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor:'red',
            denyButtonColor:'green',
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire({title: 'No se deshabilito el proyecto',confirmButtonColor:'blue'})
            }else if (result.isConfirmed) {
                delProyect(id)
                Swal.fire({
                    title:'Proyecto deshabilitado',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed)
                    router.reload()})
            }
            }
        )
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
                    {userType != 1 ? (
                    <Td>
                        <HStack>
                            <Button colorScheme={"orange"} onClick={() => router.push(`./editarMateriales/${proyecto._id}`)}>Ver materiales</Button>
                            <Button colorScheme={"green"} onClick={() => router.push(`./editar/${proyecto._id}`)}>Editar proyecto</Button>
                            <Button colorScheme={"blue"} onClick={() => generatePDF(proyecto._id)}>Generar PDF</Button>
                            <Button colorScheme={"red"} onClick={() => confirmDelete(proyecto._id)}>Deshabilitar proyecto</Button>
                        </HStack>
                    </Td>
                    ) : null}
                    </Tr>
                )
            })
        )
    }

    //Trae la lista de proyectos
    useEffect(() => {
        getProyecto().then(res => {
            setProyecto(res.data);
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

    const filterProjects = e => {
        
        const search = e.target.value.toLowerCase()
        const filteredProjects = proyecto.filter(proyecto => proyecto.nombre.toLowerCase().includes(search))
        setProyecto(filteredProjects)

        if(e.target.value.toLowerCase() === ""){
            getProyecto().then(res => {
                setProyecto(res.data);
            })
        };
    }

    const filterNames = e => {
        const search = e.target.value.toLowerCase()
        const filteredClientes = clientes.filter(clientes => clientes.nombre.toLowerCase().includes(search))
        const filteredClientesIds = filteredClientes.map(cliente => cliente._id);

        const filteredNames = proyecto.filter(clientes => filteredClientesIds.includes(clientes.cliente));
        setProyecto(filteredNames)

        if(e.target.value.toLowerCase() === ""){
            getProyecto().then(res => {
                setProyecto(res.data);
            })
        };
    }

    const [filterFunction, setFilterFunction] = useState(() => () => {});

    const handleSelectChange = (event) => {
        switch (event.target.value) {
            case 'default':
                setFilterFunction(() => () => {});
                break;
            case 'names':
                setFilterFunction(() => filterNames);
                break;
            case 'projects':
                setFilterFunction(() => filterProjects);
                break;
            default:
                setFilterFunction(() => () => {});
        }
    };
    
    return (
        <>
        <Sidebar/>
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
        <Container maxW="container.xl">
            <Heading visibility="hidden">a</Heading>
            <Heading as="h1" size="2xl" textAlign="center">Proyectos</Heading>

            <Center display="flex" justifyContent="space-between" marginTop="20px">
                <Select backgroundColor= 'white' border="2px" borderColor="black.200" size='lg' width="300px" onChange={handleSelectChange}>
                    <option value="default">Seleccione un filtro</option>
                    <option value="projects">Filtrar por proyecto</option>
                    <option value="names">Filtrar por nombre</option>
                </Select>
                <Input border="2px" borderColor="black.200" backgroundColor= 'white' textAlign="center" placeholder='Ingrese el nombre del proyecto' size='lg' width="50%" onChange={(e) => filterFunction(e)}/>
                
                {userType != 1 ? (
                <Button width='15%' ml='1' colorScheme='green'  onClick={()=> router.push('./crearProyecto')}>Crear proyecto</Button>
                ) : null}
                <Button width='18%' ml='1' colorScheme='orange'  onClick={()=> router.push('./proyectoinactivos')}>Proyectos deshabilitados</Button>
            </Center>

            <Stack spacing={4} mt="10">
            <Table variant="simple" bg="white">
                <Thead>
                <Tr border="2px" borderColor="black.200">
                    <Td textAlign="center">Nombre del Proyecto</Td>
                    <Td textAlign="center">Cliente</Td>
                    <Td textAlign="center">Fecha de inicio</Td>
                    <Td textAlign="center">Fecha de término</Td>
                    <Td textAlign="center">Estado del proyecto</Td>
                    {userType != 1 ? (
                                <Td textAlign="center" border="2px" borderColor="black.200">Acciones</Td>
                    ) : null}
                    
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