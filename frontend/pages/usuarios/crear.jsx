import { useState,useEffect} from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel, FormHelperText,Input, FormErrorMessage,Box,InputLeftAddon,InputGroup} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createUsuario,getUsuarios} from '../../data/usuarios'
import  Swal  from 'sweetalert2'
import {  validate, format } from 'rut.js'
import bcrypt from 'bcryptjs'

const Usuarios = () => {

    const [userType, setUserType] = useState("")

    useEffect(() => {
        let currentLogUser = localStorage.getItem('userType') || ""
        setUserType(currentLogUser)
    }, [])
    
    const [Usuario, setProduct] = useState({
        rut:'',
        password:'',
        nombre:'',
        email:'',
        numero:'',
        tipoUsuario:'',
        estadoUsuario:'0'
    })

    const [rutF, setRut] = useState('')

    const [allUsuarios, setAllUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios().then(res => {
            setAllUsuarios(res.data);
        });
    }, []);

    const router = useRouter()

    function validar(){

        let rut = document.getElementById("rut").value;
        let password = document.getElementById("password").value;
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let numero = document.getElementById("numero").value;
        let tipoUsuario = document.getElementById("tipoUsuario").value;

        const expresionNombre = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ug;

        const expresionTelefono = /^\d{9}$/;

        const expresionMail = /^[a-z0-9]+(?:[-\._]?[a-z0-9]+)*@(?:[a-z0-9]+(?:-?[a-z0-9]+)*\.)+[a-z]+$/;

        if (allUsuarios.some(Usuario => Usuario.rut === format(rut))) {
            alert("El rut ingresado ya existe, por favor ingrese otro.");
            return false;
        }

        if(rut === "" || password ==="" || nombre === "" || email==="" || numero === "" || tipoUsuario === ""){
            return false;
        }else if(!validate(rut)){
            alert("El rut no es valido")
            return false;
        }else if(!expresionNombre.test(nombre)){
            alert("El nombre no es valido")
            return false;
        }else if(!expresionMail.test(email)){
            alert("El correo electrónico ingresado no es valido")
            return false;
        }else if(!expresionTelefono.test(numero)){
            alert("El número de teléfono ingresado no es valido")
            return false;
        }
        return true; 
    }

    const handleChange = (e) => {
        setProduct({
            ...Usuario,
            [e.target.name]: e.target.value
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

    const submitProduct = async (e) => {

        Usuario.rut = rutF

        console.log(rutF)
        console.log(Usuario.rut)

        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        } else if (v === true){
            e.preventDefault()

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(Usuario.password, salt);

            Usuario.password = hashedPassword;
            //Usuario.numero = '56' + Usuario.numero; 

            createUsuario(Usuario).then(res => {
                Swal.fire({
                    title: 'Nuevo usuario creado',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                    router.push('./mostrar')
                    }
                }) 
            })
        }
    }

    return (
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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Ingrese los datos del usuario a crear</Heading>
            <Stack spacing={4} mt={10}>
                <FormControl id="rut" isRequired> 
                    <FormLabel>RUT</FormLabel>
                    <Input width="25%" backgroundColor= 'white' borderColor= 'black'color='black' name="rut" placeholder="12.345.678-9" value={rutF} type="text" maxLength="12" onChange = {handleChangeRut}/>
                    {!validate(rutF) ? (
                        <FormHelperText>
                            Rut Invalido
                        </FormHelperText>
                    ) : 
                        <FormErrorMessage>El rut es obligatorio</FormErrorMessage>
                    }
                </FormControl>
                <FormControl id="password" isRequired> 
                    <FormLabel>Contraseña</FormLabel>
                    <Input width="60%" backgroundColor= 'white' borderColor= 'black'color='black' pattern="[a-zA-Z]+" name={"password"} placeholder="********" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="nombre" isRequired> 
                    <FormLabel>Nombre y apellido</FormLabel>
                    <Input width="60%" backgroundColor= 'white' borderColor= 'black'color='black' pattern="[a-zA-Z]+" name={"nombre"} placeholder="Norman Vergara" type="text" onChange = {handleChange}/>
                </FormControl> 
                
                <FormControl id="email"> 
                    <FormLabel>Email</FormLabel>
                    <Input width="55%" backgroundColor= 'white' borderColor= 'black'color='black' name={"email"} placeholder="prueba@gmail.cl" type="text" onChange = {handleChange}/>   
                </FormControl>

                <FormControl id="numero" isRequired> 
                    <FormLabel>Número de teléfono</FormLabel>
                    <InputGroup>
                    <InputLeftAddon>
                        +56
                    </InputLeftAddon>
                    <Input width="25%" backgroundColor= 'white' borderColor= 'black'color='black' name={"numero"} placeholder="" type="text" maxLength="9" onChange = {handleChange}/>   
                    </InputGroup>
                    <FormHelperText>Ejemplo: 912345678</FormHelperText>
                </FormControl> 

                <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select width="60%" backgroundColor= 'white' borderColor= 'black'color='black' name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        {(userType != 2) ? (
                        <></>
                        ) : 
                        (<option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>)}
                        <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Trabajador</option>
                    </Select>
                </FormControl> 
                </Stack>
            <HStack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitProduct}>Crear usuario</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('./mostrar')}>Cancelar</Button>
            </HStack>
        </Container> 
        </Box>
        </Box>
    )
}

export default Usuarios