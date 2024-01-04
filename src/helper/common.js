import { dbConnection } from "@/models";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
dbConnection();
// COMMON METHODS
export const hashPassword = async function (pass) {
    return await bcrypt.hash(pass, 10);
}
export const isValidPassword = async function (orignalPassword, encryptedPassword) {
    return await bcrypt.compare(orignalPassword, encryptedPassword);
}
export const getAuthToken = function (data) {
    return jwt.sign(data, process.env.JWT_SECRET_KEY || 'secret');
}
export const getAuthTokenInfo = function (authToken) {
    return jwt.verify(authToken, process.env.JWT_SECRET_KEY || 'secret');
}
// COMMON METHODS

// RESPONSE MESSAGES
export const jsonResponse = function (status, message = 'Successfull!', data = null, ...extra) {
    let resp = { success: status.toString(), message };
    if (data) {
        resp.data = data;
    }
    if (extra.length) {
        extra.forEach((value) => {
            resp = { ...resp, ...value };
        });
    }
    return NextResponse.json(resp);
}

export const jsonCatchResponse = function (error) {
    console.log('Error::: ', error);
    return jsonResponse(0, 'Failed!', null, error);
}

export const jsonCreated = function (data, extra = null) {
    return jsonResponse(1, 'Record created successfully.', data, extra);
}

export const jsonFounded = function (data, extra = null) {
    return jsonResponse(1, 'Record found successfully.', data, extra);
}

export const jsonNotFound = function (message = 'No record found.') {
    return jsonResponse(0, message);
}

export const jsonDeleted = function (data, extra = null) {
    return jsonResponse(1, 'Record deleted successfully.', data, extra);
}

export const jsonLogin = function (message = 'Welcome back! You are logged in successfully. Enjoy your session!', token) {
    const response = jsonResponse(1, message);
    response.cookies.set(process.env.AUTH_TOKEN_NAME || 'authToken', token, { path: '/', maxAge: 3600, httpOnly: true, secure: true });
    return response;
}

export const jsonLogout = function () {
    const response = jsonResponse(1, 'Logged out successfully.');
    response.cookies.set(process.env.AUTH_TOKEN_NAME || 'authToken', '', { path: '/', maxAge: 0, httpOnly: true, secure: true });
    return response;
}
// RESPONSE MESSAGES


// GET REQUEST
export const getJson = async function (request) {
    try {
        return await request.json();
    }
    catch (e) {
        return {};
    }
}

export const getFormData = async function (request) {
    try {
        return await request.formData();
    }
    catch (e) {
        return new Map();
    }
}
// GET REQUEST