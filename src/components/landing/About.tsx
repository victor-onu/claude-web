import { Heart, Globe, Lightbulb, Users2, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Access for All",
    description: "We remove barriers to tech education and opportunities.",
  },
  {
    icon: Lightbulb,
    title: "Empowerment",
    description: "We equip young people to build sustainable careers and solutions.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "We nurture creativity and problem-solving with a future-focused mindset.",
  },
  {
    icon: Users2,
    title: "Community",
    description: "We foster collaboration, networking, and shared growth.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We remain transparent, ethical, and people-centered in all we do.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-electric font-semibold text-sm uppercase tracking-wider">
            About Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Tekton means <span className="gradient-text">Builder</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            TektonX Labs is a youth-focused tech empowerment and innovation lab dedicated to
            helping young people across Africa discover, learn, and create in technology.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-purple-electric/30 transition-colors">
            <div className="w-12 h-12 bg-purple-deep/10 rounded-xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-purple-deep" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become Africa&apos;s most impactful launchpad for young innovators, transforming
              untapped potential into global tech talent and solutions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-purple-electric/30 transition-colors">
            <div className="w-12 h-12 bg-purple-electric/10 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-purple-electric" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower young people with the skills, mentorship, and opportunities needed to
              succeed in technology and innovation, starting from underserved regions.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900">Our Core Values</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:border-purple-electric/30 hover:shadow-lg transition-all text-center group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-deep to-purple-electric rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <value.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-sm text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
