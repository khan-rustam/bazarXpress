"use client"

import Layout from "../../../components/Layout"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Share2 } from "lucide-react"
import { notFound } from "next/navigation"

// Mock detailed blog posts data
const detailedBlogPosts = [
  {
    id: "1",
    title: "The Future of E-commerce: AI-Powered Shopping Experiences",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1200&q=80",
    date: "March 15, 2024",
    category: "E-commerce",
    content: `
      <p className="text-lg text-text-secondary mb-6">The e-commerce landscape is undergoing a revolutionary transformation, driven by artificial intelligence and machine learning. As we move further into 2024, these technologies are reshaping how consumers shop and how businesses operate.</p>
      
      <h2 className="text-3xl font-bold text-text-primary mt-8 mb-4">AI-Powered Personalization</h2>
      <p className="mb-4">Modern e-commerce platforms are leveraging AI to create highly personalized shopping experiences. By analyzing user behavior, purchase history, and browsing patterns, these systems can predict customer preferences with remarkable accuracy.</p>
      
      <div class="bg-surface-secondary p-6 rounded-lg my-6">
        <h3 class="text-xl font-semibold mb-3">Key Benefits:</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>Personalized product recommendations</li>
          <li>Dynamic pricing optimization</li>
          <li>Intelligent inventory management</li>
          <li>Automated customer service</li>
        </ul>
      </div>

      <Image src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=800&q=80" alt="AI in E-commerce" width={800} height={450} className="rounded-lg my-8" />

      <h2 className="text-3xl font-bold text-text-primary mt-8 mb-4">The Rise of Voice Commerce</h2>
      <p className="mb-4">Voice shopping is becoming increasingly popular, with more consumers using smart speakers and voice assistants to make purchases. This trend is expected to grow significantly in the coming years.</p>

      <h2 className="text-3xl font-bold text-text-primary mt-8 mb-4">Augmented Reality Shopping</h2>
      <p className="mb-4">AR technology is revolutionizing the way customers interact with products online. Virtual try-ons, 3D product visualization, and AR-powered shopping experiences are becoming standard features in modern e-commerce platforms.</p>

      <div class="bg-surface-secondary p-6 rounded-lg my-6">
        <h3 class="text-xl font-semibold mb-3">Future Predictions:</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>Seamless omnichannel experiences</li>
          <li>Advanced fraud detection systems</li>
          <li>Hyper-personalized marketing</li>
          <li>Automated supply chain optimization</li>
        </ul>
      </div>

      <p className="mt-8 text-lg">The future of e-commerce is bright, with AI and machine learning leading the way in creating more intuitive, efficient, and personalized shopping experiences for consumers worldwide.</p>
    `,
  },
  {
    id: "2",
    title: "Sustainable Fashion: The New Normal in Retail",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    date: "March 12, 2024",
    category: "Fashion",
    content: `
      <p className="text-lg text-text-secondary mb-6">The fashion industry is undergoing a significant transformation as sustainability becomes a core focus for brands and consumers alike. This shift is not just a trend but a fundamental change in how we approach fashion.</p>

      <h2 className="text-3xl font-bold text-text-primary mt-8 mb-4">The Impact of Fast Fashion</h2>
      <p className="mb-4">The traditional fast fashion model has contributed significantly to environmental degradation and social issues. However, a new wave of sustainable fashion brands is changing the landscape.</p>

      <Image src="https://images.unsplash.com/photo-1616763428987-a2267d3e6918?auto=format&fit=crop&w=800&q=80" alt="Sustainable Fashion" width={800} height={450} className="rounded-lg my-8" />

      <div class="bg-surface-secondary p-6 rounded-lg my-6">
        <h3 class="text-xl font-semibold mb-3">Sustainable Practices:</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>Ethical manufacturing processes</li>
          <li>Eco-friendly materials</li>
          <li>Circular fashion initiatives</li>
          <li>Transparent supply chains</li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-text-primary mt-8 mb-4">Consumer Awareness</h2>
      <p className="mb-4">Today's consumers are more informed and conscious about their purchasing decisions. They're actively seeking brands that align with their values and demonstrate commitment to sustainability.</p>

      <p className="mt-8 text-lg">The future of fashion lies in sustainable practices, and brands that adapt to this new normal will thrive in the evolving retail landscape.</p>
    `,
  },
  {
    id: "3",
    title: "Home Organization Tips That Actually Work",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    date: "March 10, 2024",
    author: "Home & Living",
    category: "Home & Kitchen",
    content: `
      <p className="mb-4">Transform your living space with these practical organization strategies. From decluttering to storage solutions, make your home more functional and enjoyable.</p>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">The KonMari Method</h3>
      <p className="mb-4">Marie Kondo's approach emphasizes decluttering by keeping only items that "spark joy." It encourages a mindful approach to your belongings, leading to a more organized and serene home.</p>
      <Image src="https://images.unsplash.com/photo-1560447385-d68a9947814b?auto=format&fit=crop&w=800&q=80" alt="Home Organization" width={800} height={450} className="rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Storage Solutions</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Utilize vertical space with shelves and stackable bins.</li>
        <li>Invest in multi-functional furniture with hidden storage.</li>
        <li>Use drawer dividers and organizers for smaller items.</li>
        <li>Label everything for easy access and identification.</li>
      </ul>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Daily Habits for an Organized Home</h3>
      <ol className="list-decimal list-inside mb-4 pl-4">
        <li>Make your bed every morning.</li>
        <li>Put things away immediately after use.</li>
        <li>Dedicate 15 minutes daily to tidying up.</li>
        <li>Declutter one small area each week.</li>
        <li>Avoid bringing unnecessary items into your home.</li>
      </ol>
      <p className="mt-8 text-lg">By adopting these habits and strategies, you can maintain a clutter-free and functional home that supports your well-being.</p>
    `,
  },
  {
    id: "4",
    title: "The Ultimate Fitness Equipment Buying Guide",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80",
    date: "March 8, 2024",
    author: "Fitness Expert",
    category: "Sports & Fitness",
    content: `
      <p className="mb-4">Whether you're setting up a home gym or upgrading your current setup, this guide will help you choose the right equipment for your fitness goals. From cardio machines to strength training tools, we cover it all.</p>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Cardio Equipment</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Treadmills: Great for running and walking, various models available.</li>
        <li>Ellipticals: Low-impact, full-body workout.</li>
        <li>Stationary Bikes: Excellent for cycling enthusiasts, indoor training.</li>
        <li>Rowing Machines: Full-body workout, ideal for endurance.</li>
      </ul>
      <Image src="https://images.unsplash.com/photo-1534367980242-b13c7136015b?auto=format&fit=crop&w=800&q=80" alt="Fitness Equipment" width={800} height={450} className="rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Strength Training Equipment</h3>
      <ol className="list-decimal list-inside mb-4 pl-4">
        <li>Dumbbells and Barbells: Versatile for various exercises.</li>
        <li>Resistance Bands: Portable and effective for strength and flexibility.</li>
        <li>Kettlebells: Great for dynamic movements and strength.</li>
        <li>Weight Benches: Essential for a full range of exercises.</li>
        <li>Pull-up Bar: Simple yet effective for upper body strength.</li>
      </ol>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Functional Training & Accessories</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Yoga Mats: For stretching, yoga, and floor exercises.</li>
        <li>Jump Ropes: Excellent for cardio and coordination.</li>
        <li>Foam Rollers: For muscle recovery and flexibility.</li>
        <li>Stability Balls: Enhances core strength and balance.</li>
      </ul>
      <p className="mt-8 text-lg">Consider your fitness goals, available space, and budget when selecting equipment. A well-equipped home gym can significantly boost your fitness journey.</p>
    `,
  },
  {
    id: "5",
    title: "Kitchen Essentials for Every Home Cook",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    date: "March 5, 2024",
    author: "Culinary Team",
    category: "Home & Kitchen",
    content: `
      <p className="mb-4">Discover the must-have kitchen tools and appliances that will elevate your cooking game. Whether you're a beginner or an experienced chef, these essentials will make your culinary adventures more enjoyable and efficient.</p>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Cookware Essentials</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Non-stick Frying Pan: Versatile for eggs, pancakes, and delicate foods.</li>
        <li>Stainless Steel Pot Set: Durable for boiling, simmering, and sauces.</li>
        <li>Baking Sheet: Essential for roasting vegetables, baking cookies.</li>
        <li>Dutch Oven: Ideal for stews, braises, and baking bread.</li>
      </ul>
      <Image src="https://images.unsplash.com/photo-1583726581896-d80a18413156?auto=format&fit=crop&w=800&q=80" alt="Kitchen Essentials" width={800} height={450} className="rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Utensils & Gadgets</h3>
      <ol className="list-decimal list-inside mb-4 pl-4">
        <li>Chef's Knife: A good quality knife is indispensable.</li>
        <li>Cutting Board: Protects your countertops and knife blades.</li>
        <li>Measuring Cups and Spoons: For accurate ingredient measurement.</li>
        <li>Spatulas and Whisks: Versatile for mixing, flipping, and stirring.</li>
        <li>Colander: For draining pasta, washing produce.</li>
      </ol>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Small Appliances</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Blender: For smoothies, soups, and sauces.</li>
        <li>Food Processor: Speeds up chopping, shredding, and pureeing tasks.</li>
        <li>Toaster or Toaster Oven: For quick breakfasts and reheating.</li>
        <li>Coffee Maker: For your daily caffeine fix.</li>
      </ul>
      <p className="mt-8 text-lg">Equipping your kitchen with these fundamental tools will set you up for culinary success and make cooking a joy.</p>
    `,
  },
  {
    id: "6",
    title: "Smart Shopping: How to Find the Best Deals",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1200&q=80",
    date: "March 3, 2024",
    author: "Shopping Expert",
    category: "Shopping Tips",
    content: `
      <p className="mb-4">Learn insider tips and tricks for finding the best deals online. From timing your purchases to using comparison tools effectively, become a smart shopper and save money.</p>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Timing Your Purchases</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Seasonal Sales: Look for discounts during holidays and end-of-season clearances.</li>
        <li>Mid-week Shopping: Prices can sometimes fluctuate during the week, with better deals mid-week.</li>
        <li>New Product Releases: Old models often go on sale when new ones are released.</li>
      </ul>
      <Image src="https://images.unsplash.com/photo-1620712948270-b186b51513d7?auto=format&fit=crop&w=800&q=80" alt="Smart Shopping" width={800} height={450} className="rounded-lg mb-4" />
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Leveraging Technology</h3>
      <ol className="list-decimal list-inside mb-4 pl-4">
        <li>Price Comparison Websites/Apps: Use tools to compare prices across different retailers.</li>
        <li>Browser Extensions: Many extensions automatically apply coupon codes and notify you of price drops.</li>
        <li>Email Subscriptions: Sign up for newsletters from your favorite stores for exclusive deals.</li>
        <li>Cashback Apps: Earn money back on your purchases.</li>
      </ol>
      <h3 className="text-2xl font-semibold text-text-primary mb-3">Smart Habits</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Create a Shopping List: Avoid impulse buys by sticking to a list.</li>
        <li>Set a Budget: Determine how much you can spend beforehand.</li>
        <li>Read Reviews: Check product reviews before making a purchase.</li>
        <li>Don't Rush: Take your time to research and compare.</li>
      </ul>
      <p className="mt-8 text-lg">Becoming a smart shopper takes practice, but with these tips, you'll be well on your way to saving money and making informed purchasing decisions.</p>
    `,
  },
]

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = params;
  const post = detailedBlogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface-secondary py-4 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm flex items-center space-x-2">
            <Link href="/" className="text-text-secondary hover:text-brand-primary transition-colors">Home</Link>
            <span className="text-text-tertiary">/</span>
            <Link href="/blog" className="text-text-secondary hover:text-brand-primary transition-colors">Blog</Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Blog Post Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6 leading-tight">{post.title}</h1>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-text-secondary">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>
            
            {/* Share Button */}
            <button className="text-text-secondary hover:text-brand-primary transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="mb-8">
            <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video mb-8 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg mx-auto text-text-primary" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-border-primary">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-text-secondary">Share this article:</span>
                <button className="text-text-secondary hover:text-brand-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              <Link href="/blog" className="btn-brand">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
} 