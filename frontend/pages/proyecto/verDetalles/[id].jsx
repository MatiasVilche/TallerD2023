import {useState,useRef,useEffect} from 'react'
import {useRouter} from 'next/router'
import { Container,Stack, Button,Table,Thead,Tr,Th,Tbody,Td,Heading,Box,Flex,Text} from '@chakra-ui/react'
import {getProyectoEspecifico} from '../../../data/proyecto'
import { uploadPdf } from '../../../data/fileUpload';
import { getPdfList } from '../../../data/pdfProyectos';
import { getClientes} from '../../../data/cliente'
import Swal from 'sweetalert2'

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const getServerSideProps = async (context) => {

    const response = await getProyectoEspecifico(context.query.id)

    return {
        props: {
            data: response.data
        }
    }
}

const VerDetalles = ({ data }) => {

    const [proyecto, setProyecto] = useState(data);
    const router = useRouter()
    const { id } = router.query

    const [clientes, setClientes] = useState([{
        nombre: '',
        numero: '',
        mail: '',
        estadoCliente: ''
    }])

    const styles = {
        title: {
            fontSize:  18,
            bold: true,
            margin: [0,  0,  0,  10], // Margen superior
        },
        subtitle: {
            fontSize:  14,
            italic: true,
            margin: [0,  10,  0,  5], // Margen superior e inferior
        },
        tableExample: {
            margin: [0,  5,  0,  15], // Margen superior e inferior
        },
        tableHeader: {
            bold: true,
            fontSize:  13,
            color: 'black',
        },
        tableCell: {
            fontSize:  12,
        },
    };

    //Inicio de bloque de PDF desde el backend
    const [pdfFiles, setPdfFiles] = useState([]);

    useEffect(() => {
        const fetchPdfList = async () => {
            //console.log(proyecto.nombre)
        try {
            const files = await getPdfList(proyecto._id+"-"+proyecto.nombre); // Especifica la subcarpeta aquí
            setPdfFiles(files);
        } catch (error) {
        }
        };
        fetchPdfList();
    }, []);

    //Fin del bloque de PDF desde el backend

    //Inicio del bloque de PDF del proyecto
    const generatePDF = async (proyecto) => {

        let proyectoActual = await getProyectoEspecifico(proyecto)

        let materialesParaPDF = proyectoActual.data.materiales.map((material, index) => {
            return { nombre: material.nombre, cantidad: material.cantidad };
        });

        let cuerpoTabla = materialesParaPDF.map(material => {
            return [material.nombre, material.cantidad];
        });

        let clienteActual = clientes.find(cliente => cliente._id === proyectoActual.data.cliente);

        const docDefinition = {
            styles: styles,
            content: [
                { text: 'Biosur ventanas PVC', style: 'title' },
                // Info proyecto
                { text: 'Proyecto: ' + proyectoActual.data.nombre, style: 'subtitle' },
                { text: 'Cliente: ' + clienteActual.nombre, style: 'subtitle' },
                { text: 'Fecha de inicio: ' + proyectoActual.data.fechaInicio, style: 'subtitle' },
                { text: 'Fecha de termino: ' + (proyectoActual.data.fechaTermino ===  "0" ? 'Sin definir' : proyectoActual.data.fechaTermino), style: 'subtitle' },
                '\n',
                // Info materiales proyecto
                {
                    style: 'tableExample',
                    table: {
                        headerRows:  1,
                        widths: ['*', '*'],
                        body: [
                            [{ text: 'Nombre del material', style: 'tableHeader' }, { text: 'Cantidad', style: 'tableHeader' }],
                        ].concat(cuerpoTabla.map(row => row.map(cell => ({ text: cell, style: 'tableCell' })))),
                    },
                },
            ],
        };

    pdfMake.createPdf(docDefinition).download('Informe proyecto ' + proyectoActual.data.nombre);
    }
    //Fin del bloque de PDF del proyecto

    //Trae la lista de clientes
    useEffect(() => {
        getClientes().then(res => {
            setClientes(res.data)
        })
    }, [])

    //Tabla de PDF
    const fillTable = () => {
    return pdfFiles.map((file, index) => (
        <Tr key={index}>
            <Td border="2px" borderColor="black.200">{file}</Td>
        </Tr>
    ));
    };

    //Tabla de materiales
    const contentTable = () => {
        return (
            proyecto.materiales.map((material, index) => (
                <Tr key={index}>
                    <Td border="2px" borderColor="black.200">{material.nombre}</Td>
                    <Td border="2px" borderColor="black.200">{material.cantidad}</Td>
                </Tr>
                
            ))
        )
    }

    return(
        <Box
    	    bgGradient="linear(to-r, #007bff, #8a2be2)"
    	    height="100vh"
            minHeight="100vh"
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
        <Button colorScheme="red" onClick={()=> router.push('../proyecto')}>Atrás</Button>
        <Button ml="50%" colorScheme={"blue"} onClick={() => generatePDF(proyecto._id)}>Generar PDF del proyecto</Button>
            <Heading as="h1" size="2xl" textAlign="center" mt="10">Detalles proyecto: {data.nombre}</Heading>
            <Stack spacing={3} mt={5}>
                <Text fontSize='md' fontWeight="bold">Cliente:</Text>
                <Text fontSize='md'> {clientes.find(cliente => cliente._id === proyecto.cliente)?.nombre || 'No definido'}</Text>
                <Text fontSize='md' fontWeight="bold"> Fecha de inicio:</Text>
                <Text fontSize='md'> {proyecto.fechaInicio}</Text>
                <Text fontSize='md' fontWeight="bold">Fecha de término:</Text>
                <Text fontSize='md'> {proyecto.fechaTermino === "0" ? 'Sin definir' : proyecto.fechaTermino}</Text>
            </Stack>
        <Stack spacing={4} mt={1}>
        <Text fontSize='md' fontWeight="bold"> Materiales asociados al proyecto: {}</Text>
        <Table variant="simple">
                <Thead>
                    <Tr border="2px" borderColor="black.200">
                        <Th textAlign="center">Nombre de los materiales</Th>
                        <Th textAlign="center">Cantidad</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {contentTable()}
                </Tbody>
            </Table>
        </Stack>
        <Text fontSize='md' mt={3} fontWeight="bold"> Documentos asociados al proyecto: {}</Text>
        <Stack spacing={4} mt={5}>
        <Table variant="simple">
                <Thead>
                    <Tr border="2px" borderColor="black.200">
                        <Th textAlign="center">Nombre del Archivo</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {fillTable()}
                </Tbody>
            </Table>
        </Stack>
    </Container>
    </Box>
    </Box>
    )

    };

export default VerDetalles