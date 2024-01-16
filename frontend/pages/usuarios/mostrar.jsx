import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Box, Spacer,VStack} from '@chakra-ui/react'
import { getUsuarios,deleteUsuario,updateEstadoUsuario} from '../../data/usuarios'
import { useRouter } from 'next/router'
import  Swal  from 'sweetalert2'
import Sidebar from '../../components/Sidebar2';

const Mostrar = () => {

    const [userType, setUserType] = useState("")

    useEffect(() => {
        let currentLogUser = localStorage.getItem('userType') || ""
        setUserType(currentLogUser)
    }, [])

    const [usuarios, setUsuarios] = useState([{
        rut: '',
        nombre: '',
        numero: '',
        tipoUsuario: '',
        estadoUsuario: ''
    }])
    const router = useRouter()

    const modEstado = async (id) => {

        const response = await updateEstadoUsuario(id)
    }

    const confirmDelete = async (id,tipo) => {

        Swal.fire({
            title: 'Esta seguro que quiere eliminar este usuario?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor: 'red',
            denyButtonColor: 'green'
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire({
                    title:'No se elimino el usuario',
                    confirmButtonColor: 'green'
                })
                return
            } else if (result.isConfirmed) {
                if (tipo === 2) {
                    Swal.fire(
                    {
                        title:'No se puede eliminar este usuario',
                        confirmButtonColor: 'red'
                    })
                    
                } else {
                    modEstado(id)
                    Swal.fire({
                        title:'Eliminado', 
                        showConfirmButton: true
                    }).then((result) => {
                        if (result.isConfirmed)
                        router.reload()})         
                }
            } 
            }
        )
    }

    const contentTable = () => {
        return usuarios.map((usuario, index) => {
            if (usuario.estadoUsuario === 2) {
                return null;
            }
            return (
                <Tr key={index}>
                    <Td border="2px" borderColor="black.200" whiteSpace="nowrap">{usuario.nombre}</Td>
                    <Td border="2px" borderColor="black.200" whiteSpace="nowrap">{usuario.rut}</Td>
                    <Td border="2px" borderColor="black.200">{usuario.numero}</Td>
                    <Td border="2px" borderColor="black.200">{showTipo(usuario.tipoUsuario)}</Td>
                    <Td border="2px" borderColor="black.200">{showEstado(usuario.estadoUsuario)}</Td>
                    {userType != 1 ? (
                    <Td border="2px" borderColor="black.200">
                        <HStack justifyContent="center">
                            <Button colorScheme={"orange"} onClick={() => router.push(`./editar/${usuario._id}`)}>Modificar</Button>
                            <Button colorScheme={"blue"} onClick={() => router.push(`./editarPassword/${usuario._id}`)}>Cambiar contraseña</Button>      
                            <Button colorScheme={"red"} onClick={() => confirmDelete(usuario._id,usuario.tipoUsuario)}>Eliminar</Button>
                        </HStack>
                    </Td>
                    ) : null}
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
            setUsuarios(res.data)
        })
    }, [])

    return (
        <>
        <Sidebar/>
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
            <Container maxW="container.xl">
                <Heading visibility="hidden">a</Heading>
                <Heading as="h1" size="2xl" textAlign="center">Usuarios</Heading>
                <VStack spacing={4} align='stretch'>
                    <Heading visibility="hidden">a</Heading>
                    {userType != 1 ? (
                    <Button colorScheme='green' width='15%' marginLeft='85%' onClick={()=> router.push('./crear')}>Crear Usuario</Button>
                    ) : null}
                    {userType != 1 ? (
                    <Button colorScheme='blue' width='15%'marginLeft='85%' onClick={()=> router.push('./mostrarUinactivos')}>Usuarios inactivos</Button>
                    ) : null}
                </VStack>

                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">        
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre</Td>
                                <Td textAlign="center">RUT</Td>
                                <Td textAlign="center">Numero</Td>
                                <Td textAlign="center">Tipo de usuario</Td>
                                <Td textAlign="center" borderRight="2px" borderColor="black.200">Estado</Td>
                                {userType != 1 ? (
                                <Td textAlign="center">Acciones</Td>
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