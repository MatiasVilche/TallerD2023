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
                    <Td>{conserje.nombre}</Td>
                    <Td>{conserje.rut}</Td>
                    <Td>{conserje.email}</Td>
                    <Td>{conserje.numero}</Td>
                    <Td>{conserje.domicilio}</Td>
                    <Td>{showTipo(conserje.tipoUsuario)}</Td>
                    <Td>{showEstado(conserje.estadoUsuario)}</Td>
                    <Td>
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
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="5%">Usuarios</Heading>
                <Flex mt="3%"> 
                <Button variant='outline'  colorScheme='red' onClick={()=> router.push('../mostrar')}>Atras</Button>
                <Spacer></Spacer>
                <Button variant='outline' colorScheme='green'  onClick={()=> router.push('./crear')}>Crear Usuario</Button>
                </Flex>

                <Stack spacing={4} mt="10">
                    <Table variant="striped">        
                        <Thead>
                            <Tr>
                                <Td>Nombre</Td>
                                <Td>RUT</Td>
                                <Td>E-mail</Td>
                                <Td>Numero</Td>
                                <Td>Domicilio</Td>
                                <Td>Tipo de usuario</Td>
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