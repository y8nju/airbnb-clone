import AccountType from "../../interface/accountType";

const serverURI = process.env.NEXT_PUBLIC_SERVER_URI
console.log(serverURI)

const postOption = {
    method: 'POST',
    headers: { 
        "Content-type": "application/json",
        "Accept": "application/json"
    },
}

export async function findEmail(email: string) {
    console.log('serverURI', serverURI)
    let endPoint = serverURI + '/api/account/flow';
    const response = await fetch(endPoint, {
        ...postOption,
        body: JSON.stringify({email: email})
    })
    const data = await response.json();
    return data;
}

export async function signup(doc: AccountType) {
    console.log(doc)
    let endPoint = serverURI + '/api/account/signup';
    const response = await fetch(endPoint,  {
        ...postOption,
        body: JSON.stringify(doc)
    })
    const data = await response.json();
    return data;
}
type CommitmentDoc = {
    email: string, 
    visible: Date
}
export async function commitment(doc: CommitmentDoc) {
    let endPoint = serverURI + '/api/account/commitment';
    const response = await fetch(endPoint, {
        ...postOption,
        body: JSON.stringify(doc)
    });
    const data = await response.json();
    return data;
}

type Credentials = {
    email: string, 
    password: string
}
export async function login(credentials: Credentials) {
    let endPoint = serverURI + '/api/account/signin';
    const response = await fetch(endPoint,  {
        ...postOption,
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    })
    const data = await response.json();
    return data;
}