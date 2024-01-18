import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Input,Select, VStack, StackDivider,useDisclosure,FormControl,FormLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Slider, SliderTrack, SliderFilledTrack, SliderThumb,Text,Center, Box} from '@chakra-ui/react'
import { getMateriales,updateEstadoMaterial2} from '../data/materiales'
import  Swal  from 'sweetalert2'
import { useState,useEffect} from 'react'
import axios from 'axios';

const Mostrar = () => {

    const [material, setMaterial] = useState([{
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: '',
        estadoMaterial: ''
    }])

    //Trae la lista de materiales
    useEffect(() => {
        getMateriales().then(res => {
            setMaterial(res.data)
        })
    }, [])

    const router = useRouter()

    //Eliminar materiales
    const restoreMat = async (id) => {
        const response = await updateEstadoMaterial2(id)
    }

    //Funcion para nombres en retiro material

    const confirmRestore = async (id) => {

        Swal.fire({
            title: 'Está seguro que quiere restaurar este material?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor:'red',
            denyButtonColor:'green',
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire({title: 'No se restauro el material',confirmButtonColor:'blue'})
            }else if (result.isConfirmed) {
                restoreMat(id)
                Swal.fire({
                    title:'Material restaurado',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed)
                    router.reload()})
            }
            }
        )
    }

    const filterNames = e => {
        const search = e.target.value.toLowerCase()
        const filteredNames = material.filter(material => material.nombre.toLowerCase().includes(search))
        setMaterial(filteredNames)

        if(e.target.value.toLowerCase() === ""){
            getMateriales().then(res => {
                setMaterial(res.data)
            })
        }
        
    }

    const filterCodigo = e => {
        const search = e.target.value.toLowerCase()
        const filteredNames = material.filter(material => material.codigo.toLowerCase().includes(search))
        setMaterial(filteredNames)

        if(e.target.value.toLowerCase() === ""){
            getMateriales().then(res => {
                setMaterial(res.data)
            })
        }
        
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
            case 'code':
                setFilterFunction(() => filterCodigo);
                break;
            default:
                setFilterFunction(() => () => {});
        }
    };

    const contentTable = () => {

        const [showAdditionalField, setShowAdditionalField] = useState(false);
        const filteredMaterial = material.filter(item => item.estadoMaterial === 1);

        return (
            filteredMaterial.map((material, index) => {
                return (
                    <Tr border="2px" borderColor="black.200" key={index}>
                        <Td border="2px" borderColor="black.200">{material.codigo}</Td>
                        <Td border="2px" borderColor="black.200">{material.nombre}</Td>
                        <Td border="2px" borderColor="black.200">{material.descripcion}</Td>
                        <Td border="2px" borderColor="black.200">{material.cantidad}</Td>
                    <Td>
                        <HStack justifyContent="center">
                            <Button colorScheme={"green"} onClick={() => confirmRestore(material._id)}>Retornar material</Button>
                        </HStack>
                    </Td>
                    </Tr>
                )
            })
        )
    }

    return (
        <>
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
            <Container  maxW="container.xl">
                <Heading visibility="hidden">a</Heading>
                <Heading as="h1" size="2xl" textAlign="center">Lista de materiales inactivos</Heading>
                <Button mt="5%" colorScheme='red'  onClick={()=> router.push('./mostrar')}>Atras</Button>
                <VStack spacing={4} align='stretch'>
                        <Center>
                        <Select backgroundColor= 'white' border="2px" borderColor="black.200" size='lg' width="300px" onChange={handleSelectChange}>
                                <option value="default">Seleccione un filtro</option>
                                <option value="names">Filtrar por nombre</option>
                                <option value="code">Filtrar por codigo</option>
                        </Select>
                        <Input border="2px" borderColor="black.200" backgroundColor= 'white' width='50%' textAlign="center" placeholder='' size='lg' onChange={(e) => filterFunction(e)}/>
                        </Center>
                </VStack>

                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Codigo</Td>
                                <Td textAlign="center">Nombre del producto</Td>
                                <Td textAlign="center">Descripcion</Td>
                                <Td textAlign="center">Cantidad</Td>
                                <Td textAlign="center" border="2px" borderColor="black.200">Acciones</Td>
                            </Tr>
                        </Thead>
                        <Tbody >
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