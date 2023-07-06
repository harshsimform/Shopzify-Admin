import {
	Box,
	Link,
	Popover,
	PopoverTrigger,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/NavItem';

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<div className="nav">
								<Link
									as={ReactRouterLink}
									to={navItem.to}
									p={2}
									fontSize={'sm'}
									fontWeight={500}
									color={linkColor}
									_hover={{
										textDecoration: 'none',
										color: 'teal.400',
									}}
								>
									{navItem.label}
								</Link>
							</div>
						</PopoverTrigger>
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

export default DesktopNav;
