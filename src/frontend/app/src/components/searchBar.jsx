import React from "react";
import { InputGroup, Input, InputLeftElement, InputRightAddon, Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {

    return (
        <>
            <InputGroup maxW={{ md: 1000, base: 325 }} borderRadius={5} size="md">
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="gray.600" />}
                />
                <Input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search..." border="1px solid #949494" />
                <InputRightAddon
                    p={0}
                    border="none"
                >
                    <Button size="md" color="white" bg="green.400" onClick={handleSearch} borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494">
                        Search
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </>
    )
};

export default SearchBar;