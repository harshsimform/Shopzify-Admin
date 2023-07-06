import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Stack,
	Text,
	useDisclosure,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Center,
	Divider,
} from '@chakra-ui/react';
import { ProductFormValues } from '../../../interface/interface';
import ProductsTable from './ProductsTable';

import { Form, Formik, FormikHelpers } from 'formik';
import FormikControl from '../../formik/FormikControl';
import FileInput from '../../formik/FileInput';
import {
	badge,
	initialValue,
	productGender,
} from '../../../constants/constants';
import { validationSchema } from './ProductDetailsForm';
import {
	useDeleteProductMutation,
	useGetProductDataQuery,
	useUpdateProductMutation,
} from '../../../redux/apiSlice/apiSlice';

const ProductCrudManagement = () => {
	const [rowData, setRowData] = useState<ProductFormValues[]>([]);
	const [selectedProduct, setSelectedProduct] =
		useState<ProductFormValues>(initialValue);
	const [isProductUpdateLoading, setIsProductUpdateLoading] = useState(false);
	const [isProductDeleteLoading, setIsProductDeleteLoading] = useState('');
	const [isProductEditing, setIsProductEditing] = useState(false);
	const toast = useToast();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data: productData, isLoading } = useGetProductDataQuery();
	const [updateProductMutation] = useUpdateProductMutation();
	const [deleteProductMutation] = useDeleteProductMutation();

	const initialValues: ProductFormValues = {
		_id: selectedProduct._id || '',
		name: selectedProduct.name || '',
		image: selectedProduct.image || '',
		discountedPrice: selectedProduct.discountedPrice || '',
		originalPrice: selectedProduct.originalPrice || '',
		description: selectedProduct.description || '',
		quantity: selectedProduct.quantity || '',
		gender: selectedProduct.gender || '',
		category: selectedProduct.category || '',
		status: selectedProduct.status || true,
		badge: selectedProduct.badge || '',
	};

	useEffect(() => {
		if (productData) {
			setRowData(productData.productDetails);
		}
	}, [productData]);

	const handleEdit = (product: ProductFormValues) => {
		onOpen();
		setSelectedProduct(product);
		setIsProductEditing(true);
	};

	const handleUpdate = async (
		values: ProductFormValues,
		onSubmitProps: FormikHelpers<ProductFormValues>
	) => {
		onSubmitProps.resetForm();

		setIsProductUpdateLoading(true);
		try {
			await updateProductMutation({ ...values, _id: selectedProduct._id });
			setIsProductEditing(false);
			setSelectedProduct(initialValue);
			toast({
				title: 'Product updated successfully',
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		} catch (error) {
			console.error('Error updating product:', error);
			toast({
				title: 'Error updating product',
				description: 'An error occurred while updating the product.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		}
		setIsProductUpdateLoading(false);
	};

	const handleDelete = async (productId: string) => {
		setIsProductDeleteLoading(productId);
		try {
			await deleteProductMutation(productId);
			toast({
				title: 'Product deleted successfully',
				status: 'warning',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		} catch (error) {
			console.error('Error deleting product:', error);
			toast({
				title: 'Error deleting product',
				description: 'An error occurred while deleting the product.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		}
		setIsProductDeleteLoading('');
	};

	const handleToggleStatus = async (product: ProductFormValues) => {
		try {
			const updatedProduct = { ...product, status: !product.status };
			await updateProductMutation(updatedProduct);
		} catch (error) {
			console.error('Error updating product status:', error);
			toast({
				title: 'Error updating product status',
				description: 'An error occurred while updating the product status.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	return (
		<>
			<Box width="90%" mx="auto" my="5">
				{productData?.productDetails.length === 0 ? (
					<Center>
						<Text fontSize="xl">No products found.</Text>
					</Center>
				) : (
					<Stack>
						<ProductsTable
							rowData={rowData}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
							isProductDeleteLoading={isProductDeleteLoading}
							handleToggleStatus={handleToggleStatus}
						/>
					</Stack>
				)}
				{isProductEditing && (
					<Modal
						closeOnOverlayClick={false}
						isOpen={isOpen}
						onClose={onClose}
						scrollBehavior="inside"
					>
						<ModalOverlay />
						<ModalContent mx="5">
							<ModalHeader>Update Product</ModalHeader>
							<Divider />
							<ModalCloseButton onClick={() => setIsProductEditing(false)} />
							<ModalBody pb={6}>
								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={handleUpdate}
								>
									{(formik) => (
										<>
											<Form>
												<FileInput label="Product Image" name="image" />
												<FormikControl
													control="input"
													type="text"
													label="Product Name"
													autoComplete="true"
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
													label="Select Badge"
													name="badge"
													options={badge}
												/>

												<FormikControl
													control="select"
													label="Select Gender"
													name="gender"
													options={productGender}
												/>
												<FormikControl
													control="input"
													label="Product Category"
													name="category"
													placeholder="please enter product category name"
												/>
												<ModalFooter mt={5}>
													<Button
														colorScheme="blue"
														mr={3}
														type="submit"
														isLoading={isProductUpdateLoading}
														loadingText="Updating"
													>
														Save
													</Button>
													<Button onClick={() => setIsProductEditing(false)}>
														Cancel
													</Button>
												</ModalFooter>
											</Form>
										</>
									)}
								</Formik>
							</ModalBody>
						</ModalContent>
					</Modal>
				)}
			</Box>
		</>
	);
};

export default ProductCrudManagement;
