import { useEffect } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { useGetCheckoutQuery } from "../../../../redux/apiSlice/apiSlice";
import { updateOrderSummary } from "../../../../redux/orderSummarySlice/orderSummarySlice";
import { GetCheckoutData } from "../../../../interface/interface";

const OrderSummaryInsights = () => {
  const dispatch = useAppDispatch();
  const { data: orderData } = useGetCheckoutQuery();

  useEffect(() => {
    if (orderData) {
      const totalRevenue = calculateTotalRevenue(orderData);
      const totalCustomers = calculateTotalCustomers(orderData);
      const totalOrders = orderData.length;

      dispatch(
        updateOrderSummary({ totalRevenue, totalCustomers, totalOrders })
      );
    }
  }, [orderData, dispatch]);

  const calculateTotalRevenue = (data: GetCheckoutData[]) => {
    const totalRevenue = data.reduce(
      (total, order) =>
        total +
        order.summary.reduce(
          (subtotal, item) => subtotal + item.totalAmount,
          0
        ),
      0
    );

    return totalRevenue;
  };

  const calculateTotalCustomers = (data: GetCheckoutData[]) => {
    const uniqueUsers = new Set(data.map((order) => order.userId));
    const totalCustomers = uniqueUsers.size;

    return totalCustomers;
  };

  return null;
};

export default OrderSummaryInsights;
