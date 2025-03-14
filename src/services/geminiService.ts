
/**
 * Service for interacting with the Google Gemini AI Studio API
 */
export async function generateResponse(apiKey: string, prompt: string): Promise<string> {
  try {
    // Use the correct endpoint for Gemini from Google AI Studio
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error response:", errorData);
      throw new Error(errorData.error?.message || 'Failed to generate response');
    }
    
    const data = await response.json();
    console.log("API Response:", data);
    
    // Extract text from the response
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return textResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
