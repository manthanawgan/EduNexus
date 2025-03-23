import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Atom, Beaker, Calculator, GraduationCap, Users, BookOpen, Award, ArrowRight, ChevronLeft, Search, Loader2, Box, Microscope, LineChart, FlaskRound as Flask, Dna, Shapes, FunctionSquare as Function, Grid as Grid3, Projector as Vector } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState('');
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

  const physicsSimulations = [
    {
      id: 'pendulum',
      title: 'Simple Pendulum',
      description: 'Explore the motion of a simple pendulum and understand periodic motion.',
      icon: <Box className="w-6 h-6" />,
      difficulty: 'Beginner'
    },
    {
      id: 'projectile',
      title: 'Projectile Motion',
      description: 'Visualize the path of objects under the influence of gravity.',
      icon: <ArrowRight className="w-6 h-6" />,
      difficulty: 'Intermediate'
    },
    {
      id: 'waves',
      title: 'Wave Motion',
      description: 'Study wave propagation and interference patterns.',
      icon: <LineChart className="w-6 h-6" />,
      difficulty: 'Advanced'
    }
  ];

  const chemistrySimulations = [
    {
      id: 'reaction',
      title: 'Chemical Reactions',
      description: 'Visualize chemical reactions and understand reaction mechanisms.',
      icon: <Flask className="w-6 h-6" />,
      difficulty: 'Intermediate'
    },
    {
      id: 'molecular',
      title: 'Molecular Structure',
      description: 'Explore 3D molecular structures and chemical bonds.',
      icon: <Dna className="w-6 h-6" />,
      difficulty: 'Beginner'
    },
    {
      id: 'equilibrium',
      title: 'Chemical Equilibrium',
      description: 'Study dynamic equilibrium in chemical reactions.',
      icon: <Shapes className="w-6 h-6" />,
      difficulty: 'Advanced'
    }
  ];

  const mathSimulations = [
    {
      id: 'vectors',
      title: 'Vector Operations',
      description: 'Visualize vector addition, subtraction, and dot products.',
      icon: <Vector className="w-6 h-6" />,
      difficulty: 'Intermediate'
    },
    {
      id: 'linear',
      title: 'Linear Transformations',
      description: 'Explore matrix operations and linear transformations.',
      icon: <Grid3 className="w-6 h-6" />,
      difficulty: 'Advanced'
    },
    {
      id: 'functions',
      title: '3D Functions',
      description: 'Visualize three-dimensional functions and surfaces.',
      icon: <Function className="w-6 h-6" />,
      difficulty: 'Beginner'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVisualization((prev) => (prev + 1) % visualizations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResult('');

    try {
      const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
      const prompt = `Explain this ${selectedSubject.toLowerCase() || 'science'} concept in simple terms: ${searchQuery}`;
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
    setSelectedSimulation('');
  };

  const getSimulations = () => {
    switch (selectedSubject) {
      case 'Physics':
        return physicsSimulations;
      case 'Chemistry':
        return chemistrySimulations;
      case 'Mathematics':
        return mathSimulations;
      default:
        return [];
    }
  };

  const renderSimulationContent = () => {
    if (!selectedSimulation) return null;

    const commonClasses = "bg-white p-8 rounded-lg shadow-lg";
    const buttonClasses = "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300";
    const inputClasses = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={commonClasses}
      >
        <h3 className="text-2xl font-bold mb-4">{
          getSimulations().find(sim => sim.id === selectedSimulation)?.title
        } Simulation</h3>
        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          <p className="text-gray-500">Simulation loading...</p>
        </div>
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Parameter 1</label>
            <input type="range" className={inputClasses} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Parameter 2</label>
            <input type="range" className={inputClasses} />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={buttonClasses}
          >
            Start Simulation
          </motion.button>
        </div>
      </motion.div>
    );
  };

  if (showWorkspace) {
    return (
      <div className="min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white shadow"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => setShowWorkspace(false)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Home
            </motion.button>
          </div>
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            {selectedSubject} Workspace
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Available Simulations</h3>
                <div className="space-y-4">
                  {getSimulations().map((sim, index) => (
                    <motion.button
                      key={sim.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedSimulation(sim.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        selectedSimulation === sim.id
                          ? 'bg-blue-50 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {sim.icon}
                        <span className="ml-2 font-medium">{sim.title}</span>
                      </div>
                      <p className="text-sm text-gray-600">{sim.description}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                        sim.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        sim.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sim.difficulty}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-3">
              {selectedSimulation ? (
                renderSimulationContent()
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg p-8 text-center"
                >
                  <Atom className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Simulation</h3>
                  <p className="text-gray-600">
                    Choose a simulation from the left panel to begin exploring {selectedSubject.toLowerCase()} concepts interactively.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  {/* Navbar */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white shadow-sm"
  >
    <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <GraduationCap className="w-8 h-8 text-blue-500" />
        <span className="ml-2 text-xl font-bold text-gray-900">EduNexus</span>
        <div className="flex-grow"></div>
        {/* Optional nav items could go here */}
      </div>
    </div>
  </motion.div>



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700"
      >
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              Welcome to Interactive Learning
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Explore complex topics in Physics, Chemistry, and Mathematics through interactive simulations and visualizations designed to enhance your understanding.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 max-w-xl mx-auto"
            >
              <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything about Physics, Chemistry, or Math..."
                    className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
                  >
                    {isSearching ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </form>

              {searchResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-white bg-opacity-90 rounded-lg p-6 text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Here's what I found:</h3>
                  <p className="text-gray-800">{searchResult}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Subject Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Physics',
              icon: <Atom className="w-8 h-8 text-red-600" />,
              color: 'red',
              buttonClass: 'bg-red-600 hover:bg-red-700', // Explicit red class
              description: 'Discover the fundamental laws that govern our universe through interactive experiments and simulations.'
            },
            {
              title: 'Chemistry',
              icon: <Beaker className="w-8 h-8 text-green-600" />,
              color: 'green',
              buttonClass: 'bg-green-600 hover:bg-green-700', // Explicit green class
              description: 'Visualize molecular structures, chemical reactions, and laboratory experiments in an interactive environment.'
            },
            {
              title: 'Mathematics',
              icon: <Calculator className="w-8 h-8 text-blue-600" />,
              color: 'blue',
              buttonClass: 'bg-blue-600 hover:bg-blue-700', // Keep blue for math
              description: 'Master complex mathematical concepts through step-by-step problem solving and visual representations.'
            }
          ].map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`bg-${subject.color}-100 rounded-full w-16 h-16 flex items-center justify-center mb-4`}
                >
                  {subject.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{subject.title}</h3>
                <p className="text-gray-600 mb-6">{subject.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleExplore(subject.title)}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white ${subject.buttonClass} transition-all duration-300`}
                >
                  Explore {subject.title}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visualization Showcase */}
      <div className="bg-gray-900 py-24 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Interactive Visualizations
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Experience learning like never before with our cutting-edge visualization tools
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {visualizations.map((vis, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`bg-gray-800 rounded-lg p-6 transition-all duration-500 transform hover:scale-105 ${
                      index === activeVisualization
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-50 -translate-x-4'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                        className={`p-3 rounded-full ${
                          index === activeVisualization ? 'bg-blue-600' : 'bg-gray-700'
                        }`}
                      >
                        {vis.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{vis.title}</h3>
                        <p className="mt-2 text-gray-400">{vis.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-lg overflow-hidden"
              >
                {visualizations.map((vis, index) => (
                  <motion.div
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
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Our Platform?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience the future of education with our innovative learning tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-gray-400">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-white">EduNexus</span>
              </div>
              <p className="mt-2">Transforming education through interactive learning experiences.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Community</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;