import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import { Container,Stack, Button,Table,Thead,Tr,Th,Tbody,Td,Heading,Box,Flex} from '@chakra-ui/react'
import {getProyectoEspecifico,deleteMaterialFromProject} from '../../../data/proyecto'
import {getMaterial,updateCantidadMaterial} from '../../../data/materiales'
import Swal from 'sweetalert2'

export const getServerSideProps = async (context) => {

    const response = await getProyectoEspecifico(context.query.id)

    return {
        props: {
            data: response.data
        }
    }
}

const EditarMateriales = ({ data }) => {

    const [proyecto, setProyecto] = useState(data);
    const router = useRouter()
    const { id } = router.query

    const eliminarMaterial = async (idMaterial,cantidadMaterial,e) => {

        try {
            const matActual = await getMaterial(idMaterial)
            const newC= matActual.data.cantidad + cantidadMaterial

            e.preventDefault();
            let timerInterval;

            deleteMaterialFromProject(id,idMaterial).then(res => {
                if (res.status == 200){
                    updateCantidadMaterial(idMaterial,newC)

                Swal.fire({
                    title:'Material eliminado correctamente',
                    icon:'success',
                    timer:1000,
                    timerProgressBar: false,
                    showConfirmButton: false,
                willClose: () =>{
                    clearInterval(timerInterval);
                }
                });
                handleClick();
                }
            });
            
        } catch (error) {
            console.error("Error al obtener el material: ", error);
        }
    }

    const handleClick = async event => {
        await delay(1300);
        router.push('../proyecto')
    };

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const contentTable = () => {
        return (
            proyecto.materiales.map((material, index) => (
                <Tr key={index}>
                    <Td border="2px" borderColor="black.200">{material.nombre}</Td>
                    <Td border="2px" borderColor="black.200">{material.cantidad}</Td>
                    <Td border="2px" borderColor="black.200">
                        <Button colorScheme={"red"} onClick={(e) => eliminarMaterial(material._id,material.cantidad, e)}>Eliminar material</Button>
                    </Td>
                </Tr>
                
            ))
        )
    }

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
            <Heading as="h1" size="2xl" textAlign="center" mt="10">Materiales proyecto: {data.nombre}</Heading>
            <Flex mt="3%"> 
                <Button colorScheme="red" onClick={()=> router.push('../proyecto')}>Atras</Button>
            </Flex>
        <Stack spacing={4} mt={10}>
        <Table variant="simple">
                <Thead>
                    <Tr border="2px" borderColor="black.200">
                        <Th textAlign="center">Nombre de los materiales</Th>
                        <Th textAlign="center">Cantidad</Th>
                        <Th textAlign="center">Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {contentTable()}
                </Tbody>
            </Table>
        </Stack>
    </Container>
    </Box>
    </Box>
    )
}

export default EditarMateriales