import Pricing from "@/components/ui/Pricing";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowDownIcon, BookOpen, LineChart, NotebookTabsIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const font = Poppins({ weight: ["600", "700"], subsets: ["latin"] });

export default async function Home() {
    const session = await getServerSession();
    if (session) {
        return redirect("/projects");
    }

    return (
        <>
            {/* Hero Section */}
            <main className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-purple-500">
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h1 className={`text-4xl md:text-6xl font-bold ${font.className}`}>
                            Learn & Grow Through Your
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                                {" "}Trading Journey
                            </span>
                        </h1>
                        
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Journal your trades, analyze your performance, and become a better trader 
                            with data-driven insights.
                        </p>

                        <div className="flex gap-4 justify-center">
                            <Link href="/auth/signup">
                                <Button size="lg" className="rounded-full">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button size="lg" variant="outline" className="rounded-full">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="banner-wrapper relative bg-gray-200 pt-[1px] px-[1px] rounded-xl max-w-5xl mx-auto overflow-hidden">
                            <div className="banner-content relative mx-auto z-0 bg-white rounded-xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10" />
                                <Image
                                    src="/journal.png"
                                    alt="Trading Journal Dashboard"
                                    width={1200}
                                    height={600}
                                    className="rounded-xl w-full h-full"
                                />
                            </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className={`text-3xl font-bold ${font.className}`}>
                                Everything you need to succeed
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="p-6 rounded-xl bg-gray-50">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Pricing defaultValue="monthly" />
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold">Company</h3>
                                <div className="flex flex-col space-y-3">
                                    <Link href="/blog" className="hover:text-white transition">Blog</Link>
                                    <Link href="/about" className="hover:text-white transition">About</Link>
                                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold">Legal</h3>
                                <div className="flex flex-col space-y-3">
                                    <Link href="/privacypolicy" className="hover:text-white transition">Privacy Policy</Link>
                                    <Link href="/toc" className="hover:text-white transition">Terms of Service</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}

const features = [
    {
        title: "Trade Journal",
        description: "Log and track all your trades with detailed analytics",
        icon: NotebookTabsIcon,
    },
    {
        title: "Performance Metrics",
        description: "Get insights into your trading patterns and performance",
        icon: LineChart,
    },
    {
        title: "Learning Tools",
        description: "Access educational resources and improve your strategy",
        icon: BookOpen,
    },
];
