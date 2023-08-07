import {
Box,
Drawer,
DrawerContent,
DrawerOverlay,
Flex,
Icon,
Text,
useDisclosure,
Container,
useMediaQuery,
} from "@chakra-ui/react";
import { FaClipboardCheck } from "react-icons/fa";
import { HiCollection } from "react-icons/hi";
import { MdHome, MdLogout, MdCalendarToday, MdPeople } from "react-icons/md";
import React from "react";
import { useRouter } from "next/router";

//const colorTexto = useColorModeValue('red', 'blue');

export default function Sidebar({ tipo }){
const sidebar = useDisclosure();

const router = useRouter()

const NavItem = (props) => {
    const { icon, children, ...rest } = props;

return (
<Flex align="center" px="4" mx="2" rounded="md" py="3" cursor="pointer"  _hover={{
            bg: "blackAlpha.300",
            
          }} role="group" fontWeight="semibold" transition=".15s ease" {...rest}>
    {icon && (
    <Icon mr="2" boxSize="4" _groupHover={{
                color: "blue",
              }} as={icon} />
    )}
    {children}
</Flex>
);
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    return router.push('/');
    
}


const SidebarContent = (props) => {

let userType = localStorage.getItem('userType')

if(userType == 0) // ADMIN
return(
    
<Box as="nav" pos="fixed" top="0" left="0" zIndex="sticky" h="full" pb="10" overflowX="hidden" overflowY="auto"
    bg="brand.600" borderColor="blackAlpha.300" borderRightWidth="1px" w="60" {...props}>
    <Flex px="4" py="5" align="center">

        <Text fontSize="2xl" ml="2"  fontWeight="semibold">
            Administrador
        </Text>
    </Flex>
    <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
        <NavItem icon={MdHome} onClick={() => router.push('/admin/dashboard') }>Home</NavItem>
        <NavItem icon={MdCalendarToday} onClick={() => router.push('/turnos/administracionTurnos')}>Turnos</NavItem>
        <NavItem icon={HiCollection} onClick={() => router.push('/novedades/novedad')}>Novedades</NavItem>
        <NavItem icon={MdPeople} onClick={()=> router.push('/usuarios/mostrar')}>Empleados</NavItem>
        <NavItem icon={FaClipboardCheck} onClick={()=> router.push(`/usuarios/perfil/${localStorage.getItem('token')}`)}>Perfil</NavItem>
        <NavItem icon={MdLogout} onClick={logout}>Logout</NavItem>
    </Flex>
</Box>
)

else if(userType == 1) // CONSERJE
return(

<Box as="nav" pos="fixed" top="0" left="0" zIndex="sticky" h="full" pb="10" overflowX="hidden" overflowY="auto"
bg="brand.600" borderColor="blackAlpha.300" borderRightWidth="1px" w="60" {...props}>
<Flex px="4" py="5" align="center">

    <Text fontSize="2xl" ml="2"  fontWeight="semibold">
        Conserje
    </Text>
</Flex>
<Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
    <NavItem icon={MdHome} onClick={() => router.push('/conserje/home') }>Home</NavItem>
    <NavItem icon={MdCalendarToday} onClick={() => router.push('/turnos/conserjeriaTurnos')}>Mis Turnos</NavItem>
    <NavItem icon={HiCollection} onClick={() => router.push('/novedades/misnovedades')}>Mis Novedades</NavItem>
    <NavItem icon={FaClipboardCheck} onClick={()=> router.push(`/usuarios/perfil/${localStorage.getItem('token')}`)}>Perfil</NavItem>
    <NavItem icon={MdLogout} onClick={logout}>Logout</NavItem>
</Flex>
</Box>
)
}

const [isMobile] = useMediaQuery('(max-width: 600px)');

if(!isMobile)
return (
        <Container>
    <SidebarContent display={{ base: "none", md: "unset" }} />
    <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" colorScheme='black'>
        <DrawerOverlay/>
        <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
    </Drawer>
</Container>
);
else
return (
    

    <Container>
<SidebarContent display={{ base: "none", md: "unset" }} />
<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left" colorScheme='black'>
    <DrawerOverlay/>
    <DrawerContent>
        <SidebarContent w="full" borderRight="none" />
    </DrawerContent>
</Drawer>
</Container>
);
};

