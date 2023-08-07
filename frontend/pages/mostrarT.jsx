import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Input,Select, VStack, StackDivider,useDisclosure,FormControl,FormLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,} from '@chakra-ui/react'
import { getMateriales, } from '../data/materiales'
import { useState,useEffect} from 'react'

const Mostrar = () => {

    const [material, setMaterial] = useState([{
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: ''
    }])

    const router = useRouter()

    //Trae la lista de materiales
    useEffect(() => {
        getMateriales().then(res => {
            setMaterial(res.data)
        })
    }, [])

    //Barra de busqueda
    const filterNames = e => {
        if(e.target.value.toLowerCase() === ""){
            getMateriales().then(res => {
                setMaterial(res.data)
            })
        }else{
        const search = e.target.value.toLowerCase()
        const filteredNames = material.filter(names => names.nombre.toLowerCase().includes(search))
        setMaterial(filteredNames)}
    }
    
    //Tabla de materiales
    const ContentTable = () => {
        return (

            material.map((material,index) => {
            return (
                <Tr key={index}>
                    <Td>{material.codigo}</Td>
                    <Td>{material.nombre}</Td>
                    <Td>{material.descripcion}</Td>
                    <Td>{material.cantidad}</Td>
                    <Td>
                    </Td>
                </Tr>
            )
        }))
    }

    return (
        <>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Listado de materiales</Heading>
                <VStack divider={<StackDivider borderColor='gray.200' />}spacing={4} align='stretch'>
                    <Flex>
                        <Stack spacing={4} direction={['column', 'row']}>
                            <Button variant='outline' colorScheme='red'  onClick={()=> router.push('./')}>Salir</Button>
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
                                <Td>Codigo</Td>
                                <Td>Nombre del producto</Td>
                                <Td>Descripcion</Td>
                                <Td>Cantidad</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {ContentTable()}
                        </Tbody>
                    </Table>
                </Stack>
            </Container>
        </>
    )
}

export default Mostrar