import React, { useMemo } from "react";
import {
  Box,
  Center,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";
import {
  DateParam,
  ImageCellProps,
  ProductFormValues,
} from "../../../interface/interface";
import { useGetProductDataQuery } from "../../../redux/apiSlice/apiSlice";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ImageCell: React.FC<ImageCellProps> = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Link
        onClick={handleClick}
        color="blue.500"
        _hover={{ textDecoration: "none" }}
      >
        View Image
      </Link>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent boxSize={"15rem"}>
          <ModalBody p={0}>
            <ModalCloseButton color={"gray.500"} />
            <Image
              src={value}
              alt="Product Image"
              width={"15rem"}
              height={"15rem"}
              borderRadius={"lg"}
              objectFit="fill"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const ProductsSummary = () => {
  const { colorMode } = useColorMode();
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const headingColor = useColorModeValue("teal.400", "teal.500");

  const { data: productData } = useGetProductDataQuery();

  const [rowData, setRowData] = useState<ProductFormValues[]>([]);
  useEffect(() => {
    if (productData) {
      setRowData(productData.productDetails);
    }
  }, [productData]);

  const [columnDefs] = useState([
    { field: "_id", headerName: "Product Id" },
    { field: "name" },
    { headerName: "Image", field: "image", cellRenderer: ImageCell },
    { field: "description" },
    { field: "discountedPrice", headerName: "Sell Price" },
    { field: "originalPrice" },
    { field: "gender" },
    { field: "category" },
    {
      field: "recordDate",
      cellRenderer: function DateCellRenderer(params: DateParam) {
        const formattedDate = new Date(params.value).toLocaleString("en-IN");
        return <span>{formattedDate}</span>;
      },
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  return (
    <>
      <Box
        marginX={4}
        marginTop={isScreenFixed ? "2.5rem" : "2rem"}
        mx="auto"
        width={"90%"}
      >
        <Heading textAlign="left" colorScheme={"teal"} color={headingColor}>
          Total Products
        </Heading>
      </Box>
      <Center>
        <Box
          mt={5}
          className={
            colorMode === "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark"
          }
          style={{ height: "40.3rem", width: "90%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            defaultColDef={defaultColDef}
            enableCellTextSelection={true}
            pagination={true}
            paginationPageSize={13}
          />
        </Box>
      </Center>
    </>
  );
};

export default ProductsSummary;
