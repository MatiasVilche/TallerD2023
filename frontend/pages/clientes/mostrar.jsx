import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Box, Spacer } from '@chakra-ui/react'
import { getClientes,deleteCliente } from '../../data/cliente'
import { useRouter } from 'next/router'
import  Swal  from 'sweetalert2'

const Mostrar = () => {
    const [clientes, setClientes] = useState([{
        id: '',
        nombre: '',
        numero: '',
        email: '',
        estadoCliente: ''
    }])
    const router = useRouter()

    const delUser = async (id) => {
        const response = await deleteCliente(id,1)
    }

    const confirmDelete = async (id) => {
        Swal.fire({
            title: 'Esta seguro que quiere eliminar este cliente?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isDenied) {
                Swal.fire('No se elimino el cliente')
                return
            }else if (result.isConfirmed) {
                delUser(id)
                Swal.fire({
                    title:'Eliminado', 
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed)
                    router.reload()})            
            } 
            }
        )
    }

    const contentTable = () => {
        
        return clientes.map((cliente,index) => {
            return (               
                <Tr border="2px" borderColor="black.200" key={index}>
                    <Td border="2px" borderColor="black.200">{cliente.nombre}</Td>
                    <Td border="2px" borderColor="black.200">{cliente.numero}</Td>
                    <Td border="2px" borderColor="black.200">{cliente.email}</Td>
                    <Td border="2px" borderColor="black.200">{showEstado(cliente.estadoCliente)}</Td>
                    <Td>
                        <HStack justifyContent="center">
                            <Button colorScheme={"orange"} onClick={() => router.push(`./editar/${cliente._id}`)}>Modificar</Button>      
                            <Button colorScheme={"red"} >Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
                
            )
        })
    }

    function showEstado(a){
        console.log(a)
        var s = ""
        if(a === 0){
            s = "Cliente activo"
        }else if(a === 1){
            s = "Cliente inactivo"    
        }
            return s
        }

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
                <Heading as="h1" size="2xl" textAlign="center">Clientes</Heading>
                <Flex mt="3%"> 
                    <Button colorScheme='red' onClick={()=> router.push('../mostrar')}>Atras</Button>
                    <Button colorScheme='green' marginLeft='85%' onClick={()=> router.push('./crear')}>Crear cliente</Button>
                </Flex>

                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">        
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre</Td>
                                <Td textAlign="center">Numero</Td>
                                <Td textAlign="center">E-mail</Td>
                                <Td textAlign="center">Estado</Td>
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

export default Mostrar