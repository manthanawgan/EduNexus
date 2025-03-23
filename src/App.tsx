import React, { useState, useEffect } from 'react';
import { Atom, Beaker, Calculator, GraduationCap, Users, BookOpen, Award, ArrowRight, ChevronLeft, Search, Loader2, Box, Microscope, LineChart } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeVisualization, setActiveVisualization] = useState(0);

  const visualizations = [
    {
      icon: <Box className="w-12 h-12" />,
      title: "3D Projections",
      description: "Experience geometric shapes and mathematical concepts through interactive 3D projections that bring abstract ideas to life.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: <Microscope className="w-12 h-12" />,
      title: "Molecular Structures",
      description: "Explore the building blocks of matter with detailed molecular visualizations that showcase chemical bonds and atomic arrangements.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: <LineChart className="w-12 h-12" />,
      title: "Vector Fields",
      description: "Understand complex physics concepts through dynamic vector field visualizations that demonstrate forces and mathematical relationships.",
      image: "https://images.unsplash.com/photo-1635241161466-541f065683ba?auto=format&fit=crop&q=80&w=800",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVisualization((prev) => (prev + 1) % visualizations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Learning",
      description: "Learn together with peers through shared virtual experiments"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Interactive Content",
      description: "Engage with dynamic simulations and 3D visualizations"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResult('');

    try {
      const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
      const prompt = `Explain this concept in simple terms: ${searchQuery}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setSearchResult(text);
    } catch (error) {
      setSearchResult('Sorry, I could not process your request at this moment. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleExplore = (subject: string) => {
    setSelectedSubject(subject);
    setShowWorkspace(true);
  };

  if (showWorkspace) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button 
              onClick={() => setShowWorkspace(false)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedSubject} Workspace
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8 min-h-[500px] flex items-center justify-center">
            <p className="text-xl text-gray-600">
              Interactive {selectedSubject} simulation workspace coming soon...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Welcome to Interactive Learning
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore complex topics in Physics, Chemistry, and Mathematics through interactive simulations and visualizations designed to enhance your understanding.
            </p>

            {/* AI-Powered Search Section */}
            <div className="mt-10 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything about Physics, Chemistry, or Math..."
                    className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
                  >
                    {isSearching ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>

              {searchResult && (
                <div className="mt-6 bg-white bg-opacity-90 rounded-lg p-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Here's what I found:</h3>
                  <p className="text-gray-800">{searchResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Atom className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Physics</h3>
              <p className="text-gray-600 mb-6">
                Discover the fundamental laws that govern our universe through interactive experiments and simulations.
              </p>
              <button
                onClick={() => handleExplore('Physics')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Explore Physics
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Beaker className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Chemistry</h3>
              <p className="text-gray-600 mb-6">
                Visualize molecular structures, chemical reactions, and laboratory experiments in an interactive environment.
              </p>
              <button
                onClick={() => handleExplore('Chemistry')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Explore Chemistry
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mathematics</h3>
              <p className="text-gray-600 mb-6">
                Master complex mathematical concepts through step-by-step problem solving and visual representations.
              </p>
              <button
                onClick={() => handleExplore('Mathematics')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Explore Mathematics
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Showcase */}
      <div className="bg-gray-900 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Interactive Visualizations
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Experience learning like never before with our cutting-edge visualization tools
            </p>
          </div>

          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {visualizations.map((vis, index) => (
                  <div
                    key={index}
                    className={`bg-gray-800 rounded-lg p-6 transition-all duration-500 transform ${
                      index === activeVisualization
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-50 -translate-x-4'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        index === activeVisualization ? 'bg-blue-600' : 'bg-gray-700'
                      }`}>
                        {vis.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{vis.title}</h3>
                        <p className="mt-2 text-gray-400">{vis.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative h-[400px] rounded-lg overflow-hidden">
                {visualizations.map((vis, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === activeVisualization ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={vis.image}
                      alt={vis.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Our Platform?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the future of education with our innovative learning tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-gray-400">
            <div>
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">EduNexus</span>
              </div>
              <p className="mt-2">Transforming education through interactive learning experiences.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;