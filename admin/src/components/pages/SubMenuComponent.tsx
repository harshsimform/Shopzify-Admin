import {
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Spacer,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { SubMenuComponentProps } from '../../interface/interface';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const SubMenuComponent: React.FC<SubMenuComponentProps> = ({
	subMenus,
	onEdit,
	onDelete,
}) => {
	const labelColor = useColorModeValue('gray.600', 'gray.500');
	return (
		<>
			<HStack key={subMenus._id} width={'100%'}>
				<FormControl isReadOnly>
					<FormLabel>Sub Menu</FormLabel>
					<Input color={labelColor} value={subMenus.sublabel} isReadOnly />
				</FormControl>
				<FormControl isReadOnly>
					<FormLabel>Sub Menu Description</FormLabel>
					<Input color={labelColor} value={subMenus.description} isReadOnly />
				</FormControl>
				<IconButton
					icon={<EditIcon />}
					aria-label="Edit Sub Menu"
					onClick={onEdit}
					variant="unstyled"
				/>
				<IconButton
					icon={<DeleteIcon />}
					aria-label="Delete Sub Menu"
					onClick={onDelete}
					variant="unstyled"
					colorScheme="red"
					color="red.500"
				/>
			</HStack>
		</>
	);
};

export default SubMenuComponent;
