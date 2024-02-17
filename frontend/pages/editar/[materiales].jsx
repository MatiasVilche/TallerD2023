import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import InputForm from '../../components/InputForm'
import Swal from 'sweetalert2'
import { Button, Container, Heading,Stack,Select, FormControl,Box,Textarea,FormLabel} from '@chakra-ui/react'
import { getMaterial,updateMaterial,getMateriales} from '../../data/materiales'
import { sendEmail} from '../../data/mailer'

export const getServerSideProps = async (context) => {
    const response = await getMaterial(context.query.materiales)
    return {
        props: {
            data: response.data
        }
    }
}

const Editar = ({ data }) => {

    const [material, setMaterial] = useState(data)
    const router = useRouter()
    const { materiales } = router.query

    const [allMaterials, setAllMaterials] = useState([]);

    useEffect(() => {
        getMateriales().then(res => {
            setAllMaterials(res.data);
        });
    }, []);

    function validar(){

        var codigo,nombre,descripcion,cantidad;
    
        codigo = material.codigo;
        nombre = material.nombre;
        descripcion = material.descripcion;
        cantidad = material.cantidad;

        const expresionCantidad = /^(0|[1-9]\d*)$/;
        const expresionCodigo = /^[A-Za-z0-9]+$/;
        
        // Comprueba si el código ya existe
        if (allMaterials.some(material => material.codigo === codigo)) {
            alert("El código del material ya existe");
            return false;
        }

        if(codigo === "" || nombre === "" || descripcion === "" || cantidad === ""){
            alert("No pueden haber campos vacios, por favor rellene los faltantes")
            return false;
        }else if(codigo === "" || !expresionCodigo.test(codigo)){
            alert("Codigo invalido, ingreselo nuevamente");
            return false;
        }else if(!expresionCantidad.test(cantidad)){
            alert("La cantidad no es valida")
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setMaterial({
            ...material,
            [e.target.name]: e.target.value
        })
    }

    //console.log(usuario.rut)
    const submitMaterial =(e) => {
        e.preventDefault()

        const v = validar();

        if (v === false){

        }else if (v === true){

        let timerInterval
        updateMaterial(materiales,material).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Material actualizado correctamente',
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
            if(material.cantidad <= 10){
                //placeholder de funcion de mail
                sendEmail(material.nombre)
            }
        })
        }
    }

    const handleClick = async event => {
        await delay(1300);
        router.push('../mostrar')
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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>{data.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <InputForm width="35%" backgroundColor= 'white' borderColor= 'black'color='black' label="Codigo" handleChange={handleChange} name="codigo" type="text" maxLength={12} value={material.codigo}/>
                <FormControl>
                    <FormLabel>{"Nombre"}
                        <Textarea resize="vertical" maxH="8em" width="100%" backgroundColor= 'white' borderColor= 'black'color='black' label="Nombre" handleChange={handleChange} name="nombre" type="text" maxLength={120} value={material.nombre}/>
                    </FormLabel>
                </FormControl>
                <FormControl>
                    <FormLabel>{"Descripción"}
                        <Textarea resize="vertical" maxH="8em" width="100%" backgroundColor='white' borderColor='black' color='black' name="descripcion" onChange={handleChange} maxLength={200} value={material.descripcion}/>
                    </FormLabel>
                </FormControl>
                <InputForm width="25%" backgroundColor= 'white' borderColor= 'black'color='black' label="Cantidad" handleChange={handleChange} name="cantidad" type="text" value={material.cantidad}/>
            </Stack>
                <Button colorScheme="green" mt={10} mb={10} mr="1%" onClick={submitMaterial}>Modificar Material</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
            </Container>
            </Box>
        </Box>
)
}

export default Editar
