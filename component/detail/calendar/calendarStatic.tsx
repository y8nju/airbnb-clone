import { Box, TextField, Button, Grid } from "@mui/material";
import styled from '@mui/material/styles/styled';

import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDateRangePicker, StaticDateRangePickerProps} from '@mui/x-date-pickers-pro/StaticDateRangePicker';;
import {
	DateRangePickerDay as MuiDateRangePickerDay,
	DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useContext, useEffect, useState } from "react";
import  dateFns, {eachDayOfInterval, format, subDays} from 'date-fns';
import ko from "date-fns/locale/ko";
import { BookingContext } from "../../../context/bookingContext";
import { creatAndUpdateBooking } from "../../../lib/api/bookApi";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import { BookingType } from "../../../interface/bookingType";
import { ReservedPeriod } from "../../../pages/rooms/[roomId]";

interface Props {
  saved?: boolean, 
  reserved: ReservedPeriod
}

export default function CalendarStatic({saved, reserved}: Props) {
  const [period, setPeriod] = useState<string[]>([])
  const router = useRouter();
  const bookingCtx = useContext(BookingContext);
  const {bookingData, updateData, closeDialog, updateSavedData} = bookingCtx!;
  
  useEffect(()=> {
    let arr: string[] = [];
    reserved.map(one => {
      const result = eachDayOfInterval({
        start: new Date(one.checkin as any),
        end: subDays(new Date(one.checkout), 1)
      })
      return result.forEach(day => arr.push(format(day, "yyyy-MM-dd")));
      // return result.forEach(day => arr.push(day));
    });
    setPeriod(arr);
  }, []);
  const savedHandle = async () => {
    const rst = await creatAndUpdateBooking({
      ...bookingData, _id: router.query.id
    } as BookingType);
    if(rst && rst.result) {
        updateSavedData();
        closeDialog();
    }else {
        console.log('데이터가 정상적으로 등록되지 않았습니다')
      }
  }

  const value: DateRange<dateFns | Date | string | null> = [
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
            if(newValue[0] !== null && newValue[1] !== null) {
              const newArr = eachDayOfInterval({
                start: new Date(newValue[0] as any),
                end: new Date(newValue[1] as any)
              })
              let newStrArr: string[] = []
              newArr.forEach(day => newStrArr.push(format(day, "yyyy-MM-dd")));
              const arr = period.filter(day => newStrArr.includes(day));
              console.log('arr', arr)
              if(arr.length > 0) {
                newValue = [null, null]
              }
            }
            updateData({ checkin: newValue[0], checkout: newValue[1] });
          }}
          shouldDisableDate={(day) => {
            const rst = reserved.reduce((prev, current) => {
              if (prev) {
                return true;
              }
              const t = format(new Date(day as any), "yyyyMMdd");
              const cin = format(new Date(current.checkin), "yyyyMMdd");
              const cout = format(subDays(new Date(current.checkout), 1), "yyyyMMdd");
              // 체크아웃 당일은 제외

              return t >= cin && t <= cout;
            }, false);
            return rst;
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
        {saved && <Button variant="contained" color="info" size="small"
          onClick={savedHandle}
          disabled={!(bookingData.checkin && bookingData.checkout) ? true : false}>
          저장하기
        </Button>}
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
