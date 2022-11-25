import { GetServerSideProps } from "next";
import { createContext, ReactNode, useEffect, useState } from "react";
import { BookingType } from "../interface/bookingType";
import { getHostingList } from "../lib/api/propertyApi";
import dbConnect from "../lib/dbConnect";
import dateFns, { addDays } from "date-fns";
import { HostingType } from "../interface/hostingType";

export const BookingContext = createContext<{
    bookingData: BookingType;
    updateData: (frag: BookingType) => void;
    isOpened: boolean;
    openDialog: () => void;
    closeDialog: () => void;
  } | null>(null);

  interface Props {
    children: ReactNode,
    data: HostingType
  }

export function BookingContextProvider(props: Props) {
    const {data} = props;

    const [booking, setBooking] = useState<BookingType | null>(null);
      const [isOpened, setOpened] = useState(false);
      
      const openDialog = () => setOpened(true);
      const closeDialog = () => setOpened(false);
      const updateData = (frag: BookingType) => {
        setBooking((tp) => ({ ...tp, ...frag }));
      };

      useEffect(()=> {
        if(data) {
            setBooking({
                productId: data._id!.toString(),
                checkin: addDays(new Date(), 1),
                checkout: addDays(new Date(), 4),
                numberOfGuests: 1,
                numberOfAdults: 2,
                numberOfChildren: 0,
              })
        }
      }, [])

    return (<>
        {booking !==null && <BookingContext.Provider
            value={{
                bookingData: booking as BookingType,
                updateData: updateData,
                isOpened,
                openDialog,
                closeDialog,
            }}>
            {props.children}
        </BookingContext.Provider>}
    </>)
}