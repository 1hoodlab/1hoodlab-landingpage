"use client";
import Link from "next/link";
import Image from "next/image";
import { Moon, User, ChevronDown, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const NetworkAnimation = dynamic(
  () => import("../components/NetworkAnimation"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-50" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="text-2xl relative">
                <div className="absolute -inset-2 bg-blue-500/20 blur-sm rounded-full" />
                <Moon className="w-8 h-8 relative" />
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Solutions
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Resources
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <User className="w-4 h-4" />
              <span className="text-sm">Get Started</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <NetworkAnimation />
        </div>

        {/* Floating Elements */}
        <div className="absolute left-20 top-40 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-sm">Smart Contracts</span>
          </div>
        </div>

        <div className="absolute right-20 top-40 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2">
            <span className="text-sm">DeFi Solutions</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          </div>
        </div>

        <div className="absolute left-32 bottom-40 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
            <span className="text-sm">Asset Security</span>
          </div>
        </div>

        <div className="absolute right-32 bottom-40 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2">
            <span className="text-sm">Blockchain Innovation</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            1HOODLAB
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-300">
            Revolutionizing Blockchain Technology
          </h2>

          <p className="text-gray-400 max-w-2xl mb-12">
            Empowering the future of decentralized finance with cutting-edge
            blockchain solutions and innovative smart contract technology.
          </p>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] flex items-center gap-2">
              <span>Explore Our Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Get Started
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-8 flex items-center gap-2 text-gray-400">
          <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center">
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="text-sm">Scroll to discover more</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Core Offerings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Smart Contracts",
                description:
                  "Develop and deploy secure, efficient smart contracts tailored to your specific needs.",
                icon: "🔗",
              },
              {
                title: "DeFi Integration",
                description:
                  "Seamlessly integrate decentralized finance solutions into your existing systems.",
                icon: "💱",
              },
              {
                title: "Blockchain Security",
                description:
                  "Implement cutting-edge security measures to protect your assets and transactions.",
                icon: "🛡️",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-gradient-to-t from-transparent to-black/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Blockchain Experience?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Join the 1Hoodlab ecosystem and unlock the full potential of
            blockchain technology for your business.
          </p>
          <button className="px-8 py-4 bg-white text-black rounded-full hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] text-lg font-semibold">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Partners */}
      <footer className="relative z-10 py-16 bg-black/50 backdrop-blur-md border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-gray-400 mb-12">
            Trusted by Industry Leaders
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            <Image
              src="/placeholder.svg"
              alt="Partner 1"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
            <Image
              src="/placeholder.svg"
              alt="Partner 2"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
            <Image
              src="/placeholder.svg"
              alt="Partner 3"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
            <Image
              src="/placeholder.svg"
              alt="Partner 4"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
            <Image
              src="/placeholder.svg"
              alt="Partner 5"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
