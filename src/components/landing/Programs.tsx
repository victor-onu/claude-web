import {
  GraduationCap,
  Code,
  Trophy,
  Building2,
  Users,
  Rocket,
} from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "From Campus to Tech Careers",
    description:
      "Outreach and awareness sessions across university campuses, inspiring students and building awareness of tech opportunities.",
    color: "from-purple-deep to-purple-electric",
  },
  {
    icon: Code,
    title: "Code for Growth",
    description:
      "Structured bootcamps in coding, design, product management, and digital skills for hands-on learning.",
    color: "from-teal to-purple-electric",
  },
  {
    icon: Trophy,
    title: "TektonX Competitions",
    description:
      "Inter-school and inter-community hackathons, coding contests, and innovation challenges.",
    color: "from-yellow-brand to-purple-electric",
  },
  {
    icon: Building2,
    title: "TektonX Hub",
    description:
      "Physical and virtual hub for young innovators with coworking spaces, training programs, and incubation support.",
    color: "from-green-light to-teal",
  },
  {
    icon: Users,
    title: "Mentorship & Career Support",
    description:
      "Pairing participants with experienced tech professionals for career guidance and internship support.",
    color: "from-purple-electric to-blue-deep",
  },
  {
    icon: Rocket,
    title: "Product-Building Labs",
    description:
      "A space where young people come together to co-create products and solutions for real impact.",
    color: "from-blue-deep to-purple-deep",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-electric font-semibold text-sm uppercase tracking-wider">
            What We Offer
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Our <span className="gradient-text">Programs</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We offer a range of programs designed to meet you where you are and take you
            where you want to go in tech.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.title}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <program.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-deep transition-colors">
                {program.title}
              </h3>
              <p className="relative text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
