import { useState,useEffect} from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel, FormHelperText,Input, FormErrorMessage,Box,Textarea} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createMaterial,getMateriales} from '../data/materiales'
import  Swal  from 'sweetalert2'

const Usuarios = () => {

    const [material, setMaterial] = useState([{
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: '',
        estadoMaterial: ''
    }])

    const [allMaterials, setAllMaterials] = useState([]);

    const router = useRouter()

    const handleChange = (e) => {
        setMaterial({
            ...material,
            [e.target.name]: e.target.value,
            estadoMaterial: 0
        })
    }

    useEffect(() => {
        getMateriales().then(res => {
            setAllMaterials(res.data);
        });
    }, []);
    
    function validar(){
        let codigo = document.getElementById("codigo").value;
        let nombre = document.getElementById("nombre").value;
        let cantidad = document.getElementById("cantidad").value;

        // Comprueba si el código ya existe
        if (allMaterials.some(material => material.codigo === codigo)) {
            alert("El código del material ya existe");
            return false;
        }
    
        if(codigo === "" || nombre === "" || cantidad === ""){
            return false;
        } else {
            return true;
        }
    }

    const submitProduct = (e) => {

        const v = validar();

        if (v === false){
            alert("Todos los campos son obligatorios");
        }else if (v === true){
            e.preventDefault()
        if (material.cantidad <= 0) {
            alert("La cantidad debe ser un número positivo");
            return;
        }

        createMaterial(material).then(res => {
            console.log(res.data)
        })

        Swal.fire({
            title: 'Se agregó un material',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
            router.push('./mostrar')
            }
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
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Ingrese los datos del material a ingresar</Heading>
            <Stack spacing={4} mt={10}>
                <FormControl id="codigo"> 
                    <FormLabel>Codigo</FormLabel>
                    <Input width="35%" backgroundColor= 'white' borderColor= 'black'color='black' name="codigo" placeholder="1234" type="number" maxLength="12" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input width="80%" backgroundColor= 'white' borderColor= 'black'color='black' pattern="[a-zA-Z]+" name={"nombre"} placeholder="Perfil aluminio 10 metros" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="descripcion"> 
                    <FormLabel>Descripcion</FormLabel>
                    <Textarea backgroundColor= 'white' borderColor= 'black' color='black' resize="vertical" maxH="8em" maxLength={200} name={"descripcion"} placeholder="marca acme" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="cantidad"> 
                    <FormLabel>Cantidad</FormLabel>
                    <Input width="25%" backgroundColor= 'white' borderColor= 'black'color='black' name={"cantidad"} placeholder="1" type="number" onChange = {handleChange}/>
                </FormControl>
                </Stack>
            <HStack>
                <Button colorScheme="green" mt={10} mb={10} onClick={submitProduct}>Crear material</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('./mostrar')}>Cancelar</Button>
            </HStack>
        </Container> 
            </Box>
        </Box>
    )
}

export default Usuarios