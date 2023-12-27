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
                <Tr key={index}>
                    <Td>{cliente.nombre}</Td>
                    <Td>{cliente.numero}</Td>
                    <Td>{cliente.mail}</Td>
                    <Td>{showEstado(cliente.estadoCliente)}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"green"} >Ver perfil</Button>    
                            <Button colorScheme={"orange"} >Modificar</Button>      
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
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="5%">Clientes</Heading>
                <Flex mt="3%"> 
                <Button variant='outline'  colorScheme='red' onClick={()=> router.push('../mostrar')}>Atras</Button>
                <Spacer></Spacer>
                <Button variant='outline' colorScheme='green'  onClick={()=> router.push('./crear')}>Crear cliente</Button>
                </Flex>

                <Stack spacing={4} mt="10">
                    <Table variant="striped">        
                        <Thead>
                            <Tr>
                                <Td>Nombre</Td>
                                <Td>Numero</Td>
                                <Td>E-mail</Td>
                                <Td>Estado</Td>
                                <Td>Acciones</Td>
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