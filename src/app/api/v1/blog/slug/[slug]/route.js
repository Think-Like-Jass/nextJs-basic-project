import { jsonCatchResponse, jsonDeleted, jsonFounded } from "@/helper/common";
import Blog from "@/models/Blog";

export async function GET(request, { params }) {
    try {
        const { slug } = params;
        const blog = await Blog.findBySlug(slug);
        return jsonFounded(blog);
    }
    catch (error) {
        return jsonCatchResponse(error); Ì
    }
}