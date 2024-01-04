import User from "@/models/User";

const { jsonResponse, jsonCatchResponse, getFormData, hashPassword } = require("@/helper/common");
export async function GET(request) {
    try {
        const users = await User.find();

        return jsonResponse(1, 'Successfull', users);
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}

export async function POST(request) {
    try {
        let formData = await getFormData(request);
        const user = await User.create({
            name: formData.get('name'),
            email: formData.get('email'),
            password: await hashPassword(formData.get('password')),
        });
        delete user._doc.password;
        return jsonResponse(1, 'Successfull', user);
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}

export async function DELETE(request) {
    try {
        const data = await User.deleteMany();
        return jsonResponse(1, 'Successfull', data);
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}