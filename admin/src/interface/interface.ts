export interface IOption {
  key: string;
  value: string;
}

export interface ProductFormValues {
  _id: string;
  image?: string | undefined;
  name: string;
  discountedPrice: string;
  originalPrice: string;
  description: string;
  quantity: string;
  gender: string;
  category: string;
  status: boolean;
  badge: string;
}

export interface ProductResponse {
  productDetails: ProductFormValues[];
}

export interface UserAuthFormValues {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
}

export interface Props {
  key?: number;
  autoComplete?: string;
  control?: string;
  label?: string;
  name: string;
  options?: { key: string; value: string }[];
  type?: string;
  className?: string;
  placeholder?: string;
  color?: string;
}

export interface TextErrorProps {
  children?: React.ReactNode;
}

export enum InputControlType {
  Input = "input",
  TextArea = "textarea",
  Select = "select",
}

export interface ImageCellProps {
  value: string;
}

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  to: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RefreshResponse {
  token: string;
}

export interface RefreshCredentials {
  refreshToken: string;
}

export interface CartProduct {
  _id?: string;
  productId: string;
  quantity: number;
  discountedPrice: number;
  price: number;
  name: string;
  image: string;
}

export interface cardDetails {
  cardName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface GetCheckoutData {
  _id?: string;
  userId?: string;
  recordDate: string;
  status: string;
  cartItems: CartProduct[];
  summary: {
    totalMrp: number;
    taxCharge: number;
    shippingCharge: number;
    totalAmount: number;
  }[];
  address: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    state: string;
    postalCode: string;
    email: string;
    phone: string;
  }[];
  payment?: cardDetails[];
}

export interface DateParam {
  value: string;
}

export interface ProdTable {
  data: ProductFormValues;
}

export interface OrderSummaryState {
  totalRevenue: number;
  totalCustomers: number;
  totalOrders: number;
}

export interface SubMenuData {
  _id?: string;
  sublabel: string;
  description: string;
}

export interface MenuItemData {
  _id?: string;
  menu: string;
  subMenus?: SubMenuData[];
}

export interface SubMenuComponentProps {
  subMenus: SubMenuData;
  onEdit?: () => void;
  onDelete?: () => void;
}
