import {useState} from 'react'
import {useRouter} from 'next/router'
import InputForm from '../../../components/InputForm'
import Swal from 'sweetalert2'
import { Button, Container, Heading,Stack,Select, FormControl} from '@chakra-ui/react'
import { getUsuario,updateUsuario} from '../../../data/usuarios'

export const getServerSideProps = async (context) => {
    const response = await getUsuario(context.query.usuarios)
    return {
        props: {
            data: response.data
        }
    }
}

const Editar = ({ data }) => {

    const [usuario, setUsuario] = useState(data)
    const router = useRouter()
    const { usuarios } = router.query

    function validar(){

        var rut,nombre,domicilio,email,numero,tipoUsuario,estadoUsuario;
    
        rut = usuario.rut;
        nombre = usuario.nombre;
        domicilio = usuario.domicilio;
        email = usuario.email;
        numero = usuario.numero;
        tipoUsuario = usuario.tipoUsuario;
        estadoUsuario = usuario.estadoUsuario;

        const expresionNombre = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        const expresionDomicilio =/[a-zA-Z]+\s[A-Za-z0-9]+/;
        const expresionEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const expresionTelefono = /^\d{8}$/;

        if(rut === "" || nombre === "" || domicilio === "" || email === "" || numero === "" || tipoUsuario === "" || estadoUsuario === ""){
            return false;
        }else if(!expresionNombre.test(nombre)){
            alert("El nombre no es valido")
            return false;
        }else if(!expresionEmail.test(email)){
            alert("El email no es valido")
            return false;
        }else if(!expresionDomicilio.test(domicilio)){
            alert("El domicilio no valido")
            return false;
        }else if(!expresionTelefono.test(numero)){
            alert("El número de teléfono no valido (maximos 8 números)")
            return false;
        }
        return true; 
    }

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

    }

    //console.log(usuario.rut)
    const submitUsuario =(e) => {
        e.preventDefault()

        const v = validar();

        if (v === false){

        }else if (v === true){


            let timerInterval
        updateUsuario(usuarios,usuario).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Usuario actualizado correctamente',
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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar Usuario: {data.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <InputForm label="Rut" handleChange={handleChange} name="rut" placeholder="Actualizar rut" type="text" value={usuario.rut}/>
                <InputForm label="Nombre" handleChange={handleChange} name="nombre" placeholder="Actualizar nombre" type="text" value={usuario.nombre}/>
                <InputForm label="Domicilio" handleChange={handleChange} name="domicilio" placeholder="Actualizar domicilio" type="text" value={usuario.domicilio}/>
                <InputForm label="Email" handleChange={handleChange} name="email" placeholder="Actualizar email" type="text" value={usuario.email}/> 
                <InputForm label="Numero" handleChange={handleChange} name="numero" placeholder="Actualizar numero" type="tel" maxLength="8" value={usuario.numero}/> 
                
                <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario' value={usuario.tipoUsuario}>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Conserje</option>
                    </Select>
                </FormControl> 

                <FormControl id="estadoUsuario"> 
                    <h1>Estado del usuario</h1>
                    <Select name={"estadoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario' value={usuario.estadoUsuario}>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='0'>Empleado</option>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='1'>Desvinculado de la empresa</option>
                    </Select>
                </FormControl> 
                </Stack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitUsuario}>Modificar Usuario</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
        </Container>
)
}

export default Editar
