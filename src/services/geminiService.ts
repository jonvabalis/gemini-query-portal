
/**
 * Service for interacting with the Google Gemini Pro API
 */
export async function generateResponse(apiKey: string, prompt: string): Promise<string> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
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
      throw new Error(errorData.error?.message || 'Failed to generate response');
    }
    
    const data = await response.json();
    
    // Extract text from the response
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return textResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}
