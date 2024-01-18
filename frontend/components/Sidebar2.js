import {useState,useEffect} from 'react'
import {useRouter } from 'next/router'
import {Box, IconButton,Button,Collapse,Stack ,Text,Flex} from '@chakra-ui/react';
import {HamburgerIcon} from '@chakra-ui/icons';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

      // Set the value received from the local storage to a local state
      const [nombreUsuario, setnombreUsuario] = useState("")
    
      useEffect(() => {
        let currentLogUser
        // Get the value from local storage if it exists
        currentLogUser = localStorage.getItem('nombreUsuario') || ""
        setnombreUsuario(currentLogUser)
      }, [])

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <Box
        bg="gray.200"
        p="4"
        position="Fixed"
        zIndex={isOpen ? '1' : '0'}
        width={isOpen ? '300px' : '75px'}
        height={isOpen ? '47%' : '75px'}
        transition="width 0.3s, height 0.3s"
        border="2px" borderColor="black.200"
      >
        <IconButton
          aria-label={isOpen ? 'Cerrar barra lateral' : 'Abrir barra lateral'}
          icon={isOpen ? <HamburgerIcon color="gray.200"/> : <HamburgerIcon color="gray.200"/>} 
          position={isOpen ? 'absolute' : 'center'}
          top="4"
          right={isOpen ? '4' : '0'}
          zIndex="2"
          transform={isOpen ? '' : 'rotate(180deg)'}
          onClick={toggleSidebar}
          bg="#121212"
        />
        <Collapse in={isOpen} animateOpacity>
          <div className={isOpen ? '' : 'hidden'}>
            <Stack spacing='24px'>
              <Button colorScheme='green' width='80%' className="sidebar-button" onClick={()=> router.push('/mostrar')}>Ver materiales</Button>
              <Button colorScheme='blue' width='80%' className="sidebar-button" onClick={()=> router.push('/historial')}>Ver historial</Button>
              <Button colorScheme='yellow' width='80%' className="sidebar-button" onClick={()=> router.push('/usuarios/mostrar')}>Ver usuarios</Button>
              <Button colorScheme='purple' width='80%' className="sidebar-button" onClick={()=> router.push('/proyecto/proyecto')}>Ver proyectos</Button>
              <Button colorScheme='orange' width='80%' className="sidebar-button" onClick={()=> router.push('/clientes/mostrar')}>Ver clientes</Button>
            </Stack>

            <Flex marginTop='15%'>
            <Box border="1px" borderColor="gray.200" borderRadius="md" p="2">
              <Text fontSize='100%'>Bienvenido, <Text as="span" style={{textDecoration: "underline"}}>{nombreUsuario}</Text></Text>
            </Box>
              <Button marginLeft='auto' variant='outline' width='25%' colorScheme='red' className="sidebar-button" 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('nombreUsuario');
                    localStorage.removeItem('userType');
                    Cookies.remove('token');
                    router.push('/');}}}>Salir
              </Button>
            </Flex>
          </div>
        </Collapse>
      </Box>
    );
  };


export default Sidebar;
