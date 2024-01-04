import { getAuthToken, getFormData, isValidPassword, jsonCatchResponse, jsonLogin, jsonNotFound } from "@/helper/common";
import User from "@/models/User";

export async function POST(request) {
    try {
        let formData = await getFormData(request);
        const user = await User.findOne({
            email: formData.get('email'),
        }).select('_id, password');
        if (user) {
            const validPassword = await isValidPassword(formData.get('password'), user.password);
            if (validPassword) {
                return jsonLogin('Welcome back! You are logged in successfully. Enjoy your session!', getAuthToken({ userId: user._id }));
            }
            return jsonNotFound('Invalid password.');
        }
        return jsonNotFound('Invalid username.');
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}