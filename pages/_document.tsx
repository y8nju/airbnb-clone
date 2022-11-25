import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document () {
    const googleMaps = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_APP_KEY}&libraries=places&region=kr&callback=initMap`
    return ( <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
            <link rel="icon" href="/icon.svg" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
        </Head>
        <body>
            <Main />
            <NextScript />
            <script async src={googleMaps}></script>
        </body>
    </Html> )
}