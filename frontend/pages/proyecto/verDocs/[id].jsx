import {useState,useRef,useEffect} from 'react'
import {useRouter} from 'next/router'
import { Container,Stack, Button,Table,Thead,Tr,Th,Tbody,Td,Heading,Box,Flex,HStack,Input} from '@chakra-ui/react'
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

const VerDocs = ({ data }) => {

    const [proyecto, setProyecto] = useState(data);
    const router = useRouter()
    const { id } = router.query

    const [clientes, setClientes] = useState([{
      nombre: '',
      numero: '',
      mail: '',
      estadoCliente: ''
    }])

    let styles = {
      title: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
      }
    };

    //Inicio de bloque de PDF al backend
    const fileInput = useRef(null);

    const handleSubmit = async (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];

    if (file) {
        console.log('Intentando subir el archivo:', file);
        try {
            const response = await uploadPdf(file,""+proyecto._id+"-"+proyecto.nombre+"");
            //console.log('Archivo subido con éxito:', response);
            await new Promise((resolve) => setTimeout(resolve,  500));
        Swal.fire({
          title: 'Archivo subido correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          router.reload();
        });
        } catch (error) {
            console.error('Hubo un problema al subir el archivo:', error);
        }
    } else {
        alert('Por favor, selecciona un archivo antes de continuar.');
    }
    };
    //fin de bloque de PDF al backend

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
              //Info proyecto
              'Proyecto: ' + proyectoActual.data.nombre,
              'Cliente: ' + clienteActual.nombre,
              'Fecha de inicio: ' + proyectoActual.data.fechaInicio,
              'Fecha de termino: '+ proyectoActual.data.fechaTermino,
              '\n',
              //Info materiales proyecto
              {
                  style: 'tableExample',
                  table: {
                      body: [['Nombre del material', 'Cantidad']].concat(cuerpoTabla)
                  }
              }
          ]
      };

      pdfMake.createPdf(docDefinition).download('Informe proyecto ' + proyectoActual.data.nombre);
  }
    //Fin del bloque de PDF del proyecto

    // Función para descargar el archivo PDF
    const downloadPdf = (file) => {
        const baseUrl = process.env.SERVIDOR.replace('/api', '');
        const url = `${baseUrl}/PDF/${proyecto._id+"-"+proyecto.nombre}/${file}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = file;
        // Asegúrate de que el enlace esté en el DOM antes de hacer clic en él
        document.body.appendChild(link);
        link.click();
        // Elimina el enlace del DOM después de hacer clic en él
        document.body.removeChild(link);
      };
      

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
        <Td border="2px">
            <HStack spacing={2}>
                <Button style={{ padding: '4px  8px' }} colorScheme="orange" onClick={() => downloadPdf(file)}>Descargar PDF</Button>
            </HStack>
        </Td>
      </Tr>
    ));
  };
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
            <Heading as="h1" size="2xl" textAlign="center" mt="10">Documentos proyecto: {data.nombre}</Heading>
            <Flex direction="row" align="center" mt="5%"> 
                <Button colorScheme="red" onClick={()=> router.push('../proyecto')}>Atras</Button>
                <Input border="none" type="file" ref={fileInput} accept=".pdf"/>
                <Button colorScheme="green" type="submit" onClick={handleSubmit}>Subir PDF</Button>
            </Flex>
                <Button mt="1%"style={{padding: '4px  8px' }} colorScheme={"blue"} onClick={() => generatePDF(proyecto._id)}>Generar PDF</Button>
        <Stack spacing={4} mt={5}>
        <Table variant="simple">
                <Thead>
                    <Tr border="2px" borderColor="black.200">
                      <Th textAlign="center">Nombre del Archivo</Th>
                      <Th textAlign="center" border="2px">Acciones</Th>
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

export default VerDocs