import type { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  typing?: boolean;
}

const Home: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi, I'm your MasseurMatch assistant — want to find someone nearby?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [location, setLocation] = useState("All Cities");
  const [filter, setFilter] = useState("all");
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const prompts = [
    "• Top masseurs near you",
    "• Luxury spa partners",
    "• Book last-minute session",
    "• Client favorites nearby",
    "• Exclusive deals this week",
  ];

  const cities = ["All Cities", "Dallas, TX", "Austin, TX", "Los Angeles, CA", "New York, NY", "Miami, FL"];

  const masseurs = [
    { name: "Alex Rivera", city: "Dallas, TX", status: "Available", rating: 4.9, specialty: "Deep Tissue", rate: 120, booked: 12, verified: true },
    { name: "Ethan Park", city: "Austin, TX", status: "Busy", rating: 4.7, specialty: "Sports Massage", rate: 140, booked: 8, verified: true },
    { name: "Leo Santos", city: "San Diego, CA", status: "Available", rating: 5.0, specialty: "Relaxation", rate: 100, booked: 15, verified: true },
    { name: "Andre King", city: "Houston, TX", status: "Available", rating: 4.8, specialty: "Swedish", rate: 130, booked: 10, verified: false },
    { name: "Marco Silva", city: "Miami, FL", status: "Available", rating: 4.6, specialty: "Hot Stone", rate: 150, booked: 6, verified: true },
    { name: "Ryan Lee", city: "Chicago, IL", status: "Busy", rating: 4.8, specialty: "Reflexology", rate: 110, booked: 9, verified: true },
    { name: "Chris Nolan", city: "Los Angeles, CA", status: "Available", rating: 5.0, specialty: "Thai Massage", rate: 160, booked: 14, verified: true },
    { name: "Hugo Mendes", city: "New York, NY", status: "Available", rating: 4.9, specialty: "Therapeutic", rate: 130, booked: 11, verified: true },
    { name: "Victor Chen", city: "San Francisco, CA", status: "Busy", rating: 4.5, specialty: "Aromatherapy", rate: 125, booked: 7, verified: false },
    { name: "Mateo Cruz", city: "Phoenix, AZ", status: "Available", rating: 4.8, specialty: "Stretch Therapy", rate: 135, booked: 13, verified: true },
  ];

  const filteredMasseurs = masseurs.filter(m => {
    if (location !== "All Cities" && m.city !== location) return false;
    if (filter === "available" && m.status !== "Available") return false;
    if (filter === "top-rated" && m.rating < 4.8) return false;
    if (filter === "verified" && !m.verified) return false;
    return true;
  });

  // AI Response Generator
  const getAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('hello') || lower.includes('hi')) {
      return "Hello! I'm here to help you find the perfect massage professional. What are you looking for today?";
    }
    if (lower.includes('near') || lower.includes('location')) {
      return `I found ${filteredMasseurs.length} verified professionals in ${location}. Would you like to see available ones or filter by specialty?`;
    }
    if (lower.includes('available')) {
      const available = masseurs.filter(m => m.status === 'Available').length;
      return `Currently ${available} massage professionals are available for booking. Would you like me to show you the top-rated ones?`;
    }
    if (lower.includes('price') || lower.includes('cost')) {
      return "Our professionals' rates range from $100-160 per hour. You can filter by price range or check individual profiles for exact pricing.";
    }
    if (lower.includes('book') || lower.includes('appointment')) {
      return "To book an appointment, click on any professional's card and select your preferred time slot. All bookings are confirmed instantly!";
    }
    if (lower.includes('verified')) {
      const verified = masseurs.filter(m => m.verified).length;
      return `${verified} of our professionals are verified. These therapists have completed background checks and certification verification.`;
    }
    
    return "I can help you find massage professionals by location, specialty, availability, or price. What matters most to you?";
  };

  // Typewriter effect for AI messages
  const typeMessage = (fullText: string, messageId: string) => {
    let currentText = "";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, text: currentText, typing: true } : msg
          )
        );
        index++;
      } else {
        clearInterval(interval);
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, typing: false } : msg
          )
        );
        setIsAITyping(false);
      }
    }, 30);

    return interval;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isAITyping) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsAITyping(true);

    // Generate and add AI response with typewriter effect
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        text: "",
        sender: 'ai',
        typing: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      typeMessage(aiResponse, aiMessageId);
    }, 500);
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setInputValue(prompt.replace('• ', ''));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="relative min-h-screen bg-grok-black text-grok-white overflow-x-hidden">
      <Head>
        <title>MasseurMatch - Elite Massage Professionals Nationwide</title>
        <meta name="description" content="Find verified, top-rated massage therapists near you. Book instantly." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Monochrome Background */}
      <div className="fixed inset-0 z-0 bg-grok-black"></div>

      {/* 3D Metallic Charcoal Orb */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <Sphere args={[2, 100, 200]} scale={1.3}>
            <MeshDistortMaterial
              color="#2E2E3B"
              attach="material"
              distort={0.5}
              speed={1.5}
              roughness={0.1}
              metalness={0.95}
            />
          </Sphere>
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-7xl sm:text-9xl font-bold mb-6 tracking-tight text-grok-white">
            MasseurMatch
          </h1>
          <p className="text-xl text-grok-text max-w-2xl mx-auto">
            AI-powered platform connecting you with elite massage professionals nationwide
          </p>
        </motion.div>

        {/* Interactive Grok-Style Chatbox */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-grok-card/80 backdrop-blur-xl border border-grok-border rounded-3xl shadow-grok-card overflow-hidden">
            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'ai' ? 'bg-grok-gray' : 'bg-grok-border'
                    }`}>
                      <span className="text-sm text-grok-white font-semibold">
                        {msg.sender === 'ai' ? 'AI' : 'You'}
                      </span>
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.sender === 'ai' 
                        ? 'bg-grok-gray/50 text-grok-light' 
                        : 'bg-grok-white text-grok-black'
                    }`}>
                      <p className="text-base leading-relaxed">
                        {msg.text}
                        {msg.typing && (
                          <span className="inline-block w-0.5 h-4 bg-grok-white ml-1 animate-pulse"></span>
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-6 pb-4 border-t border-grok-border pt-4">
              <div className="flex flex-wrap gap-2">
                {prompts.map((prompt, idx) => (
                  <button
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedPrompt === prompt
                        ? 'bg-grok-white text-grok-black'
                        : 'bg-grok-gray/60 text-grok-light hover:bg-grok-border'
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-grok-border bg-grok-darkest/50">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about massage professionals..."
                  className="flex-1 bg-grok-gray border border-grok-border rounded-xl px-4 py-3 text-grok-white placeholder-grok-muted focus:outline-none focus:border-grok-muted transition-colors"
                  disabled={isAITyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isAITyping}
                  className="px-6 py-3 rounded-xl bg-grok-white text-grok-black font-semibold hover:bg-grok-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location & Filters Bar */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-wrap gap-4 items-center justify-between bg-grok-card/60 backdrop-blur-lg border border-grok-border rounded-2xl p-4">
            {/* Location Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xl text-grok-muted">●</span>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-grok-gray border border-grok-border rounded-xl px-4 py-2 text-grok-white focus:outline-none focus:border-grok-muted transition-colors cursor-pointer"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All', icon: '•' },
                { id: 'available', label: 'Available Now', icon: '○' },
                { id: 'top-rated', label: '5★ Rated', icon: '★' },
                { id: 'verified', label: 'Verified', icon: '✓' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === f.id
                      ? 'bg-grok-white text-grok-black'
                      : 'bg-grok-gray text-grok-light hover:bg-grok-border'
                  }`}
                >
                  <span className="mr-1">{f.icon}</span>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Professionals Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-grok-white">
            Featured Professionals ({filteredMasseurs.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredMasseurs.map((m, idx) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-grok-card/80 backdrop-blur-lg border border-grok-border rounded-2xl p-5 hover:border-grok-muted transition-all duration-300 hover:shadow-grok-glow cursor-pointer"
                >
                  {/* Verified Badge */}
                  {m.verified && (
                    <div className="absolute top-3 right-3 bg-grok-border text-grok-light text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                      ✓ Verified
                    </div>
                  )}

                  {/* Profile Image Placeholder */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-grok-gray opacity-50 animate-pulse"></div>
                    <div className="absolute inset-1 rounded-full bg-grok-card flex items-center justify-center">
                      <span className="text-2xl text-grok-white font-bold">{m.name.charAt(0)}</span>
                    </div>
                    {/* Status Indicator */}
                    <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-grok-card ${
                      m.status === 'Available' ? 'bg-grok-white' : 'bg-grok-muted'
                    }`}></div>
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-bold text-grok-white text-center mb-1">{m.name}</h3>
                  <p className="text-xs text-grok-text text-center mb-3">● {m.city}</p>
                  
                  <div className="bg-grok-gray/40 rounded-lg px-3 py-2 mb-3 text-center">
                    <p className="text-sm text-grok-light font-semibold">{m.specialty}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-grok-white font-semibold">★ {m.rating.toFixed(1)}</span>
                    <span className="text-grok-text">Booked {m.booked}x this week</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-grok-text text-sm">From</span>
                    <span className="text-grok-white font-bold text-lg">${m.rate}/hr</span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-2.5 rounded-xl bg-grok-white text-grok-black font-semibold text-sm hover:bg-grok-light transition-all duration-300 group-hover:scale-105">
                    {m.status === 'Available' ? 'Book Now' : 'Join Waitlist'}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-16 mb-12"
        >
          <button className="px-12 py-4 rounded-full bg-grok-white text-grok-black text-lg font-bold hover:bg-grok-light hover:shadow-grok-glow transition-all duration-300 hover:scale-105">
            Join MasseurMatch Today
          </button>
          <p className="text-grok-muted text-sm mt-4">• Free for first 30 days • No credit card required</p>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
