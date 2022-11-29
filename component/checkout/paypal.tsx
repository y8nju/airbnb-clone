import { Dispatch, SetStateAction, useContext } from "react";
import { BookingType, PopulateBookingType } from "../../interface/bookingType";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Types } from "mongoose";
import { Grid } from "@mui/material";
import { creatAndUpdateBooking, getBookingData } from "../../lib/api/bookApi";
import { BookingContext } from "../../context/bookingContext";

interface Props {
    data: PopulateBookingType;
    paymentUpdate: Dispatch<SetStateAction<boolean>>
}

export default function Paypal (props: Props) {
    const {data, paymentUpdate} = props
	const {checkin, checkout, productId, _id: bookingId} = data;
    const bookingCtx = useContext(BookingContext);
    const { updateData, bookingData, updateSavedData } = bookingCtx!
    
    console.log('productId', productId._id)
    
    return ( <Grid item style={{ width: '50%'}}>
        <PayPalScriptProvider
            options={{
                "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
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
                const response = await getBookingData(bookingId.toString());
                console.log('valid.response', response)
                if (response.result) {
                    const authorized = await actions.order?.authorize();
                    console.log('authorized', authorized);
                    const payment = {
                        source: "paypal",
                        orderId: data.orderID,
                        payerId: data.payerID as string,
                        paidTime: authorized?.create_time as any,
                    }
                    const body: BookingType = {
                        ...bookingData,
                        _id: bookingId,
                        productId: new Types.ObjectId(productId._id),
                        payment: payment
                    };
                    const rst = await creatAndUpdateBooking(body);
                    console.log('rst', rst)
                    if(rst.result) {
                        updateSavedData();
                        paymentUpdate(false);
                        updateData({payment: payment});
                    }
                }
                }}
            />
        </PayPalScriptProvider>
    </Grid> )
}