import { BookingType, PopulateBookingType } from "../../interface/bookingType";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { Types } from "mongoose";
import { Grid } from "@mui/material";

export default function Paypal ({ bookingData }: { bookingData: PopulateBookingType }) {
    const router = useRouter();
	const {checkin, checkout, productId} = bookingData;
    
    return ( <Grid item style={{ width: '50%'}}>
<PayPalScriptProvider
    options={{
        "client-id":
        "AVTyQus3P9HuTMJDKIycDpf9pnbilUM4Gpplrg2VPtKdy864C0bMI79w5RodiNCSh7f_R4dBY0VPCoFK",
        intent: "authorize",
    }}
    >
    <PayPalButtons
        style={{ layout: "horizontal", tagline: false }}
        createOrder={(data, actions) => {
        return actions.order
            .create({
            purchase_units: [
                {
                description: "숙소 예약금",
                amount: {
                    value: "111",
                },
                },
            ],
            })
            .then((orderId) => {
            console.log("orderId == ", orderId);
            return orderId;
            });
        }}
        onApprove={async (data, actions) => {
        console.log("결제 완료 후");
        console.log(data);
        const response = await fetch("/api/book/valid", {
            method: "POST",
            body: JSON.stringify({
            productId: productId,
            checkin: checkin,
            checkout: checkout,
            }),
            headers: { "Content-type": "application/json" },
        });
        if (response.status === 200) {
            const authorized = await actions.order?.authorize();
            console.log(authorized);

            const body: BookingType = {
            ...bookingData,
            productId: new Types.ObjectId(bookingData.productId._id),
            payment: {
                source: "paypal",
                orderId: data.orderID,
                payerId: data.payerID as string,
                paidTime: authorized?.create_time as any,
            },
            };
            const response = await fetch("/api/book/checkout", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json" },
            });
            console.log(response.status);
            const json = await response.json();
        }
        }}
    />
    </PayPalScriptProvider>
    </Grid> )
}