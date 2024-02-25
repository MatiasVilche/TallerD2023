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

    const [password, setPassword] = useState([{
        password: ''
    }])

    const router = useRouter()
    const { usuarios } = router.query

    function validar(){
        let password1 = password.password;

        if(password1 === '' || password1 === undefined){
            return false;
        } else {
            return true; 
        }
    }

    const handleChangePassword = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }
    
    const submitUsuario = async (e) => {

        const v = validar();

        if (v === false){
            alert("Ingrese la nueva contraseña para guardar");
        }else if (v === true){
            e.preventDefault()

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password.password, salt);

            usuario.password = hashedPassword;

            let timerInterval
        updateUsuario(usuarios,usuario).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Contraseña actualizada correctamente',
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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Modificar contraseña: {data.nombre}</Heading>
            <Stack spacing={4} mt={10}>
                <InputForm width="40%" backgroundColor= 'white' borderColor= 'black'color='black' label="Contraseña" handleChange={handleChangePassword} name="password" placeholder="Actualizar contraseña" type="text" value={password.password}/>
                </Stack>
                <HStack>
                    <Button colorScheme="green" mt={10} mb={10} onClick={submitUsuario}>Modificar contraseña</Button>
                    <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
                </HStack>
        </Container>
        </Box>
        </Box>
)
}

export default Editar