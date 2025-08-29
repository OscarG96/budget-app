import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

const IndexPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === "loading") {
    return <Spinner loading={status === "loading"} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4">
        <h2 className="text-4xl font-bold text-gray-900">
          Take Control of Your Finances with Ease!
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Track expenses, set budgets, and gain financial insights—all in one place.
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/register" className="bg-green-500 text-white px-6 py-3 rounded-md text-lg hover:bg-green-600">
            Get Started
          </Link>
          <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600">
            Try Demo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h3 className="text-3xl font-semibold text-gray-900">Why Choose BudgetMaster?</h3>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-lg text-gray-700">
          {[
            { icon: "📊", title: "Track Expenses Easily", description: "Log and categorize spending" },
            { icon: "💰", title: "Manage Your Income", description: "Keep track of all sources" },
            { icon: "📅", title: "Set Budgets & Goals", description: "Stay within your financial limits" },
            { icon: "📈", title: "Visual Reports", description: "See where your money goes" },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl">{feature.icon}</span>
              <p><strong>{feature.title}</strong> - {feature.description}</p>
            </div>
          ))}
        </div>
      </section>      
    </div>
  );
};

export default IndexPage;
