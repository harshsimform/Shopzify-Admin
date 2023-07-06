import { IOption, ProductFormValues } from '../interface/interface';

export const productGender: IOption[] = [
	{ key: 'Select gender', value: '' },
	{ key: 'Male', value: 'male' },
	{ key: 'Female', value: 'female' },
	{ key: 'Both', value: 'both' },
];

export const badge: IOption[] = [
	{ key: 'Select Badge', value: '' },
	{ key: 'Top', value: 'top' },
	{ key: 'Sale', value: 'sale' },
	{ key: 'Trending', value: 'trending' },
];

export const initialValue: ProductFormValues = {
	_id: '',
	image: '',
	name: '',
	originalPrice: '',
	discountedPrice: '',
	description: '',
	quantity: '',
	gender: '',
	category: '',
	status: true,
	badge: '',
};
