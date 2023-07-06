import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useBreakpointValue,
  Heading,
  Flex,
  Image,
  useColorModeValue as mode,
  Text,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { steps } from "../../../constants/orderSteps";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../customComp/FormatCurrency";
import {
  useGetOrderByIdQuery,
  useUpdateCheckoutStatusMutation,
} from "../../../redux/apiSlice/apiSlice";
import { GetCheckoutData } from "../../../interface/interface";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const headingColor = mode("teal.600", "teal.400");
  const textColor = mode("teal.500", "teal.400");
  const textColorGray = mode("gray.600", "gray.400");
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [updateCheckoutStatus] = useUpdateCheckoutStatusMutation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { id } = useParams();
  const { data: orderData } = useGetOrderByIdQuery(id) as {
    data: GetCheckoutData;
  };

  useEffect(() => {
    if (orderData) {
      const stepIndex = steps.findIndex(
        (step) => step.title === orderData.status
      );
      setActiveStepIndex(stepIndex + 1);
    }
  }, [orderData]);

  const handleStepChange = (orderId: string, stepIndex: number) => {
    updateCheckoutStatus({ checkoutId: orderId, stepIndex })
      .unwrap()
      .then(() => {
        setActiveStepIndex(stepIndex + 1);
        // Status updated successfully
      })
      .catch((error) => {
        // Handle error if the status update fails
      });
  };

  return (
    <Box
      marginTop={isScreenFixed ? "6.3rem" : "2rem"}
      width={"90%"}
      mx={"auto"}
    >
      <Box p={5} borderWidth={1} borderRadius={"md"} my={3}>
        <Box>
          <Heading size={"lg"} color={headingColor} userSelect="none">
            Order Id
          </Heading>
          <Text fontSize={"lg"} color="gray.500">
            #{orderData?._id}
          </Text>
        </Box>
      </Box>
      <Box p={5} borderWidth={1} borderRadius={"md"} userSelect="none">
        <Box mb={5}>
          <Heading size={"lg"} color={headingColor}>
            Order Status
          </Heading>
          <Divider my={3} />
        </Box>
        <Stepper
          index={activeStepIndex}
          orientation="vertical"
          height="400px"
          colorScheme={"teal"}
          gap="0"
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              onClick={() => handleStepChange(orderData?._id ?? "", index)}
              style={{ cursor: "pointer" }}
            >
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box p={5} borderWidth={1} borderRadius={"md"} my={3}>
        <Box mb={5}>
          <Heading size={"lg"} color={headingColor}>
            Order Details
          </Heading>
          <Divider my={3} />
        </Box>
        {orderData?.cartItems?.map((prodItem) => (
          <Flex my={3} key={prodItem?._id}>
            <Image src={prodItem.image} boxSize={100} mr={2} borderRadius={4} />
            <Box fontSize={isScreenFixed ? "md" : "sm"}>
              <Text
                fontSize={isScreenFixed ? "md" : "sm"}
                fontWeight="bold"
                mb={1}
                color={textColor}
              >
                {prodItem.name}
              </Text>
              <Text mb={1} color={textColorGray}>
                <b>Price:</b> {formatCurrency(prodItem.discountedPrice)}
              </Text>
              <Text mb={1} color={textColorGray}>
                <b>Quantity: </b>
                {prodItem.quantity}
              </Text>
              <Text mb={1} color={textColorGray}>
                <b>Subtotal:</b> {formatCurrency(prodItem.price)}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
      <Box p={5} borderWidth={1} borderRadius={"md"} my={3}>
        <Box mb={5}>
          <Heading size={"lg"} color={headingColor}>
            Shipping Details
          </Heading>
          <Divider my={3} />
        </Box>
        {orderData?.address.map((addressItem, ind) => (
          <Box color={textColorGray} mt={3} key={ind}>
            <Stack justify={"left"} fontSize={isScreenFixed ? "md" : "sm"}>
              <Flex>
                <Text fontWeight={"bold"}>Name:</Text>
                <Text ml={1}>
                  {addressItem.firstName} {addressItem.lastName}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight={"bold"}>Address:</Text>
                <Text ml={1}>
                  {addressItem.address}, {addressItem.city}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight={"bold"}>State:</Text>
                <Text ml={1}>{addressItem.state}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={"bold"}>Country:</Text>
                <Text ml={1}>{addressItem.country}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={"bold"}>Email:</Text>
                <Text ml={1}>{addressItem.email}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={"bold"}>Phone:</Text>
                <Text ml={1}>{addressItem.phone}</Text>
              </Flex>
            </Stack>
          </Box>
        ))}
      </Box>
      <Box p={5} borderWidth={1} borderRadius={"md"} my={3}>
        <Box mb={5}>
          <Heading size={"lg"} color={headingColor}>
            Order Summary
          </Heading>
          <Divider my={3} />
        </Box>
        {orderData?.summary.map((summaryItem) => (
          <Box
            color={textColorGray}
            mt={3}
            key={orderData?._id}
            fontSize={isScreenFixed ? "md" : "sm"}
          >
            <Flex my={1} justify="space-between">
              <Text>Total MRP</Text>
              <Text color={textColor} ml={1}>
                {formatCurrency(summaryItem.totalMrp)}
              </Text>
            </Flex>
            <Flex my={1} justify="space-between">
              <Text>Tax Charge</Text>
              <Text color={textColor} ml={1}>
                +{formatCurrency(summaryItem.taxCharge)}
              </Text>
            </Flex>
            <Flex my={1} justify="space-between">
              <Text>Shipping Charge</Text>
              <Text color={textColor} ml={1}>
                +{formatCurrency(summaryItem.shippingCharge)}
              </Text>
            </Flex>
            <Divider />
            <Flex my={1} fontSize={"lg"} justify="space-between">
              <Text fontWeight={"bold"}> Total Amount</Text>
              <Text color={textColor} ml={1}>
                {formatCurrency(summaryItem.totalAmount)}
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OrderDetails;
