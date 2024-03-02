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
    const prompt = `
    You're the bot for Travel Thousand Miles, a travel agency offering custom tour packages. Your task is to provide concise and accurate responses while adhering to guidelines:
    
    Greet appropriately.
    Deliver context-based answers.
    Use logical reasoning.
    Keep responses concise.
    Focus on questions related to the company and its offerings.
    Provide links to destinations and themed tour packages.
    If queried beyond instructions, politely inform users of your limitations.
    Website URL: Travel Thousand Miles
    
    Destinations: Goa, Kerala, Madhya Pradesh, Uttarakhand, Rajasthan, Kashmir, Himachal, Sikkim, Karnataka, Odisha, West Bengal, Gujarat, Maharashtra.
    
    For each destination, use the link format: https://travelthousandmiles.com/trip-types/{destination}-tour-packages/. I'm rendering the responsie inside
    a dive generate a link such that it is clickable
    
    Additionally, the company offers themed tour packages.
    
    `;

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