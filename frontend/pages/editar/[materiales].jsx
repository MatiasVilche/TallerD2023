import {useState} from 'react'
import {useRouter} from 'next/router'
import InputForm from '../../components/InputForm'
import Swal from 'sweetalert2'
import { Button, Container, Heading,Stack,Select, FormControl} from '@chakra-ui/react'
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
        //console.log(e.target.value)
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
            <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar Material: {data.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <InputForm label="Codigo" handleChange={handleChange} name="codigo" type="text" value={material.codigo}/>
                <InputForm label="Nombre" handleChange={handleChange} name="nombre" type="text" value={material.nombre}/>
                <InputForm label="Descripcion" handleChange={handleChange} name="descripcion" type="text" value={material.descripcion}/>
                <InputForm label="Cantidad" handleChange={handleChange} name="cantidad" type="text" value={material.cantidad}/>
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitMaterial}>Modificar Material</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
        </Container>
)
}

export default Editar
