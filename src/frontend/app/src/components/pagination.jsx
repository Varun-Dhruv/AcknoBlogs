import React from 'react';
import { Box, Button, ButtonGroup } from '@chakra-ui/react'; ``
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <Button
                    key={i}
                    variant={currentPage === i ? 'solid' : 'outline'}
                    colorScheme={currentPage === i ? 'green' : 'gray'}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <Box mt={4} w="full" textAlign="center">
            <ButtonGroup spacing={2}>
                {/* Previous Page Button */}
                <Button
                    isDisabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Previous
                </Button>

                {/* Page Buttons */}
                {renderPageButtons()}

                {/* Next Page Button */}
                <Button
                    isDisabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </ButtonGroup>
        </Box>
    );
};
export default Pagination;