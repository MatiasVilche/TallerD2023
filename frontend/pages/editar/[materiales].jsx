import {useState} from 'react'
import {useRouter} from 'next/router'
import InputForm from '../../components/InputForm'
import Swal from 'sweetalert2'
import { Button, Container, Heading,Stack,Select, FormControl,Box,Textarea,FormLabel} from '@chakra-ui/react'
import { getMaterial,updateMaterial} from '../../data/materiales'
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

    function validar(){

        var codigo,nombre,descripcion,cantidad;
    
        codigo = material.codigo;
        nombre = material.nombre;
        descripcion = material.descripcion;
        cantidad = material.cantidad;

        const expresionCantidad = /^(0|[1-9]\d*)$/;

        if(codigo === "" || nombre === "" || descripcion === "" || cantidad === ""){
            alert("No pueden haber campos vacios, porfavor rellene los faltantes")
            console.log("e1")
            return false;
        }else if(!expresionCantidad.test(cantidad)){
            alert("La cantidad no es valida")
            console.log("e2")
            return false;
        }
        console.log("e3")
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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar Material: {data.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <InputForm width="35%" backgroundColor= 'white' borderColor= 'black'color='black' label="Codigo" handleChange={handleChange} name="codigo" type="text" value={material.codigo}/>
                <InputForm width="80%" backgroundColor= 'white' borderColor= 'black'color='black' label="Nombre" handleChange={handleChange} name="nombre" type="text" value={material.nombre}/>
                <FormControl>
                    <FormLabel>{"Descripcion"}
                        <Textarea resize="vertical" maxH="8em" width="100%" backgroundColor='white' borderColor='black' color='black' name="descripcion" onChange={handleChange} maxLength={200} value={material.descripcion}/>
                    </FormLabel>
                </FormControl>
                <InputForm width="25%" backgroundColor= 'white' borderColor= 'black'color='black' label="Cantidad" handleChange={handleChange} name="cantidad" type="text" value={material.cantidad}/>
                <FormLabel>{"Estado del material"}
                <Select width="40%" backgroundColor= 'white' borderColor= 'black'color='black' name={"estadoMaterial"} onChange = {handleChange} placeholder='Seleccione el estado del cliente' value={material.estadoMaterial}>
                    <option name={"estadoMaterial"} onChange = {handleChange} value='0'>Material activo</option>
                    <option name={"estadoMaterial"} onChange = {handleChange} value='1'>Material inactivo</option>
                </Select>
                </FormLabel>
            </Stack>
                <Button colorScheme="green" mt={10} mb={10} mr="1%" onClick={submitMaterial}>Modificar Material</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
            </Container>
            </Box>
        </Box>
)
}

export default Editar
