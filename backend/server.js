require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS configuration - allow all origins for development
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'WanderLust AI Backend is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WanderLust AI Backend is running!' });
});

// Main itinerary generation endpoint
app.post('/api/itinerary', async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;

    // Validate required fields
    if (!destination || !days || !budget) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide destination, days, and budget.',
      });
    }

    // System prompt for GPT-4o
    const systemPrompt = `You are an expert travel planner with deep knowledge of destinations worldwide. 
Your task is to create detailed, realistic travel itineraries with accurate cost estimates.

CRITICAL INSTRUCTIONS:
- Return ONLY valid JSON. No markdown formatting. No backticks. No explanations outside JSON.
- All costs should be realistic estimates based on the destination and budget level.
- Activities should be specific to the destination and reflect local culture and attractions.
- The countryCode MUST be a valid ISO 3166-1 alpha-2 country code (e.g., "JP" for Japan, "FR" for France, "US" for USA).

JSON SCHEMA (follow this exactly):
{
  "summary": "Short enthusiastic summary of the trip (2-3 sentences)",
  "countryCode": "ISO 3166-1 alpha-2 country code (e.g., JP, FR, US, IT, TH)",
  "cityName": "The main city name without country (e.g., Tokyo, Paris, Rome)",
  "history": "A fascinating 2-3 sentence brief history of this destination highlighting its most interesting historical facts",
  "currency": "Local Currency Code (e.g., EUR, JPY, USD)",
  "costs": {
    "flights": "Estimated round-trip flight cost range (e.g., $800-$1200)",
    "accommodation": "Total accommodation cost for all nights (e.g., $600-$900)",
    "food": "Daily food budget estimate (e.g., $50-$80/day)",
    "activities": "Total estimated activity/entrance fees cost (e.g., $200-$350)",
    "total": "Grand total estimate for the entire trip (e.g., $2000-$3000)"
  },
  "schedule": [
    {
      "day": 1,
      "title": "Theme of the day (e.g., 'Arrival & Historic Center Exploration')",
      "activities": [
        "Detailed activity 1 with timing (e.g., 'Morning: Arrive at airport, transfer to hotel in city center')",
        "Detailed activity 2 (e.g., 'Afternoon: Walking tour of Old Town, visit main cathedral')",
        "Detailed activity 3 (e.g., 'Evening: Dinner at local restaurant, try regional cuisine')"
      ]
    }
  ]
}`;

    // User prompt with trip details
    const userPrompt = `Create a ${days}-day travel itinerary for ${destination}.

Budget Level: ${budget}
${interests ? `Traveler Interests: ${interests}` : 'General sightseeing and cultural experiences'}

Provide realistic cost estimates and detailed daily activities. Include must-see attractions, local food recommendations, and hidden gems.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    // Extract the response content
    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let itinerary;
    try {
      // Clean the response in case there are any markdown artifacts
      const cleanedResponse = responseContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      itinerary = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw Response:', responseContent);
      throw new Error('Failed to parse itinerary response');
    }

    // Return the itinerary
    res.json({
      success: true,
      destination,
      days: parseInt(days),
      budget,
      itinerary,
    });

  } catch (error) {
    console.error('Error generating itinerary:', error);

    // Handle specific OpenAI errors
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'Invalid API Key',
        message: 'Please check your OpenAI API key configuration.',
      });
    }

    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: 'API Quota Exceeded',
        message: 'OpenAI API quota has been exceeded. Please try again later.',
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Failed to generate itinerary',
      message: error.message || 'An unexpected error occurred. Please try again.',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🌍 WanderLust AI Backend running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/itinerary`);
});
