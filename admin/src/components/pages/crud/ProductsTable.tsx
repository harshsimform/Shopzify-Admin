import {
  Box,
  useColorMode,
  Center,
  Link,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Switch,
  FormControl,
} from "@chakra-ui/react";
import {
  ProductFormValues,
  ImageCellProps,
  DateParam,
  ProdTable,
} from "../../../interface/interface";
import { FiEdit } from "react-icons/fi";
import { DeleteIcon } from "@chakra-ui/icons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

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

interface ProductsTableProps {
  rowData: ProductFormValues[];
  handleEdit: (product: ProductFormValues) => void;
  handleDelete: (productId: string) => void;
  isProductDeleteLoading: string;
  handleToggleStatus: (product: ProductFormValues) => void;
}

const ProductsTable = ({
  rowData,
  handleEdit,
  handleDelete,
  handleToggleStatus,
  isProductDeleteLoading,
}: ProductsTableProps) => {
  const { colorMode } = useColorMode();

  const handleEditClick = (product: ProductFormValues) => {
    handleEdit(product);
  };

  const handleDeleteClick = (productId: string) => {
    handleDelete(productId);
  };

  const [columnDefs] = useState([
    { field: "_id", headerName: "Product Id" },
    { field: "image", headerName: "Product Image", cellRenderer: ImageCell },
    { field: "name", headerName: "Product Name" },
    {
      field: "recordDate",
      cellRenderer: function DateCellRenderer(params: DateParam) {
        const formattedDate = new Date(params.value).toLocaleString("en-IN");
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: ProdTable) => (
        <FormControl key={params.data._id}>
          <Switch
            key={params.data._id}
            size="md"
            colorScheme="teal"
            isChecked={params.data.status}
            onChange={() => handleToggleStatus(params.data)}
          />
        </FormControl>
      ),
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: ProdTable) => (
        <>
          <IconButton
            size="xs"
            fontSize="1rem"
            aria-label="edit"
            icon={<FiEdit />}
            onClick={() => handleEditClick(params.data)}
            bgColor={"transparent"}
            _hover={{
              bgColor: "transparent",
            }}
          ></IconButton>
          <IconButton
            size="xs"
            ml={4}
            fontSize="1rem"
            aria-label="delete"
            icon={<DeleteIcon />}
            color="red.500"
            bgColor={"transparent"}
            _hover={{
              bgColor: "transparent",
            }}
            onClick={() => handleDeleteClick(params.data._id)}
            isLoading={isProductDeleteLoading === params.data._id}
          ></IconButton>
        </>
      ),
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
      <Center>
        <Box
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

export default ProductsTable;
