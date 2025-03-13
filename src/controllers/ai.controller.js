import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

const generationConfig = {
temperature: 1,
topP: 0.95,
topK: 40,
maxOutputTokens: 8192,
responseMimeType: "text/plain",
};
  
const ai_solve = async (req, res) => {
    try {
        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
          });
        const data = req.body ;
        const prompt = "Solve the following just return me its correct or wrong no other explinations: " + data + " " + data.solution;
        const result = await chatSession.sendMessage(prompt);
        return res.status(200).json({ Message: "Successfully Solved", data: result.response.text()});
    } catch (error) {
        return res.status(500).json({ Message: "Error Solving", error: error.message });
    }
}


export default {ai_solve};  