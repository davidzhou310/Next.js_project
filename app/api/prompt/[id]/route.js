import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const prompts = await Prompt.findById(params.id).populate('creator');

        if (!prompts) {
            return new Response("Prompt not found", { status: 400 });
        }

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (err) {
        return new Response("Fail to fetch the prompt", { status: 500 });
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 400 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (err) {
        return new Response("Fail to edit prompt", { status: 500 });
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 204 });
    } catch (err) {
        return new Response("Failed to delete prompt", { status: 200 });
    }
}