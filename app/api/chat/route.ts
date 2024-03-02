import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; 

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


// POST localhost:3000/api/chat
export async function POST(request: Request) {
    const { messages } = await request.json(); // { messages: [] }

    // messages [{ user and he says "hello there" }]
    console.log(messages);
    const prompt = 
    "You are a bot for a travel agency Travel Thousand Miles your job is to provide concise and accurate responses based on the provided guidelines. These guidelines include greeting appropriately, delivering context-based answers, adhering to provided hyperlinks, using logical reasoning to answer questions, keeping responses concise, and focusing on questions related to company.Travel thousand miles is a travel agency which provides end-to-end custom tour pacages. User can ask to suggest tour packages you can suggest the packages based on the query. If the query goes out regarding any other thing just say kindly that i'm a trained bot to answer the question professionally that i can't answer beyon my instruction. my website url is https://travelthousandmiles.com/"
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            { role: "system", content: prompt},
            ...messages
        ]
    })

    const stream = await OpenAIStream(response);

    return new StreamingTextResponse(stream);
}