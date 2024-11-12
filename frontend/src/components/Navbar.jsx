import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={'space-between'}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "26" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    color={colorMode === "light" ? "black" : "white"} // Ensure text is visible in both modes
                >
                    <Link to={"/"}>Product Store</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to="/create">
                        <Button><PlusSquareIcon fontSize={20} /></Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? "🌞" : "🌙"} {/* 🌞 for light mode, 🌙 for dark mode */}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
