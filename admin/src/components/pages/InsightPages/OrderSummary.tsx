import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatArrow,
  StatLabel,
  StatNumber,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaUsers, FaMoneyBillAlt, FaBoxOpen } from "react-icons/fa";
import {
  selectTotalOrders,
  selectTotalRevenue,
  selectTotalCustomers,
} from "../../../redux/orderSummarySlice/orderSummarySlice";
import { useAppSelector } from "../../../redux/store";
import { formatCurrency } from "../../customComp/FormatCurrency";
import OrderSummaryInsights from "./OrderSummaryInsights/OrderSummaryInsights";

interface StatsCardProps {
  title: string;
  stat: number | string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"md"}
      borderWidth={"1px"}
      borderColor={useColorModeValue("gray.200", "gray.600")}
      rounded={"lg"}
      width={"full"}
    >
      <Flex justifyContent={"space-around"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"bold"} fontSize="lg">
            {title}
          </StatLabel>
          <Flex align={"baseline"}>
            <StatArrow type="increase" boxSize={4} />
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Flex>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

const OrderSummary = () => {
  const totalOrders = useAppSelector(selectTotalOrders);
  const totalCustomers = useAppSelector(selectTotalCustomers);
  const totalRevenue = useAppSelector(selectTotalRevenue);
  const headingColor = useColorModeValue("teal.400", "teal.500");
  const isScreenFixed = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box mt={isScreenFixed ? "5.5rem" : "2rem"} mx="auto" width={"90%"}>
        <Heading textAlign="left" colorScheme={"teal"} color={headingColor}>
          Orders Summary
        </Heading>
        <Box mx={"auto"} pt={5}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"Total Customers"}
              stat={totalCustomers}
              icon={<FaUsers size={"3em"} />}
            />
            <StatsCard
              title={"Total Revenue"}
              stat={formatCurrency(totalRevenue)}
              icon={<FaMoneyBillAlt size={"3em"} />}
            />
            <StatsCard
              title={"Total Orders"}
              stat={totalOrders}
              icon={<FaBoxOpen size={"3em"} />}
            />
          </SimpleGrid>
        </Box>
        <OrderSummaryInsights />
      </Box>
    </>
  );
};

export default OrderSummary;
