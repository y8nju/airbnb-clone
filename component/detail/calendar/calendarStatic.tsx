import { Box, TextField, Button, Grid } from "@mui/material";
import styled from '@mui/material/styles/styled';

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ko from "date-fns/locale/ko";
import { StaticDateRangePicker as MuiStaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useContext, useState } from "react";
import { BookingContext } from "../../../pages/rooms/[roomId]";

export default function CalendarStatic() {
    const bookingCtx = useContext(BookingContext);
    const {bookingData, updateData} = bookingCtx!;

  const value: DateRange<Date> = [
    bookingData.checkin ?? null,
    bookingData.checkout ?? null,
  ];

  return (
    <Grid container width="min-content">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <DateRangePicker
          disablePast
          disableHighlightToday
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={(newValue) => {
            updateData({ checkin: newValue[0] as Date, checkout: newValue[1] as Date });
          }}
          renderInput={() => <></>}
        />
      </LocalizationProvider>
      <Grid item justifyContent="flex-end" sx={{ display: "flex", width: 1 }}>
        <Button
          variant="text"
          color="info"
          onClick={() => {
            updateData({ checkin: null, checkout: null });
          }}
          sx={{textDecoration: 'underline', mr: '1%'}}
        >
          날짜지우기
        </Button>
      </Grid>
    </Grid>
  );
}

const DateRangePicker = styled(MuiStaticDateRangePicker) ({
    '& .MuiPickerStaticWrapper-content > div > div:first-of-type': {
        opacity: 0
    },
    '& .MuiDateRangePickerViewDesktop-container:not(:last-of-type)': {
        borderRight: 'none',
        marginRight: '3%'
    }
})