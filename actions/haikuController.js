"use server"
import { redirect } from "next/navigation"
import { getUserFromCookie} from "../lib/getUser"
import { ObjectId } from "mongodb"
import { getCollection } from "../lib/db"
import cloudinary from 'cloudinary'

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

async function sharedHaikuLogic(formData, user) {
    console.log(formData.get("signature"))
    console.log(formData.get("public_id"))
    console.log(formData.get("version"))

    const errors = {}
    const ourHaiku = {
        line1: formData.get('line1'),
        line2: formData.get('line2'),
        line3: formData.get('line3'),
        author: ObjectId.createFromHexString(user.userId),
    }
    if (typeof ourHaiku.line1 != "string") ourHaiku.line1 = ""
    if (typeof ourHaiku.line2 != "string") ourHaiku.line2 = ""
    if (typeof ourHaiku.line3 != "string") ourHaiku.line3 = ""
    ourHaiku.line1 = ourHaiku.line1.trim()
    ourHaiku.line2 = ourHaiku.line2.trim()
    ourHaiku.line3 = ourHaiku.line3.trim()
    if (ourHaiku.line1.length < 5) errors.line1="Too small character"
    if (ourHaiku.line1.length > 1125) errors.line1="Too many character Line1"
    if (ourHaiku.line2.length < 5) errors.line2="Too small character"
    if (ourHaiku.line2.length > 1125) errors.line2="Too many character"
    if (ourHaiku.line3.length < 5) errors.line3="Too small character"
    if (ourHaiku.line3.length > 1125) errors.line3="Too many character"
    if (ourHaiku.line1.length == 0) errors.line1="This field cannot be empty"
    if (ourHaiku.line2.length == 0) errors.line2="This field cannot be empty"
    if (ourHaiku.line3.length == 0) errors.line3="This field cannot be empty"
    // verify signature
    ourHaiku.photo = formData.get("public_id")
    
    return {
        errors,
        ourHaiku
    }

}
export const createHaiku = async function(prevState, formData) {
    const user = await getUserFromCookie()
    if (!user) {
        return redirect("/")
    }
    const results = await sharedHaikuLogic(formData, user)
    if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
        return {
            errors: results.errors
        }
    }
    // save into db
    const haikusCollection = await getCollection("haikus")
    const newHaiku = await haikusCollection.insertOne(results.ourHaiku)
    return redirect("/")
}