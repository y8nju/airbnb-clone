import { useEffect, useState } from 'react';
import Head from "next/head";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import { getBookingData } from "../lib/api/bookApi";
import { PopulateBookingType } from "../interface/bookingType";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import AfterBookItem from '../component/card/afterBookItem';
import Booking from '../lib/models/booking';
import { format, isPast } from "date-fns";
import BeforeBookItem from '../component/card/beforeBookItem';

export default function Trips({bookList}: {bookList: PopulateBookingType[]}) {
    const [beforeList, setBeforeList] = useState<PopulateBookingType[]>([])
    const [afterList, setAfterList] = useState<PopulateBookingType[]>([])
    const router = useRouter();
    const {data: session, status}= useSession();
    

    useEffect(() => {
        console.log('bookList', bookList)
        let beforeArr: PopulateBookingType[] = []
        let afterArr: PopulateBookingType[] = []
        bookList.map((book) => {
            if(isPast(new Date(book.checkout.slice(0,10)))) {
                beforeArr.push(book as any)
            } else {
                afterArr.push(book as any)
            }
        })
        setBeforeList(beforeArr);
        setAfterList(afterArr);
    }, [bookList]);
    console.log(afterList)
    

    return (<>
        <Head>
            <title>여행 목록 - 에어비앤비</title>
        </Head>
        <Container maxWidth="lg" sx={{minHeight: "77vh"}}>
            <Grid container direction="column">
                <Grid item sx={{py: 3}}>
                    <Typography variant="h4" fontWeight={600}>
                        여행
                    </Typography>
                </Grid>
                <Divider />
                {(bookList == null || bookList.length == 0) && <>
                    <Grid item sx={{pt: 3, pb: 6}}>
                        <Typography variant="h6" fontWeight={500}>
                            아직 예약된 여행이 없습니다!
                        </Typography>
                        <Typography variant="body1" fontWeight={300}>
                            여행 가방에 쌓인 먼지를 털어내고 다음 여행 계획을 세워보세요.
                        </Typography>
                        <Link href="/">
                            <Button variant="outlined" color="info" size="large"
                                sx={{mt: 2, py: 1.8, fontSize: '16px', lineHeight: 1, borderRadius: 2, borderColor: grey[800]}}>
                                숙소 검색하기
                            </Button>
                        </Link>
                    </Grid>
                    <Divider />
                </>}
                {afterList.length > 0 && <Grid container direction="column" sx={{pt: 3, pb: 6}}>
                    <Typography variant="h6" fontWeight={500} sx={{mb: 2}}>
                        예정된 예약
                    </Typography>
                    <Grid container spacing={2}>
                        {afterList.map(book => {
                            return <AfterBookItem data={book} />
                        }
                        )}    
                    </Grid>
                </Grid>}
                {beforeList.length > 0 && <>
                    <Divider />
                    <Grid container direction="column" sx={{pt: 3, pb: 6}}>
                    <Typography variant="h6" fontWeight={500} sx={{mb: 2}}>
                        이전 여행지
                    </Typography>
                    <Grid container spacing={2}>
                        {beforeList.map(book => {
                            return <BeforeBookItem data={book} />
                        }
                        )}    
                    </Grid>
                </Grid>
                </>}
            </Grid>
        </Container>
    </>)
}
Trips.layout = "defaultType";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    await dbConnect();
    const session = await getSession(ctx);
    const response = await Booking.find({
        guestId: session?.user?.email as string, result: 'true'
    }).populate('productId').lean();;
    return {
        props: {
            bookList: JSON.parse(JSON.stringify(response))
        }
    }
}