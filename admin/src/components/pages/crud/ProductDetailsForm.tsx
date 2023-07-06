import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikControl from "../../formik/FormikControl";
import { ProductFormValues } from "../../../interface/interface";
import {
  Box,
  Button,
  Flex,
  HStack,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import FileInput from "../../formik/FileInput";
import { useState } from "react";
import {
  badge,
  initialValue,
  productGender,
} from "../../../constants/constants";
import { useAddProductDataMutation } from "../../../redux/apiSlice/apiSlice";

export const validationSchema = Yup.object({
  image: Yup.string().required("Image is required"),
  name: Yup.string().trim().required("Required"),
  description: Yup.string()
    .trim()
    .required("Required")
    .min(30, "Description at least be 30 characters long"),
  gender: Yup.string().required("Required"),
  badge: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  quantity: Yup.string()
    .required("Required")
    .test("is-positive", "Quantity must be greater than 0", (value) => {
      return parseInt(value) > 0;
    }),
  discountedPrice: Yup.string()
    .required("Required")
    .test("is-positive", "Price must be greater than 0", (value) => {
      return parseInt(value) > 0;
    }),
  originalPrice: Yup.number()
    .required("Required")
    .moreThan(
      Yup.ref("discountedPrice"),
      "Original price must be greater than discounted price"
    ),
});

const ProductDetailsForm = () => {
  const submitMenuBgColor = useColorModeValue("teal.400", "teal.600");
  const resetMenuBgColor = useColorModeValue("red.400", "red.600");
  const imageBorderColor = useColorModeValue("gray.200", "gray.700");
  const toast = useToast();
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  const [addProductData] = useAddProductDataMutation();

  const onSubmit = async (
    values: ProductFormValues,
    onSubmitProps: FormikHelpers<ProductFormValues>
  ) => {
    onSubmitProps.resetForm();
    setResetKey((prevKey) => prevKey + 1);
    try {
      await addProductData(values).unwrap();
      toast({
        title: "New product has been added successfully",
        position: "top",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occurred while adding the product",
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      mx={2}
    >
      <Box
        width={"3xl"}
        boxShadow="lg"
        padding={4}
        borderWidth="1px"
        borderRadius="lg"
      >
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <VStack
                display={"flex"}
                justifyContent="center"
                textAlign={"center"}
              >
                <FileInput
                  label="+ Add Product Image"
                  name="image"
                  key={resetKey}
                />
              </VStack>
              <FormikControl
                control="input"
                type="text"
                label="Product Name"
                name="name"
                placeholder="Please enter product name"
              />
              <FormikControl
                control="input"
                type="number"
                label="Product Discounted Price"
                name="discountedPrice"
                placeholder="Please enter product discounted price"
              />
              <FormikControl
                control="input"
                type="number"
                label="Product Original Price"
                name="originalPrice"
                placeholder="Please enter product actual price"
              />
              <FormikControl
                control="textarea"
                label="Product Description"
                name="description"
                placeholder="Please enter product description"
              />
              <FormikControl
                control="input"
                type="number"
                label="Available Quantity"
                name="quantity"
                placeholder="Please enter available product quantity"
              />
              <FormikControl
                control="select"
                label="Select Gender"
                name="gender"
                options={productGender}
              />
              <FormikControl
                control="select"
                label="Select Badge"
                name="badge"
                options={badge}
              />
              <FormikControl
                control="input"
                label="Product Category"
                name="category"
                placeholder="please enter product category name"
              />
              <Box textAlign="left">
                <Button
                  type="submit"
                  colorScheme="teal"
                  color="white"
                  bgColor={submitMenuBgColor}
                  marginY={4}
                  _hover={{
                    bgColor: "teal.500",
                  }}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  colorScheme="red"
                  color="white"
                  bgColor={resetMenuBgColor}
                  marginY={4}
                  marginX={2}
                  onClick={handleReset}
                  _hover={{
                    bgColor: "red.500",
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default ProductDetailsForm;
