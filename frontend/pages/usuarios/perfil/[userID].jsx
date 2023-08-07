import {useState} from 'react'
import { Box, Container, Heading,Stack, Card, CardHeader, CardBody, Text} from '@chakra-ui/react'
import { getUsuario } from '../../../data/usuarios'

export const getServerSideProps = async (context) => {
    const response = await getUsuario(context.query.userID)
    return {
        props: {
            data: response.data
        }
    }
}

const Editar = ({ data }) => {

    const [usuario, setUsuario] = useState(data)
     
    return(   
        <Container maxW="container.xl" mt={10}>
            <Card>
                <CardHeader>
                    <Heading size='lg'>Mi Perfil</Heading>
                </CardHeader>

                <CardBody>
                    <Stack spacing='4'>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        RUT
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                        {usuario.rut}
                        </Text>
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Nombre
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.nombre}
                        </Text>
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Domicilio
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.domicilio}
                        </Text>
                        
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Email
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.email}
                        </Text>
                    </Box>

                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                        Numero
                        </Heading>
                        <Text pt='2' fontSize='md' marginBottom={'1%'}>
                            {usuario.numero}
                        </Text>
                    </Box>
                    
                    </Stack>
                </CardBody>
            </Card>
                
        </Container>
)
}

export default Editar
