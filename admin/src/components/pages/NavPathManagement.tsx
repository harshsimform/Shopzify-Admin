import React, { useState } from 'react';
import {
	VStack,
	HStack,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	IconButton,
	Grid,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Box,
	Wrap,
	WrapItem,
	useColorModeValue,
	FormErrorMessage,
	Stack,
	Spacer,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
	useAddMenuItemMutation,
	useAddSubMenuMutation,
	useDeleteMenuItemMutation,
	useDeleteSubMenuMutation,
	useEditMenuItemMutation,
	useGetMenuItemsQuery,
	useUpdateSubMenuMutation,
} from '../../redux/apiSlice/apiSlice';
import SubMenuComponent from './SubMenuComponent';
import { MenuItemData, SubMenuData } from '../../interface/interface';

interface SubNav {
	sublabel: string;
	description: string;
}

interface NavItem {
	menu: string;
	subMenus: SubNav[];
}

const NavItemForm: React.FC = () => {
	const { data: navItems } = useGetMenuItemsQuery();

	const [newMenuItem, setNewMenuItem] = useState<NavItem>({
		menu: '',
		subMenus: [],
	});
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedMenuId, setSelectedMenuId] = useState('');
	const [isSubMenuModalOpen, setIsSubMenuModalOpen] = useState(false);
	const [subMenuLabel, setSubMenuLabel] = useState('');
	const [subMenuDescription, setSubMenuDescription] = useState('');
	const [selectedSubMenuId, setSelectedSubMenuId] = useState('');
	const [isEditSubMenuModalOpen, setIsEditSubMenuModalOpen] = useState(false);
	const [editedSubMenuLabel, setEditedSubMenuLabel] = useState('');
	const [editedSubMenuDescription, setEditedSubMenuDescription] = useState('');

	const [errorFields, setErrorFields] = useState<{
		menu: boolean;
		sublabel: boolean;
		description: boolean;
	}>({
		menu: false,
		sublabel: false,
		description: false,
	});
	const [addMenuData] = useAddMenuItemMutation();
	const [addSubMenuData] = useAddSubMenuMutation();
	const handleOpenAddModal = () => {
		setIsAddModalOpen(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
		setErrorFields({ menu: false, sublabel: false, description: false });
	};

	const [selectedMenu, setSelectedMenu] = useState<MenuItemData>();
	const handleOpenEditModal = (menuData: MenuItemData) => {
		const selectedMenuData = navItems?.find(
			(menuItem) => menuItem._id === menuData._id
		);
		setSelectedMenu(selectedMenuData);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setErrorFields({ menu: false, sublabel: false, description: false });
	};

	const handleOpenSubMenuModal = (menuId: string) => {
		setSelectedMenuId(menuId);
		setIsSubMenuModalOpen(true);
		setSubMenuLabel('');
		setSubMenuDescription('');
	};

	const handleCloseSubMenuModal = () => {
		setIsSubMenuModalOpen(false);
		setErrorFields({ menu: false, sublabel: false, description: false });
	};

	const handleCloseEditSubMenuModal = () => {
		setIsEditSubMenuModalOpen(false);
		setEditedSubMenuLabel('');
		setEditedSubMenuDescription('');
		setErrorFields({ menu: false, sublabel: false, description: false });
	};

	const [deleteMenuData] = useDeleteMenuItemMutation();
	const handleDeleteMenuItem = async (menuId: string) => {
		try {
			await deleteMenuData(menuId);
		} catch (err) {
			console.log(err);
		}
	};

	const [editMenuItem] = useEditMenuItemMutation();
	const handleEditMenuItem = async () => {
		if (!selectedMenu?.menu) {
			setErrorFields((prevFields) => ({
				...prevFields,
				menu: true,
			}));
			return;
		}

		try {
			const id = selectedMenu?._id ?? '';
			const menu = selectedMenu?.menu ?? '';

			await editMenuItem({ id, menu });
			setIsEditModalOpen(false);
		} catch (error) {
			console.log(error);
		}

		setIsEditModalOpen(false);
	};

	const handleAddMenuItem = () => {
		if (newMenuItem.menu.trim() === '') {
			setErrorFields({ menu: true, sublabel: true, description: true });
			return;
		}

		addMenuData(newMenuItem.menu);
		setNewMenuItem({ menu: '', subMenus: [] });
		handleCloseAddModal();
	};

	const handleAddSubMenu = async () => {
		if (!subMenuLabel || !subMenuDescription) {
			setErrorFields((prevFields) => ({
				...prevFields,
				sublabel: true,
				description: true,
			}));
			return;
		}

		const subMenu = {
			sublabel: subMenuLabel,
			description: subMenuDescription,
		};
		try {
			await addSubMenuData({
				menuId: selectedMenuId,
				subMenus: [subMenu],
			});
		} catch (err) {
			console.log(err);
		}

		setIsSubMenuModalOpen(false);
		setSubMenuLabel('');
		setSubMenuDescription('');
	};

	const [deleteSubMenu] = useDeleteSubMenuMutation();

	const handleDeleteSubMenu = (subMenuId: string) => {
		deleteSubMenu(subMenuId)
			.unwrap()
			.then((response) => {
				// Handle successful deletion
			})
			.catch((error) => {
				// Handle error
			});
	};

	const [subMenuDataTest, setSubMenuDataTest] = useState({
		sublabel: '',
		description: '',
	});

	const handleOpenEditSubMenuModal = (
		newData: SubMenuData,
		subMenuId: string
	) => {
		setSelectedMenuId(subMenuId);

		setSelectedSubMenuId(subMenuId);

		const { _id, ...subMenuData } = newData;

		setEditedSubMenuLabel(subMenuData.sublabel);
		setEditedSubMenuDescription(subMenuData.description);
		setIsEditSubMenuModalOpen(true);
	};

	const [updateSubMenu] = useUpdateSubMenuMutation();
	const handleUpdateSubMenu = () => {
		let hasError = false;

		if (editedSubMenuLabel.trim() === '') {
			setErrorFields((prevState) => ({ ...prevState, sublabel: true }));
			hasError = true;
		}

		if (editedSubMenuDescription.trim() === '') {
			setErrorFields((prevState) => ({ ...prevState, description: true }));
			hasError = true;
		}

		if (hasError) {
			return;
		}

		const updatedData = {
			sublabel: editedSubMenuLabel,
			description: editedSubMenuDescription,
		};

		updateSubMenu({ subMenuId: selectedSubMenuId, newData: updatedData })
			.unwrap()
			.then((response) => {
				setIsEditSubMenuModalOpen(false);
			})
			.catch((error) => {
				// Handle error
			});
	};

	const labelColor = useColorModeValue('gray.600', 'gray.500');

	return (
		<Stack spacing={4} borderWidth="1px" p={4} mt={'1rem'} maxWidth="750px">
			{navItems?.map((menuItem) => (
				<Box key={menuItem._id} borderWidth="1px" borderRadius="md" p={4}>
					<VStack spacing={4} width="100%">
						<FormControl isReadOnly>
							<HStack>
								<FormLabel mt={'0.5rem'}>Menu Label</FormLabel>
								<Spacer />
								<IconButton
									icon={<EditIcon />}
									aria-label="Edit Menu"
									onClick={() => handleOpenEditModal(menuItem)}
									variant="unstyled"
								/>
								<IconButton
									icon={<DeleteIcon />}
									aria-label="Delete Menu"
									onClick={() => handleDeleteMenuItem(menuItem._id ?? '')}
									variant="unstyled"
									colorScheme="red"
									color="red.500"
								/>
							</HStack>
							<Input
								color={labelColor}
								value={menuItem.menu}
								onChange={(e) =>
									setNewMenuItem({
										...newMenuItem,
										menu: e.target.value,
									})
								}
							/>
						</FormControl>
						<HStack spacing={4} width="100%">
							<Spacer />
							<Button
								size="sm"
								leftIcon={<AddIcon />}
								onClick={() => handleOpenSubMenuModal(menuItem._id ?? '')}
							>
								Add Sub Menu
							</Button>
						</HStack>
						{menuItem?.subMenus?.map((obj) => (
							<SubMenuComponent
								key={obj._id}
								subMenus={obj}
								onEdit={() => handleOpenEditSubMenuModal(obj, obj?._id ?? '')}
								onDelete={() => handleDeleteSubMenu(obj?._id ?? '')}
							/>
						))}
					</VStack>
				</Box>
			))}
			<Button
				width="full"
				leftIcon={<AddIcon />}
				onClick={handleOpenAddModal}
				alignSelf="flex-start"
				colorScheme="teal"
			>
				Add New Menu
			</Button>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isEditSubMenuModalOpen}
				onClose={handleCloseEditSubMenuModal}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Sub Menu</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack align="start" spacing={4}>
							<FormControl isRequired isInvalid={errorFields.sublabel}>
								<FormLabel>Sub Menu Label</FormLabel>
								<Input
									value={editedSubMenuLabel}
									onChange={(e) => {
										setEditedSubMenuLabel(e.target.value);
										setErrorFields((prevFields) => ({
											...prevFields,
											sublabel: false, // Reset the error validation when typing
										}));
									}}
								/>
								{errorFields.sublabel && (
									<FormHelperText color="red.500">
										Sub Menu Label is required
									</FormHelperText>
								)}
							</FormControl>
							<FormControl isRequired isInvalid={errorFields.description}>
								<FormLabel>Sub Menu Description</FormLabel>
								<Input
									value={editedSubMenuDescription}
									onChange={(e) => {
										setEditedSubMenuDescription(e.target.value);
										setErrorFields((prevFields) => ({
											...prevFields,
											description: false, // Reset the error validation when typing
										}));
									}}
								/>
								{errorFields.description && (
									<FormHelperText color="red.500">
										Sub Menu Description is required
									</FormHelperText>
								)}
							</FormControl>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleUpdateSubMenu}>
							Save
						</Button>
						<Button onClick={handleCloseEditSubMenuModal} ml={2}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isAddModalOpen}
				onClose={handleCloseAddModal}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Menu Item</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack align="start" spacing={4}>
							<FormControl isRequired isInvalid={errorFields.menu}>
								<FormLabel>Menu Label</FormLabel>
								<Input
									value={newMenuItem.menu}
									onChange={(e) =>
										setNewMenuItem({
											...newMenuItem,
											menu: e.target.value,
										})
									}
								/>
								{errorFields.menu && (
									<FormErrorMessage>Menu Label is required</FormErrorMessage>
								)}
							</FormControl>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleAddMenuItem}>
							Save
						</Button>
						<Button onClick={handleCloseAddModal} ml={2}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Menu Item</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack align="start" spacing={4}>
							<FormControl isRequired isInvalid={errorFields.menu}>
								<FormLabel>Menu Label</FormLabel>
								<Input
									value={selectedMenu ? selectedMenu.menu : ''}
									onChange={(e) =>
										setSelectedMenu((prevMenu) => ({
											...prevMenu,
											menu: e.target.value,
										}))
									}
								/>
								{errorFields.menu && (
									<FormHelperText color="red.500">
										Menu Label is required
									</FormHelperText>
								)}
							</FormControl>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleEditMenuItem}>
							Save
						</Button>
						<Button onClick={handleCloseEditModal} ml={2}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal
				closeOnOverlayClick={false}
				isOpen={isSubMenuModalOpen}
				onClose={handleCloseSubMenuModal}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Sub Menu</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack align="start" spacing={4}>
							<FormControl isRequired isInvalid={errorFields.sublabel}>
								<FormLabel>Sub Menu Label</FormLabel>
								<Input
									value={subMenuLabel}
									onChange={(e) => {
										setSubMenuLabel(e.target.value);
										setErrorFields((prevFields) => ({
											...prevFields,
											sublabel: false,
										}));
									}}
								/>
								{errorFields.sublabel && (
									<FormHelperText color="red.500">
										Sub Menu Label is required
									</FormHelperText>
								)}
							</FormControl>
							<FormControl isRequired isInvalid={errorFields.description}>
								<FormLabel>Sub Menu Description</FormLabel>
								<Input
									value={subMenuDescription}
									onChange={(e) => {
										setSubMenuDescription(e.target.value);
										setErrorFields((prevFields) => ({
											...prevFields,
											description: false,
										}));
									}}
								/>
								{errorFields.description && (
									<FormHelperText color="red.500">
										Sub Menu Description is required
									</FormHelperText>
								)}
							</FormControl>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={handleAddSubMenu}>
							Save
						</Button>
						<Button onClick={handleCloseSubMenuModal} ml={2}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Stack>
	);
};

export default NavItemForm;
