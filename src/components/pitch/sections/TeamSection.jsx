// src/components/pitch/sections/TeamSection.jsx
const TeamSection = () => {
    const team = [
      {
        name: "Your Name",
        role: "Founder & CEO",
        description: "Experience in AI and Language Learning",
        image: "/api/placeholder/100/100" // Using placeholder as per guidelines
      },
      // Add more team members as needed
    ];
  
    return (
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <img 
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default TeamSection;