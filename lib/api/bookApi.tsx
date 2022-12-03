import { BookingType } from "../../interface/bookingType";

const serverURI = process.env.NEXT_PUBLIC_SERVER_URI;

const postOption = {
    method: 'POST',
    headers: { 
        "Content-type": "application/json",
        "Accept": "application/json"
    },
}

export async function creatAndUpdateBooking(doc: BookingType) {
    console.log('updateData', doc)
    const {checkin, checkout} = doc;
    const checkinStr: string = checkin!.toLocaleString().slice(0, 12)
    const checkoutStr: string = checkout!.toLocaleString().slice(0, 12)
    console.log(checkinStr, checkoutStr)
    let endPoint = serverURI + '/api/book/creatAndUpdateBooking';
    const response = await fetch(endPoint, {
        ...postOption,
        body: JSON.stringify({
            ...doc,
            checkin: new Date(checkinStr).toLocaleDateString(),
            checkout: new Date(checkoutStr).toLocaleDateString()
        })
    });
    const data = await response.json();
    return data;
}

export async function getBookingData(doc?: any) {
    let endPoint = serverURI + '/api/book/getBookingData';
    if(typeof doc == 'string') {
        endPoint += `?id=${doc}`
    }else if (Object.keys(doc).includes('guestId')) {
        endPoint += `?guestId=${doc.guestId}`
    }
    const response = await fetch(endPoint);
    const data = await response.json();
    return data
}

// export async function getValid(doc: any) {
//     let endPoint = serverURI + '/api/book/valid';
//     console.log(doc)
//     const response = await fetch(endPoint, {
//         method: "POST",
//         body: JSON.stringify({
//         productId: doc.productId,
//         checkin: doc.checkin,
//         checkout: doc.checkout,
//         }),
//         headers: { "Content-type": "application/json" },
//     });
//     return response;
// }