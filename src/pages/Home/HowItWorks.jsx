import { FaUserPlus, FaUserCheck, FaSearch, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus size={28} />,
      title: "Create Your Profile",
      description:
        "Sign up for free and build your biodata with personal and family information to start your journey.",
      color: "bg-rose-700",
    },
    {
      icon: <FaSearch size={28} />,
      title: "Search & Filter",
      description:
        "Explore thousands of biodatas using smart filters like gender, age and division.",
      color: "bg-purple-700",
    },
    {
      icon: <FaHeart size={28} />,
      title: "Express Interest",
      description:
        "Shortlist or add biodatas to your favourites. Show interest by sending a contact request.",
      color: "bg-rose-700",
    },
    {
      icon: <FaUserCheck size={28} />,
      title: "Connect & Marry",
      description:
        "Once approved, view contact info, connect with your match, and take the next big step toward marriage!",
      color: "bg-purple-700",
    },
  ];

  return (
    <section className="w-11/12 max-w-6xl mx-auto py-16 px-4 md:px-0">
      <h2 className="text-4xl font-bold text-center mb-10 text-rose-700">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group border border-neutral-200"
          >
            <div
              className={`w-12 h-12 ${step.color} text-white flex items-center justify-center rounded-full mb-4 group-hover:scale-110 transition`}
            >
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
