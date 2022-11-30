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
    const checkinStr: string = checkin!.toString().slice(0, 10)
    const checkoutStr: string = checkout!.toString().slice(0, 10)
    let endPoint = serverURI + '/api/book/creatAndUpdateBooking';
    const response = await fetch(endPoint, {
        ...postOption,
        body: JSON.stringify({
            ...doc,
            checkin: new Date(checkinStr).toLocaleDateString(),
            checkout: new Date(checkoutStr)!.toLocaleDateString()
        })
    });
    const data = await response.json();
    return data;
}

export async function getBookingData(id?: string) {
    let endPoint = serverURI + '/api/book/getBookingData';
    if(id) {
        endPoint += `?id=${id}`
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