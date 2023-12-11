import {useState} from 'react'
import {useRouter} from 'next/router'
import { Container, Heading,Stack, Button} from '@chakra-ui/react'
import {getProyectoEspecifico,updateProyecto} from '../../../data/proyecto'
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

    const router = useRouter()
    const { id } = router.query

    const handleChange = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    };

    const submitProyecto =(e) => {
        e.preventDefault()

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
        <Container maxW="container.xl" mt={10}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar proyecto: {data.nombre}</Heading>
        <Stack spacing={4} mt={10}>
            <InputForm label="Nombre del proyecto" handleChange={handleChange} placeholder="Escriba el nombre del proyecto" name="nombre" type="text" value={proyecto.nombre}/>
            <InputForm label="Nombre del cliente" handleChange={handleChange} placeholder="Escriba el nombre del cliente" name="cliente" type="text" value={proyecto.cliente}/>
            <InputFormDates label="Fecha de inicio" handleChange={handleChange} name="fechaInicio" type="date" value={proyecto.fechaInicio}/>
            <InputFormDates label="Fecha de término" handleChange={handleChange} name="fechaTermino" min={proyecto.fechaInicio} type="date" value={proyecto.fechaTermino}/>

        </Stack>
            <Button colorScheme="green" mt={10} mb={10} onClick={submitProyecto}>Modificar Material</Button>
            <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../proyecto')}>Cancelar</Button>
    </Container>
    )
}

export default Editar
