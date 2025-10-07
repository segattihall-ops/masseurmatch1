import type { NextPage } from "next";
import Head from "next/head";
import FancyHeader from "../components/FancyHeader";
import HologramOrb from "../components/HologramOrb";
import ParticleField from "../components/ParticleField";

const Home: NextPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden" style={{ background: 'radial-gradient(circle at center, #0b0b0b 30%, #000 100%)' }}>
      <Head>
        <title>MasseurMatch</title>
        <meta name="description" content="Connecting professional masseurs with clients across the nation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ParticleField />
      <HologramOrb />
      <div className="z-10">
        <FancyHeader />
        <p className="text-gray-400 mt-6 max-w-md mx-auto">
          Discover elite massage professionals near you — powered by AI.
        </p>
      </div>
    </div>
  );
};

export default Home;
