import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import InputForm from '../../../components/InputForm'
import Swal from 'sweetalert2'
import { Button, Container, Heading,Stack,Select, FormControl, Box,HStack,FormErrorMessage,FormHelperText,Input,FormLabel,InputGroup,InputLeftAddon } from '@chakra-ui/react'
import { getUsuario,updateUsuario} from '../../../data/usuarios'
import {  validate, format } from 'rut.js'
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

    const [rutF, setRut] = useState(usuario.rut)
    const [userType, setUserType] = useState("")

    useEffect(() => {
        let currentLogUser = localStorage.getItem('userType') || ""
        setUserType(currentLogUser)
    }, [])

    function validar(){

        var rut,nombre,email,numero,tipoUsuario;
    
        rut = usuario.rut;
        nombre = usuario.nombre;
        email = usuario.email;
        numero = usuario.numero;
        tipoUsuario = usuario.tipoUsuario;

        const expresionNombre = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ug;
        const expresionTelefono = /^\d{9}$/;
        const expresionMail = /^[a-z0-9]+(?:[-\._]?[a-z0-9]+)*@(?:[a-z0-9]+(?:-?[a-z0-9]+)*\.)+[a-z]+$/;

        if(rut === "" ||nombre === "" || email ===""||numero === "" || tipoUsuario === "" ){
            return false;
        }else if(!expresionNombre.test(nombre)){
            console.log(nombre)
            alert("El nombre no es valido")
            return false;
        }else if(!expresionMail.test(email)){
            alert("El correo electrinico ingresado no es valido")
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
            [e.target.name]: e.target.value,
            estadoUsuario: "0"
        })
    }

    const handleChangeRut = (e) => {
        
		let value = e.target.value;
		    value = value.replace(/\./g, '').replace(/-/g, '');
		if (value.length > 2) {
		    value = value.slice(0, -7) + '.' + value.slice(-7);
		}
		if (value.length > 6) {
		    value = value.slice(0, -4) + '.' + value.slice(-4);
		}
		if (value.length > 3) {
		    value = value.slice(0, -1) + '-' + value.slice(-1);
		}
        setRut(value)
	};
    
    const submitUsuario = async (e) => {
        
        usuario.rut = rutF

        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        }else if (v === true){
            e.preventDefault()

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(usuario.password, salt);

            usuario.password = hashedPassword;
            //usuario.numero = '+56' + usuario.numero; 

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
                    <FormControl id="rut" isRequired> 
                    <FormLabel>RUT</FormLabel>
                        <Input width="25%" backgroundColor= 'white' borderColor= 'black' color='black' name="rut" placeholder="12.345.678-9" type="text" maxLength="12" value={rutF} onChange = {handleChangeRut}/>
                        {!validate(rutF) ? (
                        <FormHelperText>
                            Rut Inválido
                        </FormHelperText>
                            ) : 
                        <FormErrorMessage>El RUT es obligatorio</FormErrorMessage>
                        }
                    </FormControl>

                <FormControl id="nombre" isRequired>
                <InputForm width="60%" backgroundColor= 'white' borderColor= 'black'color='black' label="Nombre" handleChange={handleChange} name="nombre" placeholder="Actualizar nombre" type="text" value={usuario.nombre}/>
                </FormControl>

                <FormControl id="email" isRequired>
                <InputForm width="55%" backgroundColor= 'white' borderColor= 'black'color='black' label="Email" handleChange={handleChange} name="email" placeholder="Actualizar email" type="text" value={usuario.email}/> 
                </FormControl>

                <FormControl id="numero" isRequired> 
                    <FormLabel>Número de teléfono</FormLabel>
                    <InputGroup display="flex" alignItems="center">
                    <InputLeftAddon lineHeight="normal">
                        +56
                    </InputLeftAddon>
                    <InputForm showLabel={false} width="25%" backgroundColor= 'white' borderColor= 'black'color='black'handleChange={handleChange} name="numero" placeholder="Actualizar numero" type="tel" maxLength="9" value={usuario.numero}/> 
                    </InputGroup>
                </FormControl>

                {usuario.tipoUsuario !== 2 && (
                    <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select width="50%" backgroundColor= 'white' borderColor= 'black' color='black' name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario' value={usuario.tipoUsuario}>
                            <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                            <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Trabajador</option>
                        </Select>
                    </FormControl>
                )}

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
