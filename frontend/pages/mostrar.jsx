import React from 'react'
import { useRouter } from 'next/router'
import { Button, Container, Heading, HStack, Stack, Table, Thead, Tr, Td, Tbody, Flex, Input,Select, VStack, StackDivider,useDisclosure,FormControl,FormLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Slider, SliderTrack, SliderFilledTrack, SliderThumb,Text,Center} from '@chakra-ui/react'
import { getMateriales, deleteMaterial} from '../data/materiales'
import { getUsuarios} from '../data/usuarios'
import { getProyecto} from '../data/proyecto'
import { sendEmail} from '../data/mailer'
import  Swal  from 'sweetalert2'
import { useState,useEffect} from 'react'
import axios from 'axios';
import Sidebar from '../components/Sidebar2';

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

    const resetFormData = () => {
        setFormData({
        rutTrabajador: '',
        codigoProducto:'',
        cantidad: '',
        tipo: '',
        proyecto: '',
        descripcion: '',
        fecha: ''
        });
    };

    const handleButtonClick = () => {
        onClose();
        resetFormData();
    };

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

        let diaDeLaSemana = currentDate.toLocaleString('es-ES', { weekday: 'long' });
        let año = currentDate.getFullYear();
        let mes = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        let dia = ("0" + currentDate.getDate()).slice(-2);
        let hora = ("0" + currentDate.getHours()).slice(-2);
        let minuto = ("0" + currentDate.getMinutes()).slice(-2);

        const formattedDate = `${diaDeLaSemana} ${dia}-${mes}-${año} ${hora}:${minuto}`
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
            title: 'Está seguro que quiere eliminar este material?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            confirmButtonColor:'green',
            denyButtonColor:'red',
            }).then((result) => {

            if (result.isDenied) {
                Swal.fire({title: 'No se eliminó el material',confirmButtonColor:'green'})
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
    
    const fetchData = async(usu,proyecto,CantidadMaterial) => {
            const variables = {
                usu,
                proyecto,
                CantidadMaterial
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
                <Tr border="2px" borderColor="black.200" key={index}>
                    <Td border="2px" borderColor="black.200">{material.codigo}</Td>
                    <Td border="2px" borderColor="black.200">{material.nombre}</Td>
                    <Td border="2px" borderColor="black.200">{material.descripcion}</Td>
                    <Td border="2px" borderColor="black.200">{material.cantidad}</Td>
                    <Td> 
                        <HStack>
                            <Button colorScheme={"blue"} onClick={() => {fetchData(usuarios,proyecto,material.cantidad); onOpen(); setFormData({ ...formData, codigoProducto: material._id });}}>Ajustar Stock</Button>
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
                <Slider defaultValue={formData.cantidad} min={0} max={modalVariable.CantidadMaterial} step={1} onChange={(value) => setFormData({ ...formData, cantidad: value })}>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
                <SliderThumb />
                </Slider>
            <Text>{0+formData.cantidad}</Text>
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
                <Input id="descripcion" placeholder='Ingrese una descripción' value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}/>
            </FormControl>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Guardar
            </Button>

            <Button colorScheme="red" onClick={handleButtonClick}>Cancelar</Button>
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
        <Sidebar/>
            <Container maxW="container.xl">
                <Heading as="h1" size="2xl" textAlign="center" mt="10">Lista de materiales</Heading>
                <VStack spacing={4} align='stretch'>
                    <Button marginLeft='auto' colorScheme='orange'  width='15%' className="sidebar-button"onClick={()=> router.push('./crear')}>Agregar un material</Button>
                        <Center>
                        <Input border="2px" borderColor="black.200" width='50%' textAlign="center" placeholder='Ingrese el nombre del producto que desea buscar' size='lg' onChange={(e) => filterNames(e)}/>
                        </Center>
                </VStack>

                <Stack spacing={4} mt="10">
                    <Table variant="simple">
                        <Thead>
                            <Tr border="2px" borderColor="black.200">
                                <Td textAlign="center">Codigo</Td>
                                <Td textAlign="center">Nombre del producto</Td>
                                <Td textAlign="center">Descripcion</Td>
                                <Td textAlign="center">Cantidad</Td>
                                <Td textAlign="center" border="2px" borderColor="black.200">Acciones</Td>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {ContentTable()}
                        </Tbody>
                    </Table>
                </Stack>
            </Container>
        </>
    )
}

export default Mostrar

