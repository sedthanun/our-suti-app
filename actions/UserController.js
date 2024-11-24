"use server"
import React from 'react'
import { getCollection } from '../lib/db'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"
import { redirect } from 'next/navigation'

export const login = async function(prevState, formData) {
    const failObject = {
        success: false,
        message: "Invalid username / password."
    }
    const ourUser = {
        username: formData.get("username"),
        password: formData.get("password")
    }
    if (typeof ourUser.username != "string") ourUser.username = ""
    if (typeof ourUser.password != "string") ourUser.password = ""
    const collection = await getCollection("users")
    const user = await collection.findOne({username: ourUser.username})
    if (!user) {
        return failObject
    }
    const matchOrNot = bcrypt.compareSync(ourUser.password, user.password)
    if (!matchOrNot) {
        return failObject

    }
    // Create jwt value
    const ourTokenValue = jwt.sign({skyColor: "blue", userId: user._id, exp: Math.floor(Date.now()/1000) + 60 * 60 * 24}, process.env.JWTSECRET)

    // log the user in by giving them a cookie
    cookies().set("bumapp",ourTokenValue,{
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    })
    return redirect("/")
}
export const logout = async function() {
    (await cookies()).delete("bumapp")
    redirect('/')
}

export const register = async function(prevState, formDate) {
    const errors = {}
    const ourUser = {
        username: formDate.get("username"),
        password: formDate.get("password")
    }
    if (typeof ourUser.username != "string") ourUser.username = ""
    if (typeof ourUser.password != "string") ourUser.password = ""

    ourUser.username = ourUser.username.trim()
    ourUser.password = ourUser.password.trim()
    if (ourUser.username.length < 3) errors.username = "User name must be at least 3 chrs"
    if (ourUser.username.length > 30) errors.username = "You are the giant man"
    if (ourUser.username == "") errors.username = "You must provide username"

    if (ourUser.password.length < 3) errors.password = "User password must be at least 3 chrs"
    if (ourUser.password.length > 30) errors.password = "You are the giant man"
    if (ourUser.password == "") errors.password = "You must provide password"
    if(errors.username || errors.password) {
        return {
            errors: errors,
            success: false
        }
    }
    // Hash password first
    const salt = bcrypt.genSaltSync(10)
    ourUser.password = bcrypt.hashSync(ourUser.password, salt)
    // storing a new user in the database
    const usersCollection = await getCollection("users")
    const newUser = await usersCollection.insertOne(ourUser)
    const userId = newUser.insertedId.toString()
    // create our JWT value
    const ourTokenValue = jwt.sign({skyColor: "blue", userId: userId, exp: Math.floor(Date.now()/1000) + 60 * 60 * 24}, process.env.JWTSECRET)

    // log the user in by giving them a cookie
    cookies().set("bumapp",ourTokenValue,{
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    })
    return {
        success: true
    }
}
