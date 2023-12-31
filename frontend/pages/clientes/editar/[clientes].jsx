import {useState} from 'react'
import {useRouter} from 'next/router'
import InputForm from '../../..//components/InputForm'
import Swal from 'sweetalert2'
import { Button, Container, Heading,Stack,Select, FormControl, Box,HStack} from '@chakra-ui/react'
import {getCliente,updateCliente} from '../../../data/cliente'

export const getServerSideProps = async (context) => {
    const response = await getCliente(context.query.clientes)
    return {
        props: {
            data: response.data
        }
    }
}

const Editar = ({ data }) => {

    const [cliente, setCliente] = useState(data)
    const router = useRouter()
    const { clientes } = router.query

    function validar(){

        var nombre = cliente.nombre;
        var numero = cliente.numero;
        var email = cliente.email;
        var estadoCliente = cliente.estadoCliente;

        const expresionNombre = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
        const expresionEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const expresionTelefono = /^\d{9}$/;

        if(nombre === "" ||email === "" || numero === "" ||estadoCliente === ""){
            return false;
        }else if(!expresionNombre.test(nombre)){
            alert("El nombre no es valido")
            return false;
        }else if(!expresionEmail.test(email)){
            alert("El email no es valido")
            return false;
        }else if(!expresionTelefono.test(numero)){
            alert("El número de teléfono no valido (maximos 8 números)")
            return false;
        }
        return true; 
    }

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const submitCliente =(e) => {
        e.preventDefault()

        const v = validar();

        if (v === false){

        }else if (v === true){

        let timerInterval

        updateCliente(clientes,cliente).then(res => {
            if (res.status == 200){
                Swal.fire({
                    title:'Cliente actualizado correctamente',
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
    }
    
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    )

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
            <InputForm width="60%" backgroundColor= 'white' borderColor= 'black'color='black' label="Nombre" handleChange={handleChange} name="nombre" placeholder="Actualizar nombre" type="text" value={cliente.nombre}/>
            <InputForm width="60%" backgroundColor= 'white' borderColor= 'black'color='black' label="Email" handleChange={handleChange} name="email" placeholder="Actualizar email" type="text" value={cliente.email}/> 
            <InputForm width="25%" backgroundColor= 'white' borderColor= 'black'color='black' label="Numero" handleChange={handleChange} name="numero" placeholder="Actualizar numero" type="tel" maxLength="9" value={cliente.numero}/> 

            <FormControl id="estadoCliente"> 
                <h1>Estado del cliente</h1>
                <Select width="40%" backgroundColor= 'white' borderColor= 'black'color='black' name={"estadoCliente"} onChange = {handleChange} placeholder='Seleccione el estado del cliente' value={cliente.estadoCliente}>
                    <option name={"estadoCliente"} onChange = {handleChange} value='0'>Cliente activo</option>
                    <option name={"estadoCliente"} onChange = {handleChange} value='1'>Cliente inactivo</option>
                </Select>
            </FormControl> 
            </Stack>
            <HStack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitCliente}>Modificar Usuario</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('../mostrar')}>Cancelar</Button>
            </HStack>
    </Container>
        </Box>
    </Box>
) 
}

export default Editar
// 0 = Cliente activo  1= Cliente inactivo