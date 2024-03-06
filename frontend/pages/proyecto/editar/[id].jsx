import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import { Container, Heading,Stack, Button,Box,Select,FormLabel,FormControl,Textarea} from '@chakra-ui/react'
import {getProyectoEspecifico,updateProyecto} from '../../../data/proyecto'
import {getClientes} from '../../../data/cliente'
import InputForm from '../../../components/InputForm'
import InputFormDates from '../../../components/InputFormDates'
import Swal from 'sweetalert2'

export const getServerSideProps = async (context) => {

    const response = await getProyectoEspecifico(context.query.id)

    return {
        props: {
            data: response.data
        }
    }
}

const Editar = ({ data }) => {

    const [proyecto, setProyecto] = useState(data);

    const [clientes, setClientes] = useState([{
        nombre: '',
        numero: '',
        mail: '',
        estadoCliente: ''
    }])

    const router = useRouter()
    const { id } = router.query

    const handleChange = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeCliente = (e) => {
        setProyecto({ cliente: event.target.value });
    };

    useEffect(() => {
        getClientes().then(res => {
            setClientes(res.data)
        })
    }, [])

    const submitProyecto =(e) => {
        e.preventDefault()

        if (!proyecto.cliente) {
            alert('Por favor, selecciona un cliente antes de actualizar el proyecto.');
            return;
        }
        if (!proyecto.etapa) {
            alert('Por favor, selecciona la etapa en la cual se encuentra el proyecto.');
            return;
        }

        let timerInterval

        updateProyecto(id,proyecto).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Proyecto actualizado correctamente',
                    icon:'success',
                    timer:1000,
                    timerProgressBar: false,
                    showConfirmButton: false,

                    willClose: () =>{
                        clearInterval(timerInterval)
                    }
                })
                handleClick()
            }
        })
        
    }

    const handleClick = async event => {
        await delay(1300);
        router.push('../proyecto')
    };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    return(
        <Box
    	    bgGradient="linear(to-r, #007bff, #8a2be2)"
    	    height="100vh"
    	    display="flex"
    	    alignItems="center"
    	    justifyContent="center"
  	    >
            <Box
      	        bg="white"
      	        p={8}
      	        mx="auto"
      	        maxWidth="700px"
            >
        <Container maxW="container.xl" mt={10}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar proyecto: {data.nombre}</Heading>
        <Stack spacing={4} mt={10}>
            <InputForm label="Nombre del proyecto" handleChange={handleChange} placeholder="Escriba el nombre del proyecto" name="nombre" type="text" value={proyecto.nombre}/>

            <FormLabel htmlFor="cliente">Nombre del cliente
            <Select placeholder="Seleccione un cliente" onChange={handleChangeCliente} value={proyecto.cliente}>
                {(clientes.filter(cliente => cliente.estadoCliente === 0 || cliente._id === proyecto.cliente)).map((cliente) => (
                <option key={cliente._id} value={cliente._id}>
                    {cliente.nombre}
                </option>
                ))}
            </Select>
            </FormLabel>

            <FormLabel htmlFor="etapa">Etapa del proyecto
            <Select placeholder="Seleccione la etapa" onChange={handleChange} name="etapa" value={proyecto.etapa}>
                <option value="0">{"Inicio"}</option>
                <option value="1">{"Planificación"}</option>
                <option value="2">{"Ejecución"}</option>
                <option value="3">{"Terminado"}</option>
            </Select>
            </FormLabel>

            <FormControl>
                    <FormLabel>{"Descripción"}
                        <Textarea resize="vertical" maxH="8em" width="100%" backgroundColor='white' borderColor='black' color='black' name="descripcion" onChange={handleChange} maxLength={200} value={proyecto.descripcion}/>
                    </FormLabel>
            </FormControl>

            <InputFormDates label="Fecha de inicio" handleChange={handleChange} name="fechaInicio" type="date" value={proyecto.fechaInicio}/>
            <InputFormDates label="Fecha de término" handleChange={handleChange} name="fechaTermino" min={proyecto.fechaInicio} type="date" value={proyecto.fechaTermino}/>

        </Stack>
            <Button colorScheme="green" mt={10} mb={10} onClick={submitProyecto}>Modificar proyecto</Button>
            <Button colorScheme="red" ml="1"mt={10} mb={10} onClick={() => router.push('../proyecto')}>Cancelar</Button>
    </Container>
    </Box>
    </Box>  
    )
}

export default Editar