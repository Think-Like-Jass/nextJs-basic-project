import { jsonCatchResponse, jsonDeleted, jsonFounded } from "@/helper/common";
import Blog from "@/models/Blog";

export async function GET(request, { params }) {
    try {
        const { blogId } = params;
        const blog = await Blog.findById(blogId);
        return jsonFounded(blog);
    }
    catch (error) {
        return jsonCatchResponse(error); Ì
    }
}

export async function DELETE(request, { params }) {
    try {
        const { blogId } = params;
        const blog = await Blog.deleteOne({ _id: blogId });
        return jsonDeleted(blog);
    }
    catch (error) {
        return jsonCatchResponse(error); Ì
    }
}