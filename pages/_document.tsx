import { Html, Head, Main, NextScript } from "next/document";

export default function Document () {
    
    return ( <Html>
        <Head>
            <title>여행은 살아보는 거야 - 에어비앤비</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
            <link rel="icon" href="/icon.svg" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html> )
}