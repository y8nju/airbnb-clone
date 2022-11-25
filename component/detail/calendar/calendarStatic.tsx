import { Box, TextField, Button, Grid } from "@mui/material";
import styled from '@mui/material/styles/styled';

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ko from "date-fns/locale/ko";
import { StaticDateRangePicker, StaticDateRangePickerProps} from '@mui/x-date-pickers-pro/StaticDateRangePicker';;
import {
	DateRangePickerDay as MuiDateRangePickerDay,
	DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useContext, useState } from "react";
import { BookingContext } from "../../../pages/rooms/[roomId]";
import  dateFns from 'date-fns';

export default function CalendarStatic() {
    const bookingCtx = useContext(BookingContext);
    const {bookingData, updateData} = bookingCtx!;

  const value: DateRange<dateFns | Date> = [
    bookingData.checkin ?? null,
    bookingData.checkout ?? null,
  ];
	const renderWeekPickerDay = (date: dateFns,dateRangePickerDayProps: DateRangePickerDayProps<dateFns>) => {
    return <DateRangePickerDay {...dateRangePickerDayProps} />;
};
  return (
    <Grid container width="min-content">
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <DateRangePicker
          disablePast
          disableHighlightToday
          displayStaticWrapperAs="desktop"
          value={value as any}
          renderDay={renderWeekPickerDay}
          onChange={(newValue) => {
            updateData({ checkin: newValue[0], checkout: newValue[1] });
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

const DateRangePicker = styled((props: StaticDateRangePickerProps<typeof dateFns, typeof dateFns>) => (
    <StaticDateRangePicker
      {...props}
    />
))(()=> ({
    '& .MuiPickerStaticWrapper-content > div > div:first-of-type': {
        opacity: 0
    },
    '& .MuiDateRangePickerViewDesktop-container:not(:last-of-type)': {
        borderRight: 'none',
        marginRight: '3%'
    }
}))
const DateRangePickerDay = styled(MuiDateRangePickerDay)(
	({
		theme,
		isHighlighting,
		isStartOfHighlighting,
		isEndOfHighlighting,
		outsideCurrentMonth,
	}) => ({
		...(!outsideCurrentMonth &&
			isHighlighting && {
				borderRadius: 0,
				backgroundColor: '#ededed',
				// color: "salmon",
				'&:hover, &:focus': {
					backgroundColor: '#ededed',
				},
			}),
		...(isStartOfHighlighting && {
			borderTopLeftRadius: '50%',
			borderBottomLeftRadius: '50%',
		}),
		...(isEndOfHighlighting && {
			borderTopRightRadius: '50%',
			borderBottomRightRadius: '50%',
		}),
    "& .MuiDateRangePickerDay-day.Mui-selected, & .MuiDateRangePickerDay-day.Mui-selected:hover, & .MuiDateRangePickerDay-day.Mui-selected:focus" : {
      backgroundColor : "black"
    },
    "& .MuiDateRangePickerDay-rangeIntervalDayHighlight" :{
      backgroundColor: '#f7f7f7 !important'
    },
		"& .MuiDateRangePickerDay-day.Mui-disabled": {
			textDecoration: 'line-through'
		}
	}),
) as React.ComponentType<DateRangePickerDayProps<dateFns>>;
