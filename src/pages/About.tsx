import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Laugh, MessageSquare, Code, Download, Share2, Save } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About MemeForge</h1>
        <p className="text-gray-600">
          Learn more about our meme generator and how to make the most of it.
        </p>
      </div>
      
      {/* Main content */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="max-w-3xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
              <Laugh className="text-primary-600" size={36} />
            </div>
            <h2 className="text-2xl font-bold mb-4">The Ultimate Meme Creation Tool</h2>
            <p className="text-gray-600">
              MemeForge was built with one goal in mind: to make creating, customizing, and sharing memes as 
              easy and fun as possible. Our platform combines powerful editing capabilities with a 
              user-friendly interface.
            </p>
          </div>
          
          {/* Features section */}
          <section className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="text-secondary-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Text Customization</h4>
                  <p className="text-gray-600">
                    Add multiple text layers with complete control over font, size, color, positioning, and effects.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Code className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Template Library</h4>
                  <p className="text-gray-600">
                    Access a vast collection of popular, trending, and classic meme templates to kickstart your creation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                  <Download className="text-accent-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Download Options</h4>
                  <p className="text-gray-600">
                    Download your memes in high quality for sharing on any platform or printing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                  <Share2 className="text-secondary-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Easy Sharing</h4>
                  <p className="text-gray-600">
                    Share your creations directly to social media platforms with just a few clicks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Save className="text-primary-600" size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Save & Edit Later</h4>
                  <p className="text-gray-600">
                    Save your memes to your personal gallery and come back to edit them anytime.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* How to use section */}
          <section className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-center">How to Use MemeForge</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 font-bold text-gray-500">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Choose a Template</h4>
                  <p className="text-gray-600">
                    Browse our extensive collection of meme templates or search for something specific.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 font-bold text-gray-500">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Add and Customize Text</h4>
                  <p className="text-gray-600">
                    Add text layers, adjust fonts, colors, size, and positioning for perfect placement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 font-bold text-gray-500">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Preview Your Creation</h4>
                  <p className="text-gray-600">
                    See how your meme looks and make any final adjustments to perfect it.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 font-bold text-gray-500">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Save and Share</h4>
                  <p className="text-gray-600">
                    Download your meme, save it to your gallery, or share it directly to social media.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Create Some Memes?</h3>
            <p className="mb-6 max-w-lg mx-auto">
              Jump right in and start creating your first meme with our easy-to-use generator.
            </p>
            <button
              onClick={() => navigate('/create')}
              className="btn bg-white text-primary-600 hover:bg-gray-100 py-3 px-8 text-lg font-bold"
            >
              Create a Meme Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;