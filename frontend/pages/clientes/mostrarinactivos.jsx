import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Box, Spacer,VStack} from '@chakra-ui/react'
import { getClientes,updateEstadoCliente2} from '../../data/cliente'
import { useRouter } from 'next/router'
import  Swal  from 'sweetalert2'

import Image from 'next/image'
import Logo from '../../public/logoBiosur_ST.png'

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

        const response = await updateEstadoCliente2(id)
    }

    const confirmDelete = async (id) => {

        Swal.fire({
            title: 'Está seguro que quiere habilitar este cliente?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor: 'green',
            denyButtonColor: 'red'
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire({
                    title:'No se habilitó el cliente',
                    confirmButtonColor: 'red'
                })
                return
            } else if (result.isConfirmed) {
                    modEstado(id)
                    Swal.fire({
                        title: 'Cliente habilitado',
                        showConfirmButton: true,
                        confirmButtonColor: 'blue',
                        backdrop: true
                    }).then((result) => {
                        if (result.isDismissed && result.dismiss === Swal.DismissReason.backdrop) {
                            router.reload();
                        }
                        else if (result.isConfirmed) {
                            router.reload();
                        }
                    })
            } 
            }
        )
    }

    const contentTable = () => {
        return clientes.filter(cliente => cliente.estadoCliente === 1).map((cliente, index) => {
            return (              
                <Tr border="2px" borderColor="black.200" key={index}>
                    <Td border="2px" borderColor="black.200">{cliente.nombre}</Td>
                    <Td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '1em' }} border="2px" borderColor="black.200">{'+56 ' + cliente.numero}</Td>
                    <Td border="2px" borderColor="black.200">{cliente.email}</Td>
                    {userType != 1 ? (
                    <Td>
                        <HStack justifyContent="center">
                            <Button colorScheme={"green"} onClick={() => confirmDelete(cliente._id)}>Habilitar cliente</Button>
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
        <Image
            src={Logo}
            alt='logo'
            width={182}
            height={70}
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1000
            }}
        />
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
            <Container maxW="container.xl">
                <Heading visibility="hidden">a</Heading>
                <Heading as="h1" size="2xl" textAlign="center">Clientes inactivos</Heading>
                <Flex mt="3%"> 
                    <Button colorScheme='red' onClick={()=> router.push('./mostrar')}>Atras</Button>
                </Flex>
                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">        
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre</Td>
                                <Td textAlign="center">Número</Td>
                                <Td textAlign="center">Email</Td>
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