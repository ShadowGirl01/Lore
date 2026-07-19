import Image from "next/image";
import { Plus } from "lucide-react";

const steps = [
  {
    no: "1",
    title: "Upload PDF",
    desc: "Add your book file",
  },
  {
    no: "2",
    title: "AI Processing",
    desc: "We analyze the content",
  },
  {
    no: "3",
    title: "Voice Chat",
    desc: "Discuss with AI",
  },
];

const HeroSection = () => {
  return (
    <section className="wrapper pt-28">
      <div className="library-hero-card">

        <div className="library-hero-content">

          {/* Left Part */}
          <div className="library-hero-text">
            <h1 className="text-6xl font-serif font-bold leading-tight">
              Your Library
            </h1>

            <p className="mt-6 max-w-sm text-lg text-[#6E655D]">
              Convert your books into interactive AI conversations.
              Listen, learn, and discuss your favorite reads.
            </p>

            <button className="mt-8 flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-xl font-semibold shadow-sm">
              <Plus size={20} />
              Add new book
            </button>
          </div>

          {/* Center Part - Desktop */}
          <div className="library-hero-illustration-desktop">
            <Image
              src="/assets/hero-illustration.png"
              alt="Books"
              width={420}
              height={320}
            />
          </div>

          {/* Center Part - Mobile */}
          <div className="library-hero-illustration">
            <Image
              src="/assets/hero-illustration.png"
              alt="Books"
              width={300}
              height={220}
            />
          </div>

          {/* Right Part */}
          <div className="library-steps-card">
            {steps.map((step) => (
              <div
                key={step.no}
                className="library-step-item mb-7 last:mb-0"
              >
                <div className="library-step-number">
                  {step.no}
                </div>

                <div>
                  <h3 className="library-step-title">
                    {step.title}
                  </h3>

                  <p className="library-step-description">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;