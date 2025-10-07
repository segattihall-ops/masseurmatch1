import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const message = "Hi, I'm your MasseurMatch assistant — want to find someone nearby?";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i++));
      if (i > message.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const masseurs = [
    {
      name: "Alex Rivera",
      city: "Dallas, TX",
      status: "Available",
      rating: 4.9,
      specialty: "Deep Tissue Massage",
      rate: 120,
      image: "/images/alex.png",
    },
    {
      name: "Ethan Park",
      city: "Austin, TX",
      status: "Busy",
      rating: 4.7,
      specialty: "Sports Massage",
      rate: 140,
      image: "/images/ethan.png",
    },
    {
      name: "Leo Santos",
      city: "San Diego, CA",
      status: "Available",
      rating: 5.0,
      specialty: "Relaxation Massage",
      rate: 100,
      image: "/images/leo.png",
    },
    {
      name: "Andre King",
      city: "Houston, TX",
      status: "Available",
      rating: 4.8,
      specialty: "Swedish Massage",
      rate: 130,
      image: "/images/andre.png",
    },
    {
      name: "Marco Silva",
      city: "Miami, FL",
      status: "Available",
      rating: 4.6,
      specialty: "Hot Stone Therapy",
      rate: 150,
      image: "/images/marco.png",
    },
    {
      name: "Ryan Lee",
      city: "Chicago, IL",
      status: "Busy",
      rating: 4.8,
      specialty: "Reflexology",
      rate: 110,
      image: "/images/ryan.png",
    },
    {
      name: "Chris Nolan",
      city: "Los Angeles, CA",
      status: "Available",
      rating: 5.0,
      specialty: "Thai Massage",
      rate: 160,
      image: "/images/chris.png",
    },
    {
      name: "Hugo Mendes",
      city: "New York, NY",
      status: "Available",
      rating: 4.9,
      specialty: "Therapeutic Massage",
      rate: 130,
      image: "/images/hugo.png",
    },
    {
      name: "Victor Chen",
      city: "San Francisco, CA",
      status: "Busy",
      rating: 4.5,
      specialty: "Aromatherapy Massage",
      rate: 125,
      image: "/images/victor.png",
    },
    {
      name: "Mateo Cruz",
      city: "Phoenix, AZ",
      status: "Available",
      rating: 4.8,
      specialty: "Stretch Therapy",
      rate: 135,
      image: "/images/mateo.png",
    },
    {
      name: "Julian Torres",
      city: "Seattle, WA",
      status: "Available",
      rating: 4.7,
      specialty: "Shiatsu Massage",
      rate: 120,
      image: "/images/julian.png",
    },
    {
      name: "Lucas Romero",
      city: "Atlanta, GA",
      status: "Available",
      rating: 4.9,
      specialty: "Lomi-Lomi Massage",
      rate: 150,
      image: "/images/lucas.png",
    },
    {
      name: "Ben Garcia",
      city: "Las Vegas, NV",
      status: "Available",
      rating: 4.6,
      specialty: "Prenatal Massage",
      rate: 115,
      image: "/images/ben.png",
    },
    {
      name: "Noah Brooks",
      city: "Denver, CO",
      status: "Busy",
      rating: 4.8,
      specialty: "Trigger Point Therapy",
      rate: 145,
      image: "/images/noah.png",
    },
    {
      name: "Adrian Silva",
      city: "Orlando, FL",
      status: "Available",
      rating: 5.0,
      specialty: "Couples Massage",
      rate: 170,
      image: "/images/adrian.png",
    },
  ];

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#0B0C0E] text-white overflow-hidden px-4">
      <Head>
        <title>MasseurMatch</title>
        <meta name="description" content="Connecting professional masseurs with clients across the nation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 3D Hologram Orb Background */}
      <div className="absolute inset-0 opacity-25 z-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={1.2} />
          <Sphere args={[1.8, 100, 200]} scale={1.4}>
            <MeshDistortMaterial
              color="#B393D3"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={1}
            />
          </Sphere>
        </Canvas>
      </div>

      {/* Hero Section */}
      <div className="z-10 text-center mt-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text 
                     bg-gradient-to-r from-[#D9D9D9] via-[#A1A8C3] to-[#E3E3E3]
                     drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse"
        >
          MasseurMatch
        </motion.h1>

        {/* Chat Box */}
        <div className="mt-10 bg-[#121416]/70 backdrop-blur-md border border-[#B393D3]/40 
                        rounded-2xl p-5 max-w-xl mx-auto text-gray-300 shadow-md">
          {text || "‎"}
        </div>

        {/* Join Us Button */}
        <button
          className="mt-8 px-10 py-3 rounded-full bg-gradient-to-r from-[#B393D3] to-[#F5C16C] 
                     text-black font-semibold hover:scale-105 transition-transform shadow-md"
        >
          Join Us
        </button>
      </div>

      {/* Featured Masseurs Section */}
      <div className="z-10 mt-20 w-full max-w-7xl overflow-x-auto flex gap-6 pb-10 scrollbar-hide px-6">
        {masseurs.map((m) => (
          <div
            key={m.name}
            className="flex-shrink-0 w-[320px] bg-[#1A1C1E]/60 backdrop-blur-lg border border-[#B393D3]/20 
                       rounded-2xl p-5 hover:-translate-y-2 transition-transform shadow-md"
          >
            <div className="flex items-center">
              <img
                src={m.image}
                alt={m.name}
                className="w-20 h-20 object-contain rounded-full bg-transparent mr-4"
                loading="lazy"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <p className="text-xs text-gray-400">{m.city}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      m.status === "Available" ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></span>
                  <span className="text-xs text-gray-300">{m.status}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#B393D3] mt-2">{m.specialty}</p>
            <p className="text-xs text-yellow-400 mt-1">⭐ {m.rating.toFixed(1)} / 5</p>
            <p className="text-xs text-gray-400 mt-1">
              Starting at <span className="text-[#F5C16C]">${m.rate}/hr</span>
            </p>
            <button className="mt-3 w-full px-4 py-1.5 text-xs rounded-full 
                               bg-gradient-to-r from-[#B393D3] to-[#F5C16C] 
                               text-black font-semibold hover:scale-105 transition-transform shadow-sm">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
