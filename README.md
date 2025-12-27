# 🌍 WanderLust AI

An AI-powered travel itinerary generator that creates personalized trip plans with cost estimates, country flags, and destination history.

![WanderLust AI](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop)

## ✨ Features

- **AI-Powered Itineraries**: Leverages GPT-4o to generate detailed day-by-day travel plans
- **Cost Estimates**: Get realistic budget breakdowns for flights, accommodation, food, and activities
- **🏳️ Country Flags**: Automatically displays the destination country's flag with smooth animations
- **📜 City History**: Learn fascinating historical facts about your destination
- **🛂 Visa Compliance**: Get personalized visa requirements based on your nationality
- **🌍 Globe Zoom Animation**: Interactive 3D globe animation that zooms to your destination
- **☀️🌅🌙 Time-of-Day Icons**: Activities display contextual icons for morning, afternoon, and evening
- **Beautiful UI**: Modern glassmorphism design with stunning animations
- **Customizable**: Adjust destination, duration, budget level, personal interests, and nationality

## 🎬 Animation Highlights

| Element | Animation |
|---------|-----------|
| Globe Zoom | 3D spinning globe with orbit ring, zooms to destination pin |
| Country Flag | Floating effect + spring scale-in with rotation |
| Time Icons | ☀️ Morning / 🌅 Afternoon / 🌙 Evening with spring pop-in |
| Cost Cards | Hover lift with scale, rotating icons |
| Day Markers | Spring pop-in, subtle pulse effect |
| Timeline Cards | Lift and glow on hover |
| History Section | Gradient background with pulsing glow |
| Visa Section | Emerald gradient card with scale badge, pulsing icon |
| Buttons | Wiggling sparkle emoji, hover glow effects |

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- OpenAI SDK (GPT-4o)
- CORS + dotenv

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React Icons
- Axios

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key

### 1. Setup Backend

```bash
cd backend

# Add your OpenAI API key to .env
# Edit .env and replace 'your_openai_api_key_here' with your actual key

# Start the server
node server.js
```

The backend will run on `http://localhost:8080`

### 2. Setup Frontend

```bash
cd frontend

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
ai_travel_buddy/
├── backend/
│   ├── server.js          # Express API server with GPT-4o integration
│   ├── .env               # Environment variables (add your API key here)
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx       # Main application page with all UI components
│   │       ├── globals.css    # Global styles + custom animations
│   │       └── layout.tsx     # Root layout
│   ├── package.json
│   └── tailwind.config.ts
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=8080
```

## 🎨 UI Features

- **Dark Theme**: Stunning Earth/map background with gradient overlay
- **Glassmorphism**: Translucent input card with backdrop blur
- **Globe Zoom Transition**: 3D animated globe that spins and zooms when generating itinerary
- **Country Flag Display**: Shows destination flag via flagcdn.com
- **History Card**: Animated gradient card with destination history
- **Visa Compliance Card**: Emerald-themed card with color-coded status badges and detailed visa requirements
- **Time-of-Day Icons**: Morning (☀️), Afternoon (🌅), Evening (🌙) icons for activities
- **Cost Grid**: 5 animated cards showing budget breakdown
- **Timeline**: Alternating day-by-day itinerary with vertical line
- **Smooth Animations**: Powered by Framer Motion throughout

## 📝 API Endpoint

### POST /api/itinerary

**Request Body:**
```json
{
  "destination": "Tokyo, Japan",
  "days": 7,
  "budget": "Moderate",
  "interests": "food, culture, anime",
  "startingCountry": "United States"
}
```

**Response:**
```json
{
  "success": true,
  "destination": "Tokyo, Japan",
  "days": 7,
  "budget": "Moderate",
  "itinerary": {
    "summary": "An exciting week exploring Tokyo's blend of ancient traditions and cutting-edge technology!",
    "countryCode": "JP",
    "cityName": "Tokyo",
    "history": "Tokyo, formerly known as Edo, became Japan's political center in 1603 when Tokugawa Ieyasu established his shogunate here. The city was renamed Tokyo ('Eastern Capital') in 1868 when it became the imperial capital.",
    "currency": "JPY",
    "visa": {
      "required": "No",
      "type": "Visa-Free",
      "duration": "90 days",
      "notes": "US citizens can stay visa-free for tourism/business up to 90 days. Passport must be valid for duration of stay. Proof of onward/return ticket may be required.",
      "estimatedCost": "Free"
    },
    "costs": {
      "flights": "$800-$1200",
      "accommodation": "$700-$1000",
      "food": "$50-$80/day",
      "activities": "$200-$350",
      "total": "$2000-$3000"
    },
    "schedule": [
      {
        "day": 1,
        "title": "Arrival & Shibuya Exploration",
        "activities": [
          "Morning: Arrive at Narita/Haneda, transfer to hotel",
          "Afternoon: Explore Shibuya Crossing and Hachiko Statue",
          "Evening: Dinner in Shibuya, try authentic ramen"
        ]
      }
    ]
  }
}
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Made with ❤️ by WanderLust AI
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Made with ❤️ by WanderLust AI
