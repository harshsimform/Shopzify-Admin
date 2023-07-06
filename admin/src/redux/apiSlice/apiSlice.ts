import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetCheckoutData,
  LoginCredentials,
  LoginResponse,
  MenuItemData,
  ProductFormValues,
  ProductResponse,
  RefreshCredentials,
  RefreshResponse,
  SubMenuData,
} from "../../interface/interface";
import { setLoggedIn, setLoggedOut } from "../authSlice/authSlice";
import { RootState } from "../store";

const environment = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: environment.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Content-type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // send refresh token to get new access token

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      // store the new token
      const { accessToken } = refreshResult.data as LoginResponse;
      api.dispatch(setLoggedIn(accessToken));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLoggedOut());
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Checkout", "Navbar"],
  endpoints: (builder) => ({}),
});

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductData: builder.query<ProductResponse, void>({
      query: () => "/product/admin/products",
      providesTags: ["Product"],
    }),
    addProductData: builder.mutation<void, ProductFormValues>({
      query: (productData) => ({
        url: "/product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<void, Partial<ProductFormValues>>({
      query: (product) => ({
        url: `product/${product._id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getCheckout: builder.query<GetCheckoutData[], void>({
      query: () => "/user-checkout/admin/checkouts",
      providesTags: ["Checkout"],
    }),
    updateCheckoutStatus: builder.mutation<
      void,
      { checkoutId: string; stepIndex: number }
    >({
      query: ({ checkoutId, stepIndex }) => ({
        url: `/user-checkout/admin/checkout/${checkoutId}/status`,
        method: "PATCH",
        body: { stepIndex },
      }),
      invalidatesTags: ["Checkout"],
    }),
    getOrderById: builder.query({
      query: (orderId) => `/user-checkout/order/${orderId}`,
      providesTags: ["Checkout"],
    }),
    getMenuItems: builder.query<MenuItemData[], void>({
      query: () => "/nav-menu/menus",
      providesTags: ["Navbar"],
    }),
    addMenuItem: builder.mutation<MenuItemData, string>({
      query: (menu) => ({
        url: "/nav-menu/add/menu",
        method: "POST",
        body: { menu },
      }),
      invalidatesTags: ["Navbar"],
    }),
    addSubMenu: builder.mutation<
      MenuItemData,
      { menuId: string; subMenus: SubMenuData[] }
    >({
      query: ({ menuId, subMenus }) => ({
        url: "nav-menu/add/submenu",
        method: "POST",
        body: { menuId, subMenus },
      }),
      invalidatesTags: ["Navbar"],
    }),
    editMenuItem: builder.mutation<MenuItemData, { id: string; menu: string }>({
      query: ({ id, menu }) => ({
        url: `nav-menu/menu/${id}`,
        method: "PATCH",
        body: { menu },
      }),
      invalidatesTags: ["Navbar"],
    }),
    updateMenuItem: builder.mutation<
      MenuItemData,
      { id: string; menu: string }
    >({
      query: ({ id, ...menuItem }) => ({
        url: `/nav-menu/menu/${id}`,
        method: "PATCH",
        body: menuItem,
      }),
      invalidatesTags: ["Navbar"],
    }),
    updateSubMenu: builder.mutation<
      MenuItemData,
      { subMenuId: string; newData: SubMenuData }
    >({
      query: ({ subMenuId, newData }) => ({
        url: `/nav-menu/submenu/${subMenuId}`,
        method: "PATCH",
        body: newData,
      }),
      invalidatesTags: ["Navbar"],
    }),
    deleteMenuItem: builder.mutation<MenuItemData, string>({
      query: (id) => ({
        url: `/nav-menu/menus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Navbar"],
    }),
    deleteSubMenu: builder.mutation<MenuItemData, string>({
      query: (subMenuId) => ({
        url: `/nav-menu/submenu/${subMenuId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Navbar"],
    }),
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, RefreshCredentials>({
      query: (credentials) => ({
        url: "/auth/refresh",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProductDataQuery,
  useAddProductDataMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCheckoutQuery,
  useGetOrderByIdQuery,
  useGetMenuItemsQuery,
  useAddMenuItemMutation,
  useAddSubMenuMutation,
  useEditMenuItemMutation,
  useUpdateSubMenuMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useDeleteSubMenuMutation,
  useUpdateCheckoutStatusMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = api;
