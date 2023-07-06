import { Box } from "@chakra-ui/react";
import OrderSummary from "./InsightPages/OrderSummary";
import ProductsSummary from "./InsightPages/ProductsSummary";

const Home = () => {
  return (
    <>
      <Box position={"relative"}>
        <OrderSummary />
        <ProductsSummary />
      </Box>
    </>
  );
};

export default Home;
