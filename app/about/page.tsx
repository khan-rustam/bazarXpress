"use client"

import Layout from "../../components/Layout"
import Image from "next/image"
import { Users, Award, Truck, Shield } from "lucide-react"
import Particles from "react-tsparticles"
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"

const features = [
  {
    icon: Users,
    title: "Customer First",
    description: "We prioritize our customers above everything else, ensuring exceptional service and satisfaction.",
  },
  {
    icon: Award,
    title: "Quality Products",
    description: "Every product is carefully selected and tested to meet our high standards of quality.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to get your orders to you as fast as possible.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your data and transactions are protected with industry-leading security measures.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80", // woman portrait
    bio: "Sarah founded BazarXpress with a vision to make quality products accessible to everyone.",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&q=80", // man portrait
    bio: "Michael ensures our operations run smoothly and efficiently across all departments.",
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Experience Director",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400&q=80", // woman portrait
    bio: "Emily leads our customer service team to provide exceptional support and experiences.",
  },
]

// Stats for the floating card
const aboutStats = [
  { value: "60M+", label: "Happy Customers" },
  { value: "105M+", label: "Grocery Products" },
  { value: "80K+", label: "Active Salesman" },
  { value: "60K+", label: "Store Worldwide" },
]

export default function About() {
  const storyRef = useRef<HTMLDivElement | null>(null)
  const statsSectionRef = useRef<HTMLDivElement | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Count up animation for stats
  useEffect(() => {
    const animateCount = (el: HTMLElement, target: number) => {
      let start = 0;
      const duration = 1200;
      const step = () => {
        start += Math.ceil(target / (duration / 16));
        if (start > target) start = target;
        // Format with suffix
        let display;
        if (target >= 1000000) display = `${Math.floor(start / 1000000)}M+`;
        else if (target >= 1000) display = `${Math.floor(start / 1000)}K+`;
        else display = `${start}+`;
        el.textContent = display;
        if (start < target) requestAnimationFrame(step);
      };
      step();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            document.querySelectorAll("[data-count]").forEach((el) => {
              const attr = el.getAttribute("data-count");
              if (attr) animateCount(el as HTMLElement, parseInt(attr));
            });
            setHasAnimated(true);
            observer.disconnect(); // Disconnect after animation to prevent re-triggering
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      if (statsSectionRef.current) {
        observer.unobserve(statsSectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface-secondary py-4 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-text-secondary hover:text-brand-primary transition-colors">Home</Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary font-medium">About</span>
          </nav>
        </div>
      </div>

      {/* Hero Section (About Us Header) */}
      <section className="relative min-h-[300px] md:min-h-[380px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
          alt="About Us Background"
          fill
          className="object-cover object-center z-0"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-inverse mb-6 drop-shadow-xl">Do You Want To Know Us?</h1>
          <p className="text-sm md:text-lg text-text-inverse/90 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium mollis ex, vel interdum augue faucibus sit amet. Proin tempor purus ac suscipit sagittis. Nunc finibus euismod enim, eu finibus nunc ullamcorper et.
          </p>
         
        </div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-text-primary">
                <p className="text-justify">
                  Founded in 2020, BazarXpress started as a small online marketplace with a big dream: to make quality
                  products accessible to everyone, everywhere. What began as a passion project has grown into a trusted
                  platform serving thousands of customers worldwide.
                </p>
                <p className="text-justify">
                  Our journey has been driven by a simple belief - that everyone deserves access to high-quality
                  products at fair prices, backed by exceptional customer service. We've built our reputation on trust,
                  reliability, and a commitment to excellence that shows in everything we do.
                </p>
                <p className="text-justify">
                  Today, we're proud to offer an extensive catalog of carefully curated products across multiple
                  categories, from the latest electronics to sustainable fashion, home essentials, and beyond.
                </p>
              </div>
            </div>
            <div className="relative group">
              <Image
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
                alt="Our Story"
                width={600}
                height={400}
                className="rounded-lg shadow-xl group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-lg bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1 group">
              <Image
                src="https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our Mission"
                width={600}
                height={400}
                className="rounded-lg shadow-xl group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-lg bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-text-primary mb-6">Our Mission</h2>
              <div className="space-y-4 text-text-primary">
                <p className="text-justify">
                  At BazarXpress, our mission is to revolutionize the online shopping experience by combining an
                  extensive product selection with unparalleled customer service and competitive pricing.
                </p>
                <p className="text-justify">
                  We strive to be more than just an e-commerce platform - we aim to be your trusted shopping companion,
                  helping you discover products that enhance your lifestyle while providing a seamless, secure, and
                  enjoyable shopping experience.
                </p>
                <p className="text-justify">
                  Our commitment extends beyond transactions to building lasting relationships with our customers,
                  partners, and communities, fostering trust and satisfaction in every interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Why Choose BazarXpress?</h2>
            <p className="text-text-primary max-w-2xl mx-auto text-center">
              We're committed to providing you with the best shopping experience through our core values and principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center bg-white rounded-xl shadow-md p-8 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-spectra/40 cursor-pointer animate-fade-in delay-${index * 100}`}
              >
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary transition-colors duration-300 shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-spectra transition-colors duration-300">{feature.title}</h3>
                <p className="text-text-primary text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Meet Our Team</h2>
            <p className="text-text-primary max-w-2xl mx-auto">
              Behind BazarXpress is a dedicated team of professionals committed to making your shopping experience
              exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-elm/40 cursor-pointer animate-fade-in delay-${index * 100}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Social icons */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="text-text-inverse hover:text-brand-primary"><FaLinkedin size={22} /></a>
                    <a href="#" className="text-text-inverse hover:text-brand-primary"><FaTwitter size={22} /></a>
                    <a href="#" className="text-text-inverse hover:text-brand-primary"><FaFacebook size={22} /></a>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-text-primary mb-1 group-hover:text-brand-primary transition-colors duration-300">{member.name}</h3>
                  <p className="text-brand-primary font-medium mb-3">{member.role}</p>
                  <p className="text-text-primary text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsSectionRef} className="py-20 bg-surface-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Our Impact in Numbers</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We're proud of our growth and the impact we've made in the e-commerce industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {aboutStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-border-primary hover:border-brand-primary/40 transition-all duration-300 group shadow-md hover:shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2 group-hover:scale-110 transition-transform duration-300" data-count={parseInt(stat.value)}>{stat.value}</div>
                  <div className="text-text-primary font-medium">{stat.label}</div>
                  <div className="w-16 h-1 bg-brand-primary rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 bg-spectra text-white p-4 rounded-full shadow-xl hover:bg-elm transition-colors animate-fade-in"
        aria-label="Back to Top"
      >
        ↑
      </button>
    </Layout>
  )
}
