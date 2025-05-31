// src/components/pitch/sections/FinancialProjections.jsx
const FinancialProjections = () => {
    return (
      <section className="mb-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Financial Projections</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Revenue Streams</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Subscription fees
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Enterprise licenses
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                API access fees
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Educational partnerships
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Growth Projections</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Year 1</h4>
                <p className="text-gray-600">Market validation and initial user base</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Year 2</h4>
                <p className="text-gray-600">200% user growth, feature expansion</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold">Year 3</h4>
                <p className="text-gray-600">International market entry, mobile launch</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default FinancialProjections;