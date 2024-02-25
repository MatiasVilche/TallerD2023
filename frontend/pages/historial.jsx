import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex , Input, VStack, StackDivider,Center, Select,Box} from '@chakra-ui/react'
import {getHistorial} from '../data/historial'
import { getUsuarios  } from '../data/usuarios'
import { getMateriales} from '../data/materiales'
import { getProyecto} from '../data/proyecto'
import { useState,useEffect } from 'react'
import Sidebar from '../components/Sidebar2';

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

    const [usuarios, setUsuarios] = useState([{
        id: '',
        rut: '',
        nombre: '',
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

    const [proyectos, setProyectos] = useState([{
        _id: '',
        nombre: '',
        materiales: []
    }
    ]);

    const router = useRouter()

    const [isReversed, setIsReversed] = useState(false);

    const contentTable = () => {
        return (
            (isReversed ? historial.slice().reverse() : historial).map((historial,index) => {
                const trabajador = usuarios.find((t) => t._id === historial.rutTrabajador);
                const materiales = material.find((t) => t._id === historial.codigoProducto);
                const proyectoHistorial = proyectos.find(p => p._id === historial.proyecto);
                return (
                    <Tr key={index}>
                        <Td border="2px" borderColor="black.200">{trabajador ? trabajador.nombre : ''}</Td>
                        <Td border="2px" borderColor="black.200">{materiales ? materiales.nombre : ''}</Td>
                        <Td border="2px" borderColor="black.200">{showRazon(historial.tipo)}</Td>
                        <Td border="2px" borderColor="black.200">{historial.tipo === 2 ? (proyectoHistorial ? proyectoHistorial.nombre : 'Proyecto no encontrado') : null}</Td>
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
            setUsuarios(res.data)
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
        
        const search = e.target.value.toLowerCase()
        const filteredTrabajadores = usuarios.filter(names => names.nombre.toLowerCase().includes(search))
        const filteredTrabajadoresIds = filteredTrabajadores.map(conserje => conserje._id);
        const filteredNames = historial.filter(names => filteredTrabajadoresIds.includes(names.rutTrabajador));
        setHistorial(filteredNames)

        if(e.target.value.toLowerCase() === ""){
            getHistorial().then(res => {
                setHistorial(res.data)
            })
        };
    }

    const filterProducts = e => {
        const search = e.target.value.toLowerCase()
        const filteredProducts = material.filter(material => material.nombre.toLowerCase().includes(search))
        const filteredProductIds = filteredProducts.map(material => material._id);
        const filteredNames = historial.filter(product => filteredProductIds.includes(product.codigoProducto));
        setHistorial(filteredNames)

        if(e.target.value.toLowerCase() === ""){
            getHistorial().then(res => {
                setHistorial(res.data)
            })
        };
    }

    const filterProjects = e => {
        const search = e.target.value.toLowerCase()
        const filteredProjects = proyectos.filter(proyectos => proyectos.nombre.toLowerCase().includes(search))
        const filteredProjectIds = filteredProjects.map(proyectos => proyectos._id);
        const filteredNames = historial.filter(proyectos => filteredProjectIds.includes(proyectos.proyecto));
        setHistorial(filteredNames)

        if(e.target.value.toLowerCase() === ""){
            getHistorial().then(res => {
                setHistorial(res.data)
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
            case 'products':
                setFilterFunction(() => filterProducts);
                break;
            case 'projects':
                setFilterFunction(() => filterProjects);
                break;
            default:
                setFilterFunction(() => () => {});
        }
    };

    function showRazon(a){
        var s = ""
        if(a === 0){
            s = "Venta"
        }else if(a === 1){
            s = "Préstamo"    
        }else if(a === 2){
            s = "Fabricación"    
        }
            return s
        }

    return (
        <>
        <Sidebar/>
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
            <Container maxW="container.xl">
            <Heading visibility="hidden">a</Heading>
                <Heading as="h1" size="2xl" textAlign="center">Historial de retiro de materiales</Heading>
                <VStack divider={<StackDivider borderColor='gray.200' />}spacing={4} align='stretch'>
                        <Center mt="5">
                            <Select backgroundColor= 'white' border="2px" borderColor="black.200" size='lg' width="300px" onChange={handleSelectChange}>
                                <option value="default">Seleccione un filtro</option>
                                <option value="names">Filtrar por trabajador</option>
                                <option value="products">Filtrar por producto</option>
                                <option value="projects">Filtrar por proyecto</option>
                            </Select>
                            <Input border="2px" borderColor="black.200" backgroundColor= 'white' width='50%' textAlign="center" placeholder='Ingrese el nombre del producto que desea buscar' size='lg' onChange={(e) => filterFunction(e)}/>
                            <Button ml="6%" textAlign="center" colorScheme={"yellow"} onClick={() => setIsReversed(!isReversed)}>
                                Cambiar orden
                            </Button>
                        </Center>
                </VStack>
                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre del trabajador</Td>
                                <Td textAlign="center">Nombre del producto</Td>
                                <Td textAlign="center">Razón</Td>
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
            </Box>
        </>
    )
}

export default Mostrar