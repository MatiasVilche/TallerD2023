import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Input,Select, VStack, StackDivider,useDisclosure,FormControl,FormLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,} from '@chakra-ui/react'
import { getMateriales, deleteMaterial} from '../data/materiales'
import { getUsuarios} from '../data/usuarios'
import { getProyecto} from '../data/proyecto'
import { sendEmail} from '../data/mailer'
import  Swal  from 'sweetalert2'
import { useState,useEffect} from 'react'
import axios from 'axios';

const Mostrar = () => {

    const [material, setMaterial] = useState([{
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: ''
    }])

    const [formData, setFormData] = useState({
        rutTrabajador: '',
        codigoProducto:'',
        cantidad: '',
        tipo: '',
        proyecto: '',
        descripcion: '',
        fecha: ''
    });

    const [usuarios, setUsuarios]= useState({
        rut: '',
        nombre: '',
        numero: '',
        tipoUsuario: ''
    });

    const [proyecto, setProyecto] = useState({
        _id: '',
        nombre: '',
        materiales: []
    })

    const router = useRouter()

    //Eliminar materiales
    const delMat = async (id) => {
        const response = await deleteMaterial(id)
    }

    const handleSubmit = async() => {
        //Se agrega fecha a historial
        const currentDate = new Date();
        const formattedDate = currentDate.toDateString(); // Formatea la fecha como una cadena ISO
        const formDataToSend = { ...formData, fecha: formattedDate };

        //Cantidad actual de material
        const responseCantidad = await axios.get(`${process.env.SERVIDOR}/Material/search/${formDataToSend.codigoProducto}`)
        const data = parseInt(responseCantidad.data.cantidad);
        const newC = data - formDataToSend.cantidad 

        axios.post(`${process.env.SERVIDOR}/Historial/`, formDataToSend)
        .then(response => {
            axios({
                method:'PUT',
                url: process.env.SERVIDOR+'/Material/actualizar/'+formDataToSend.codigoProducto+'',  
                data:{
                    cantidad: newC
                }
            }).then(res => {
                if(formDataToSend.proyecto !== "") {
                    const options = {
                        method: 'PUT',
                        url: process.env.SERVIDOR+'/Proyecto/agregar/'+formDataToSend.proyecto+'',
                        headers: {'Content-Type': 'application/json'},
                        data: {material: {_id: formDataToSend.codigoProducto, cantidad: formDataToSend.cantidad , codigo: responseCantidad.data.codigo ,nombre: responseCantidad.data.nombre , descripcion: responseCantidad.data.descripcion }}
                    };
                    
                    axios.request(options).then(function (response) {
                        if(newC <= 10){
                            sendEmail(responseCantidad.data.nombre).then(res => {router.reload('./mostrar')})
                        }else(router.reload('./mostrar'))
                    }).catch(function (error) {
                        console.error(error);
                    });
                }else if(newC <= 10){
                    sendEmail(responseCantidad.data.nombre).then(res => {router.reload('./mostrar')})
                }else(router.reload('./mostrar'))
            } 
            )
        })
        .catch(error => {
        });
    };

    //Funcion para nombres en retiro material

    const confirmDelete = async (id) => {

        Swal.fire({
            title: 'Esta seguro que quiere eliminar este material?',
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire('No se elimino el material')
                return
            }else if (result.isConfirmed) {
                delMat(id)
                Swal.fire({
                    title:'Material eliminado',
                    showConfirmButton: true
                }).then((result) => {
                    if (result.isConfirmed)
                    router.reload()})
            }
            }
        )
    }

    //Trae la lista de usuarios
    useEffect(() => {
        getUsuarios().then(res => {
            setUsuarios(res.data)
        })
    }, [])

    //Trae la lista de materiales
    useEffect(() => {
        getMateriales().then(res => {
            setMaterial(res.data)
        })
    }, [])

    //Trae la lista de proyectos
    useEffect(() => {
        getProyecto().then(res => {
            const proyectoData = res.data;
            setProyecto(proyectoData);
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

    //Dialog para retiro de materiales

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
    
    //Varaible de id de material dentro del modal
    const [modalVariable, setModalVariable] = useState({ usu: [] });
    
    const fetchData = async(usu,proyecto) => {
            const variables = {
                usu,
                proyecto
            };
            setModalVariable(variables);
    };

    useEffect(() => {
    }, [modalVariable]);
    
    //Tabla de materiales
    const ContentTable = () => {
        const [showAdditionalField, setShowAdditionalField] = useState(false);
        
        return (

            material.map((material,index) => {
            return (
                <Tr key={index}>
                    <Td>{material.codigo}</Td>
                    <Td>{material.nombre}</Td>
                    <Td>{material.descripcion}</Td>
                    <Td>{material.cantidad}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme={"yellow"} onClick={() => {fetchData(usuarios,proyecto); onOpen(); setFormData({ ...formData, codigoProducto: material._id })}}>Ajustar Stock</Button>
                            <Button colorScheme={"green"} onClick={() => router.push(`./editar/${material._id}`)}>Modificar material</Button>
                            <Button colorScheme={"red"} onClick={() => confirmDelete(material._id)}>Eliminar material</Button>
    <Modal
    initialFocusRef={initialRef}
    finalFocusRef={finalRef}
    modalVariable={modalVariable}
    isOpen={isOpen}
    onClose={onClose}
    >
    <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(1px)'/>
    <ModalContent>
        <ModalHeader>Ingrese los datos</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} >

            <FormControl>
                <FormLabel htmlFor="nombreTrabajador">Nombre del trabajador</FormLabel>    
                <Select id="nombreTrabajador" placeholder="Seleccione el usuario que retira" value={formData.rutTrabajador} onChange={(e) => {const selectedUserId = e.target.options[e.target.selectedIndex].value; setFormData({ ...formData, rutTrabajador: selectedUserId });}}>
                {modalVariable.usu.map((usuario) => (
                <option key={usuario._id} value={usuario._id}>
                    {usuario.nombre}
                </option>
                ))}
                </Select>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel htmlFor="cantidad">Cantidad</FormLabel>
                <Input id="cantidad" placeholder='Last name' value={formData.cantidad} onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}/>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel htmlFor="tipoRetiro">Tipo de retiro</FormLabel>
                <Select id="tipoRetiro" placeholder="Seleccionar" value={formData.tipo} onChange={(e) => {setFormData({ ...formData, tipo: e.target.value }); setShowAdditionalField(e.target.value === "2");}}>
                    <option value="0">Venta</option>
                    <option value="1">Prestamo</option>
                    <option value="2">Fabricacion</option>
                </Select>
            </FormControl>
            {showAdditionalField && (
                <FormControl mt={4}>
                    <FormLabel htmlFor="proyecto">Proyecto</FormLabel>
                    <Select id="proyecto" placeholder="Ingrese a qué proyecto pertenece el material" value={formData.proyecto} onChange={(e) => {const selectedProyectId = e.target.options[e.target.selectedIndex].value; setFormData({ ...formData, proyecto: selectedProyectId })}}>
                    {modalVariable.proyecto.map((proyecto) => (
                    <option key={proyecto._id} value={proyecto._id}>
                    {proyecto.nombre}
                    </option>
                    ))}
                    </Select>
                </FormControl>
            )}

            <FormControl mt={4}>
                <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                <Input id="descripcion" placeholder='Last name' value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}/>
            </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Save
            </Button>

            <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
    </ModalContent>
    </Modal>
                        </HStack>
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
                            <Button variant='outline' colorScheme='green'  onClick={()=> router.push('./crear')}>Agregar un material</Button>
                            <Button variant='outline' colorScheme='blue'  onClick={()=> router.push('./historial')}>Ver historial</Button>
                            <Button variant='outline' colorScheme='yellow'  onClick={()=> router.push('./usuarios/crear')}>Crear usuario</Button>
                            <Button variant='outline' colorScheme='purple'  onClick={()=> router.push('./proyecto/proyecto')}>Ver proyectos</Button>
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

