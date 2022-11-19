import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document () {
    const googleMaps = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_APP_KEY}&libraries=places&region=kr`
    return ( <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
            <link rel="icon" href="/icon.svg" />
        </Head>
        <body>
            <Main />
            <NextScript />
            <script async src={googleMaps}></script>
        </body>
    </Html> )
}