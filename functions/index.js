const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { defineSecret } = require("firebase-functions/params");
const { GoogleGenerativeAI } = require("@google/generative-ai");

initializeApp();
const db = getFirestore();
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
const DAILY_LIMIT = 20;

exports.chatWithGemini = onCall(
    { secrets: [GEMINI_API_KEY] },
    async(request) => {
        
        const userId = request.auth?.uid;

        if (!userId) {
            throw new HttpsError(
                "unauthenticated",
                "Could not identify user."
            );
        }

        const message = request.data.message;

        if(!message || message.trim() === "") {
            throw new HttpsError(
                "invalid-argument",
                "message cannot be empty"
            );
        }

        const today = new Date().toISOString().split("T")[0];
        const usageRef = db.collection("chatbot_usage").doc(userId);
        const usageDoc = await usageRef.get();

        let currentCount = 0;

        if (usageDoc.exists) {
            const data = usageDoc.data();
            if (data.date === today) {
                currentCount = data.count || 0;
                if (currentCount >= DAILY_LIMIT) {
                    throw new HttpsError(
                        "resource-exhausted",
                        "you have reached your daily usage limit. Try again tomorrow."
                    );
                }
            }
        }

        let aiResponse;

        try {
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: `You are a friendly nutritional assistant that helps users make healthier grocery choices by suggesting afforadable whole-food options, adapting for any user health or dietary restrictions if provided: 
                # Goals:
                - provide budget friendly nutritional advice
                - provide dietary and nutritional advice
                - provide general budgeting advice for grocery shopping
                - provide recipe suggestions based on user-provided condition, diet, and allergy restrictions
                - provide whole-food alternatives 

                # Rules:
                - answer questions about specific health conditions, dietary preferences, and allergies such as what nutritional label categories may be too much
                - avoid using complex medical terms
                - never provide medical treatment or diagnosis, only work off of user provided information
                - always avoid recommending brands by name 
                - admit when information is uncertain
                - always take the user's previous inputs into consideration such as information about dietary restrictions, conditions, goals, or allergies 
                - never make assumptions over a user's about dietary restrictions, conditions, goals, or allergies

                #Output Format
                - format responses to fit general mobile device ratios
                - ensure responses are giving easily digestible responses, while providing additional context if prompted
                - keep responses concise to 150 words or less

                # Disclaimers:
                - ensure that every response based around pricing response ends with a warning akin to 'Prices subject to variation across regions, please consult local information'
                - ensure that every response based around dieting and medical advice ends with a warning akin to 'As an AI-Model I am not able to guarantee accurate medical advice, please consult a professional for further information about your question.'
                
                # Examples:
                - User: I'm worried about my Lay's chips being too processed and too high in sodium. What are some alternative snacks I could try?
                AI: Store bought potato chips are often known for being overly processed, so for some whole-food snack alternatives try air-fried popcorn, roasted chickpeas, or even homemade potato chips. However, for a more convenient option, try shopping for chips made with all natural ingredients.  
                - User: I'm a vegetarian, so I'm worried I'm not getting enough protein. What substitutes can I use instead of meat?
                AI: It's great to hear you're taking steps to take care of your health. Since you aren't eating meat, you should give nuts, dairy products, and beans a try to boost your protein intake. Would you like some easy-to-follow recipe suggestions that involve these alternatives? As an AI model, I am not qualified to provide accurate medical advice. Please consult a professional
                - User: I want to eat healthy but have to stick to a 20$ budget this week. What can I buy to stretch my dollars, what shopping tips do you have?
                AI: Shopping under a budget can get tough, but there are plenty of tricks to stretch your dollar. Check for local sales and always shop with a list in mind. Buying in bulk can also help you to stretch your dollar. For more specific recipe ideas some options include bean salads, chicken and rice, eggs and toast, or frozen vegetables in egg fried rice. With some research and planning, you can stick to a balanced meal while staying within budget. Prices subject to variation across regions, please consult local information.
                `
            });

            const result = await model.generateContent(message);
            aiResponse = result.response.text();

        } catch (error) {
            console.error("Gemini error:", error);
            throw new HttpsError(
                "internal",
                "something went wrong with the AI. please try again."
            );
        }

        if (usageDoc.exists && usageDoc.data().date === today) {
            await usageRef.update({
                count: FieldValue.increment(1),
                lastMessageAt: new Date().toISOString()
            });
        } else {
            await usageRef.set({
                date: today,
                count: 1,
                userID: userId,
                lastReset: new Date().toISOString(),
                lastMessageAt: new Date().toISOString()
            });
        }

        return {
            response: aiResponse,
            remaining: DAILY_LIMIT - (currentCount + 1)
        };
    }
);