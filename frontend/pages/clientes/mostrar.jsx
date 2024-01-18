import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Box, Spacer,VStack, Center} from '@chakra-ui/react'
import { getClientes,updateEstadoCliente} from '../../data/cliente'
import { useRouter } from 'next/router'
import  Swal  from 'sweetalert2'
import Sidebar from '../../components/Sidebar2';


const Mostrar = () => {

    const [userType, setUserType] = useState("")

    useEffect(() => {
        let currentLogUser = localStorage.getItem('userType') || ""
        setUserType(currentLogUser)
    }, [])

    const [clientes, setClientes] = useState([{
        id: '',
        nombre: '',
        numero: '',
        email: '',
        estadoCliente: ''
    }])
    const router = useRouter()

    const modEstado = async (id) => {

        const response = await updateEstadoCliente(id)
    }

    const confirmDelete = async (id) => {

        Swal.fire({
            title: 'Esta seguro que quiere deshabilitar este cliente?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor: 'red',
            denyButtonColor: 'green'
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire({
                    title:'No se deshabilito el cliente',
                    confirmButtonColor: 'green'
                })
                return
            } else if (result.isConfirmed) {
                    modEstado(id)
                    Swal.fire({
                        title:'Deshabilitado', 
                        showConfirmButton: true
                    }).then((result) => {
                        if (result.isConfirmed)
                        router.reload()})         
            } 
            }
        )
    }

    const contentTable = () => {
        return clientes.filter(cliente => cliente.estadoCliente === 0).map((cliente, index) => {
            return (              
                <Tr border="2px" borderColor="black.200" key={index}>
                    <Td border="2px" borderColor="black.200">{cliente.nombre}</Td>
                    <Td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '1em' }} border="2px" borderColor="black.200">{'+56 ' + cliente.numero}</Td>
                    <Td border="2px" borderColor="black.200">{cliente.email}</Td>
                    {userType != 1 ? (
                    <Td>
                        <HStack justifyContent="center">
                            <Button colorScheme={"orange"} onClick={() => router.push(`./editar/${cliente._id}`)}>Modificar</Button>      
                            <Button colorScheme={"red"} onClick={() => confirmDelete(cliente._id)}>Deshabilitar</Button>
                        </HStack>
                    </Td>
                    ) : null}
                </Tr>
                
            )
        })
    }

    useEffect(() => {
        getClientes().then(res => {
            setClientes(res.data)
        })
    }, [])

    return (
        <> 
        <Sidebar/>
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
            <Container maxW="container.xl">
                <Heading visibility="hidden">a</Heading>
                <Heading as="h1" size="2xl" textAlign="center">Clientes</Heading>
                <Center display="flex" marginTop="20px">
                    {userType != 1 ? (
                    <Button colorScheme='green' ml='70%' width='15%' onClick={()=> router.push('./crear')}>Crear cliente</Button>
                    ) : null}
                    <Button colorScheme='blue' ml='1' width='15%' onClick={()=> router.push('./mostrarinactivos')}>Ver clientes inactivos</Button>
                </Center>
                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">        
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre</Td>
                                <Td textAlign="center">Numero</Td>
                                <Td textAlign="center">E-mail</Td>
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

export default Mostrar