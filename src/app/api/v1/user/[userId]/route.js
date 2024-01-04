import { getFormData, hashPassword, jsonCatchResponse, jsonResponse } from "@/helper/common";
import User from "@/models/User";

export async function DELETE(request, { params }) {
    try {
        const { userId } = params;
        const data = await User.deleteOne({ _id: userId });
        return jsonResponse(1, 'Record deleted successfully.', data);
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}


export async function GET(request, { params }) {
    try {
        const { userId } = params;
        const data = await User.findById(userId);
        if (data)
            return jsonResponse(1, 'Record found successfully.', data);

        return jsonResponse(0, 'No record found');
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}

export async function PUT(request, { params }) {
    try {
        const { userId } = params;
        const formData = await getFormData(request);
        const data = await User.findById(userId);
        if (data) {
            if (formData.has('name')) {
                data.name = formData.get('name');
            }
            if (formData.has('email')) {
                data.email = formData.get('email');
            }
            if (formData.has('password')) {
                data.password = await hashPassword(formData.get('password'));
            }

            await data.save();

            delete data._doc.password;
            return jsonResponse(1, 'Record updated successfully.', data);
        }

        return jsonResponse(0, 'No record found');
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}