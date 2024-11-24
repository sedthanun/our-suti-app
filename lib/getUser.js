import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function getUserFromCookie() {
    const theCookie = (await cookies()).get("bumapp")?.value
    if (theCookie) {
        try {
            console.log("Hello")
            const decoded = jwt.verify(theCookie, process.env.JWTSECRET)
            return decoded
        } catch (err) {
            return null
        }
    }
}