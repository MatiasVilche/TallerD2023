import {useState} from 'react'
import {useRouter} from 'next/router'
import InputForm from '../../../components/InputForm'
import Swal from 'sweetalert2'
import { Button, Container, Heading,Stack,Select, FormControl, Box,HStack} from '@chakra-ui/react'
import { getUsuario,updateUsuario} from '../../../data/usuarios'
import { format } from 'rut.js'
import bcrypt from 'bcryptjs'

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

        var rut,nombre,numero,tipoUsuario,estadoUsuario;
    
        rut = usuario.rut;
        nombre = usuario.nombre;
        numero = usuario.numero;
        tipoUsuario = usuario.tipoUsuario;
        estadoUsuario = usuario.estadoUsuario;

        const expresionNombre = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        const expresionTelefono = /^\d{9}$/;

        if(rut === "" ||nombre === "" || numero === "" || tipoUsuario === "" || estadoUsuario === ""){
            return false;
        }else if(!expresionNombre.test(nombre)){
            alert("El nombre no es valido")
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
    
    const submitUsuario = async (e) => {

        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        }else if (v === true){
            e.preventDefault()

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(usuario.password, salt);

            usuario.password = hashedPassword;

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
            <Container maxW="container.xl">
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar Usuario: {data.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <InputForm width="25%" backgroundColor= 'white' borderColor= 'black'color='black' label="Rut" handleChange={handleChange} name="rut" placeholder="Actualizar rut" type="text" value={usuario.rut}/>
                <InputForm width="60%" backgroundColor= 'white' borderColor= 'black'color='black' label="Nombre" handleChange={handleChange} name="nombre" placeholder="Actualizar nombre" type="text" value={usuario.nombre}/>
                <InputForm width="25%" backgroundColor= 'white' borderColor= 'black'color='black' label="Numero" handleChange={handleChange} name="numero" placeholder="Actualizar numero" type="tel" maxLength="9" value={usuario.numero}/> 
                
                {usuario.tipoUsuario !== 2 && (
                    <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select width="50%" backgroundColor= 'white' borderColor= 'black' color='black' name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario' value={usuario.tipoUsuario}>
                            <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                            <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Trabajador</option>
                        </Select>
                    </FormControl>
                )}

                <FormControl id="estadoUsuario"> 
                    <h1>Estado del usuario</h1>
                    <Select width="40%" backgroundColor= 'white' borderColor= 'black'color='black' name={"estadoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario' value={usuario.estadoUsuario}>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='0'>Empleado</option>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='1'>Desvinculado de la empresa</option>
                    </Select>
                </FormControl> 
                </Stack>
                <HStack>
                    <Button colorScheme="green" mt={10} mb={10} onClick={submitUsuario}>Modificar Usuario</Button>
                    <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
                </HStack>
        </Container>
        </Box>
        </Box>
)
}

export default Editar
