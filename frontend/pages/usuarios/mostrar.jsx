import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Box, Spacer } from '@chakra-ui/react'
import { getUsuarios,deleteUsuario  } from '../../data/usuarios'
import { useRouter } from 'next/router'
import  Swal  from 'sweetalert2'

const Mostrar = () => {
    const [conserjes, setConserjes] = useState([{
        id: '',
        rut: '',
        nombre: '',
        domicilio: '',
        email: '',
        numero: '',
        tipoUsuario: '',
        estadoUsuario: ''
    }])
    const router = useRouter()

    const delUser = async (id) => {
        //e.preventDefault()
        const response = await deleteUsuario(id,1)
        //if (response.status === 200)
        //console.log("Eliminado")
    }

    const confirmDelete = async (id) => {
        Swal.fire({
            title: 'Esta seguro que quiere eliminar este usuario?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isDenied) {
                Swal.fire('No se elimino el usuario')
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
        
        return conserjes.map((conserje,index) => {
            return (               
                <Tr key={index}>
                    <Td border="2px" borderColor="black.200" whiteSpace="nowrap">{conserje.nombre}</Td>
                    <Td border="2px" borderColor="black.200" whiteSpace="nowrap">{conserje.rut}</Td>
                    <Td border="2px" borderColor="black.200">{conserje.email}</Td>
                    <Td border="2px" borderColor="black.200">{conserje.numero}</Td>
                    <Td border="2px" borderColor="black.200">{conserje.domicilio}</Td>
                    <Td border="2px" borderColor="black.200">{showTipo(conserje.tipoUsuario)}</Td>
                    <Td border="2px" borderColor="black.200">{showEstado(conserje.estadoUsuario)}</Td>
                    <Td border="2px" borderColor="black.200">
                        <HStack>
                            <Button colorScheme={"green"} onClick={() => router.push(`./perfil/${conserje._id}`)}>Ver perfil</Button>    
                            <Button colorScheme={"orange"} onClick={() => router.push(`./editar/${conserje._id}`)}>Modificar</Button>      
                            <Button colorScheme={"red"} onClick={() => confirmDelete(conserje._id)}>Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
                
            )
        })
    }

    function showTipo(a){
    var s = ""
    if(a === 0){
        s = "Administrador"
    }else if(a === 1){
        s = "Conserje"    
    }else if(a === 2){
        s = "Superadministrador"    
    }
        return s
    }

    function showEstado(a){
        var s = ""
        if(a === 0){
            s = "Empleado activo"
        }else if(a === 1){
            s = "Empleado desvinculado"    
        }
            return s
        }

    //conserje.tipoUsuario
    useEffect(() => {
        getUsuarios().then(res => {
            setConserjes(res.data)
        })
    }, [])

    return (
        <> 
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
            <Container maxW="container.xl">
                <Heading visibility="hidden">a</Heading>
                <Heading as="h1" size="2xl" textAlign="center">Usuarios</Heading>
                <Flex mt="3%"> 
                    <Button colorScheme='red' onClick={()=> router.push('../mostrar')}>Atras</Button>
                    <Button colorScheme='green' marginLeft='85%' onClick={()=> router.push('./crear')}>Crear Usuario</Button>
                </Flex>

                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">        
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre</Td>
                                <Td textAlign="center">RUT</Td>
                                <Td textAlign="center">E-mail</Td>
                                <Td textAlign="center">Numero</Td>
                                <Td textAlign="center">Domicilio</Td>
                                <Td textAlign="center">Tipo de usuario</Td>
                                <Td textAlign="center" borderRight="2px" borderColor="black.200">Estado</Td>
                                <Td textAlign="center">Acciones</Td>
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