import { getFormData, jsonCatchResponse, jsonCreated, jsonDeleted, jsonFounded, tryBlock } from "@/helper/common";
import Blog from "@/models/Blog";
export async function GET(request) {
    try {
        const blogs = await Blog.find();
        return jsonFounded(blogs);
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}

export async function POST(request) {
    try {
        const formData = await getFormData(request);
        const blog = await Blog.create({
            title: formData.get('title'),
            content: formData.get('content') || '',
            shortDesc: formData.get('shortDesc') || '',
            keywords: formData.get('keywords') || '',
            thumbnail: formData.get('thumbnail') || '',
            slug: formData.get('slug') || '',
        });

        return jsonCreated(blog);
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}

export async function DELETE(request) {
    try {
        const del = await Blog.deleteMany();
        return jsonDeleted(del);
    }
    catch (error) {
        return jsonCatchResponse(error);
    }
}