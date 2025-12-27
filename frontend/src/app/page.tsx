'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Hotel,
  Utensils,
  Ticket,
  Wallet,
  MapPin,
  Calendar,
  Sparkles,
  Loader2,
  ChevronRight,
  Globe,
  Heart,
  History,
  Flag,
} from 'lucide-react';

// Types
interface Costs {
  flights: string;
  accommodation: string;
  food: string;
  activities: string;
  total: string;
}

interface DaySchedule {
  day: number;
  title: string;
  activities: string[];
}

interface Itinerary {
  summary: string;
  currency: string;
  countryCode: string;
  cityName: string;
  history: string;
  costs: Costs;
  schedule: DaySchedule[];
}

interface ApiResponse {
  success: boolean;
  destination: string;
  days: number;
  budget: string;
  itinerary: Itinerary;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const floatVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function Home() {
  // Form state
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('Moderate');
  const [interests, setInterests] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post<ApiResponse>(
        'http://localhost:5001/api/itinerary',
        {
          destination,
          days: parseInt(days),
          budget,
          interests,
        }
      );

      setResult(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            'Failed to generate itinerary. Please try again.'
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cost card component
  const CostCard = ({
    icon: Icon,
    label,
    value,
    delay,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        <span className="text-gray-300 text-sm font-medium">{label}</span>
      </div>
      <p className="text-white text-xl font-bold group-hover:text-purple-300 transition-colors">{value}</p>
    </motion.div>
  );
    </motion.div>
  );

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-purple-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-10 h-10 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                WanderLust AI
              </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Your AI-powered travel companion. Generate personalized itineraries
              with cost estimates in seconds.
            </p>
          </motion.div>

          {/* Glassmorphism Input Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    Where do you want to go?
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Tokyo, Japan"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Duration & Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      placeholder="e.g., 7"
                      min="1"
                      max="30"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                      <Wallet className="w-4 h-4 text-purple-400" />
                      Budget Level
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="Cheap" className="bg-gray-900">
                        💰 Budget-Friendly
                      </option>
                      <option value="Moderate" className="bg-gray-900">
                        💎 Moderate
                      </option>
                      <option value="Luxury" className="bg-gray-900">
                        👑 Luxury
                      </option>
                    </select>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
                    <Heart className="w-4 h-4 text-purple-400" />
                    Your Interests (optional)
                  </label>
                  <input
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g., food, history, adventure, photography"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Crafting Your Adventure...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Dream Trip
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="py-16 px-4"
            >
              <div className="max-w-5xl mx-auto">
                {/* Destination Header with Flag */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  {/* Country Flag */}
                  {result.itinerary.countryCode && (
                    <motion.div
                      variants={floatVariants}
                      animate="float"
                      className="flex justify-center mb-6"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50" />
                        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
                          <Image
                            src={`https://flagcdn.com/w160/${result.itinerary.countryCode.toLowerCase()}.png`}
                            alt={`${result.itinerary.countryCode} flag`}
                            width={120}
                            height={80}
                            className="rounded-lg shadow-lg"
                            unoptimized
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                  >
                    Your Trip to{' '}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                      {result.itinerary.cityName || result.destination}
                    </span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300 text-lg max-w-2xl mx-auto"
                  >
                    {result.itinerary.summary}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300"
                  >
                    <Flag className="w-4 h-4 text-purple-400" />
                    {result.days} Days • {result.budget} Budget • {result.itinerary.currency}
                  </motion.div>
                </motion.div>

                {/* City History Section */}
                {result.itinerary.history && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-12"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden"
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl"
                          >
                            <History className="w-5 h-5 text-white" />
                          </motion.div>
                          <h3 className="text-xl font-bold text-white">A Glimpse into History</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{result.itinerary.history}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Cost Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16"
                >
                  <CostCard
                    icon={Plane}
                    label="Flights"
                    value={result.itinerary.costs.flights}
                    delay={0.3}
                  />
                  <CostCard
                    icon={Hotel}
                    label="Accommodation"
                    value={result.itinerary.costs.accommodation}
                    delay={0.4}
                  />
                  <CostCard
                    icon={Utensils}
                    label="Food (Daily)"
                    value={result.itinerary.costs.food}
                    delay={0.5}
                  />
                  <CostCard
                    icon={Ticket}
                    label="Activities"
                    value={result.itinerary.costs.activities}
                    delay={0.6}
                  />
                  <CostCard
                    icon={Wallet}
                    label="Total Estimate"
                    value={result.itinerary.costs.total}
                    delay={0.7}
                  />
                </motion.div>

                {/* Timeline / Schedule */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      🗓️
                    </motion.span>
                    Day-by-Day Itinerary
                  </motion.h3>
                  <div className="relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 transform md:-translate-x-1/2" />

                    {/* Schedule Items */}
                    <div className="space-y-8">
                      {result.itinerary.schedule.map((day, index) => (
                        <motion.div
                          key={day.day}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                          }`}
                        >
                          {/* Day Marker */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 + index * 0.1, type: 'spring', stiffness: 200 }}
                            className="absolute left-4 md:left-1/2 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg shadow-purple-500/30"
                          >
                            <motion.span
                              variants={pulseVariants}
                              animate="pulse"
                              className="text-white text-sm font-bold"
                            >
                              {day.day}
                            </motion.span>
                          </motion.div>

                          {/* Content Card */}
                          <div
                            className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                              index % 2 === 0
                                ? 'md:pr-8 md:text-right'
                                : 'md:pl-8 md:text-left'
                            }`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.02, y: -5 }}
                              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                            >
                              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                {day.title}
                              </h4>
                              <ul
                                className={`space-y-3 ${
                                  index % 2 === 0
                                    ? 'md:text-right'
                                    : 'md:text-left'
                                }`}
                              >
                                {day.activities.map((activity, actIndex) => (
                                  <li
                                    key={actIndex}
                                    className="text-gray-300 text-sm flex items-start gap-2 hover:text-white transition-colors"
                                    style={{
                                      flexDirection:
                                        index % 2 === 0 ? 'row-reverse' : 'row',
                                    }}
                                  >
                                    <motion.div
                                      initial={{ rotate: 0 }}
                                      whileHover={{ rotate: 90, scale: 1.2 }}
                                    >
                                      <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                    </motion.div>
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          </div>

                          {/* Spacer for alternating layout */}
                          <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Generate Another Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-center mt-16"
                >
                  <motion.button
                    onClick={() => {
                      setResult(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-500 hover:to-pink-500 border border-purple-500/50 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <motion.span
                      animate={{ rotate: [0, 20, -20, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    >
                      ✨
                    </motion.span>
                    Plan Another Adventure
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-gray-500 text-sm">
          <p>
            Made with ❤️ by WanderLust AI •{' '}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
}
