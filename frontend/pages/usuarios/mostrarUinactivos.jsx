import { useState, useEffect } from 'react'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Box, Spacer } from '@chakra-ui/react'
import { getUsuarios,deleteUsuario,updateEstadoUsuario2} from '../../data/usuarios'
import { useRouter } from 'next/router'
import  Swal  from 'sweetalert2'

const Mostrar = () => {
    const [usuarios, setUsuarios] = useState([{
        rut: '',
        nombre: '',
        numero: '',
        tipoUsuario: '',
        estadoUsuario: ''
    }])
    const router = useRouter()

    const modEstado = async (id) => {

        const response = await updateEstadoUsuario2(id)
    }

    const confirmDelete = async (id,tipo) => {

        Swal.fire({
            title: 'Esta seguro que quiere retornar este usuario?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor: 'red',
            denyButtonColor: 'green'
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire({
                    title:'No se retorno el usuario',
                    confirmButtonColor: 'green'
                })
                return
            } else if (result.isConfirmed) {
                    modEstado(id)
                    Swal.fire({
                        title:'Retornado', 
                        showConfirmButton: true
                    }).then((result) => {
                        if (result.isConfirmed)
                        router.reload()})         
                
            } 
            }
        )
    }

    const contentTable = () => {
        return usuarios.map((usuario, index) => {
            if (usuario.estadoUsuario === 2) {
            return (
                <Tr key={index}>
                    <Td border="2px" borderColor="black.200" whiteSpace="nowrap">{usuario.nombre}</Td>
                    <Td border="2px" borderColor="black.200" whiteSpace="nowrap">{usuario.rut}</Td>
                    <Td border="2px" borderColor="black.200">{usuario.numero}</Td>
                    <Td border="2px" borderColor="black.200">{showTipo(usuario.tipoUsuario)}</Td>
                    <Td border="2px" borderColor="black.200">
                        <HStack justifyContent="center">
                            <Button colorScheme={"green"} onClick={() => confirmDelete(usuario._id,usuario.tipoUsuario)}>Reincorporar usuario</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
            }
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
        <Box bgGradient="linear(to-r, #007bff, #8a2be2)" minH="100vh">
            <Container maxW="container.xl">
                <Heading visibility="hidden">a</Heading>
                <Heading as="h1" size="2xl" textAlign="center">Usuarios inactivos</Heading>
                <Flex mt="3%"> 
                    <Button colorScheme='red' onClick={()=> router.push('./mostrar')}>Atras</Button>
                </Flex>

                <Stack spacing={4} mt="10">
                    <Table variant="simple" bg="white">        
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Nombre</Td>
                                <Td textAlign="center">RUT</Td>
                                <Td textAlign="center">Numero</Td>
                                <Td textAlign="center" borderRight="2px" borderColor="black.200">Tipo de usuario</Td>
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