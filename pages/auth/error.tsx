import { GetServerSideProps } from "next";
import { useRouter } from "next/router"

export default function AuthError () {
    const router = useRouter();
    const {error} = router.query!;
    if(error == 'Duplicated') {
        return ( <h2> Duplicated </h2> )
    }
    return  ( <h2> 에러Page </h2> )
}

export const getServerSideProps: GetServerSideProps = async (props) => {
    return {
        props:  {
            error: props.query.error ?? "default"
        }
    }
}