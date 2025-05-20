import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Laugh, Image, Share2, Download, Sparkles } from 'lucide-react';
import { memeTemplates } from '../data/memeTemplates';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredTemplates = memeTemplates.slice(0, 4);

  return (
    <div className="space-y-16 pb-10">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-3xl" />
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 ml-2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Create <span className="text-primary-600">Epic Memes</span> in Seconds
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Express yourself with the ultimate meme generator. Choose from popular templates, 
              customize text, and share your creations with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <button
                onClick={() => navigate('/create')}
                className="btn btn-primary py-3 px-8 text-lg flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                <span>Create A Meme</span>
              </button>
              <button
                onClick={() => navigate('/gallery')}
                className="btn btn-outline py-3 px-8 text-lg"
              >
                Browse Gallery
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute top-6 left-6 right-12 bottom-12 bg-gray-200 rounded-xl transform rotate-6 opacity-70" />
              <div className="absolute top-0 left-0 right-6 bottom-6 bg-gray-300 rounded-xl transform -rotate-3 opacity-70" />
              <img
                src="https://i.imgflip.com/4t0m5.jpg"
                alt="Meme preview"
                className="relative z-10 rounded-xl shadow-xl animate-scale-in h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Create, Customize, Share</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            MemeForge provides all the tools you need to make your meme ideas come to life with powerful features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card p-6 hover:shadow-lg hover:scale-105 transition-all group">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
              <Image className="text-primary-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Template Gallery</h3>
            <p className="text-gray-600">
              Choose from our extensive collection of popular, trending, and classic meme templates.
            </p>
          </div>
          
          <div className="card p-6 hover:shadow-lg hover:scale-105 transition-all group">
            <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center mb-4 group-hover:bg-secondary-200 transition-colors">
              <Sparkles className="text-secondary-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Text Customization</h3>
            <p className="text-gray-600">
              Customize text with different fonts, colors, sizes, and positions for the perfect meme.
            </p>
          </div>
          
          <div className="card p-6 hover:shadow-lg hover:scale-105 transition-all group">
            <div className="w-14 h-14 rounded-full bg-accent-100 flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
              <Download className="text-accent-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Download & Save</h3>
            <p className="text-gray-600">
              Download your memes in high quality or save them to your personal gallery for later.
            </p>
          </div>
          
          <div className="card p-6 hover:shadow-lg hover:scale-105 transition-all group">
            <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
              <Share2 className="text-primary-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Everywhere</h3>
            <p className="text-gray-600">
              Share your creations directly to social media or copy a link to share anywhere.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Templates */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Templates</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started with these popular templates and create your first meme in seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((template) => (
            <div 
              key={template.id}
              className="card overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
              onClick={() => navigate(`/create/${template.id}`)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={template.url} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                  <span className="text-white font-medium pb-4">Use this template</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-800 truncate">{template.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/create')}
            className="btn btn-outline"
          >
            View All Templates
          </button>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-white rounded-full opacity-30" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white rounded-full opacity-30" />
        </div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your First Meme?</h2>
          <p className="text-white/90 mb-8">
            Unleash your creativity with our easy-to-use meme generator. No sign-up required - start creating now!
          </p>
          <button
            onClick={() => navigate('/create')}
            className="btn bg-white text-primary-600 hover:bg-gray-100 py-3 px-8 text-lg font-bold"
          >
            Start Creating Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;