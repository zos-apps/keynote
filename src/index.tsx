import { useState } from 'react';

interface Slide {
  id: string;
  title: string;
  content: string;
  background: string;
}

const Keynote: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([
    { id: '1', title: 'Welcome', content: 'Click to add subtitle', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: '2', title: 'Agenda', content: '• Item 1\n• Item 2\n• Item 3', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    { id: '3', title: 'Thank You', content: 'Questions?', background: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)' },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: 'Click to add content',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    setSlides([...slides, newSlide]);
  };

  const current = slides[currentSlide];

  if (isPresenting) {
    return (
      <div 
        className="h-full flex items-center justify-center text-white cursor-pointer"
        style={{ background: current.background }}
        onClick={() => {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
          } else {
            setIsPresenting(false);
          }
        }}
      >
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold mb-8">{current.title}</h1>
          <p className="text-2xl whitespace-pre-line">{current.content}</p>
        </div>
        <div className="absolute bottom-4 right-4 text-sm opacity-50">
          {currentSlide + 1} / {slides.length} • Press ESC to exit
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-gray-800">
      {/* Slide Navigator */}
      <div className="w-48 bg-gray-900 p-2 overflow-auto">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            onClick={() => setCurrentSlide(i)}
            className={`mb-2 rounded overflow-hidden cursor-pointer border-2 ${
              currentSlide === i ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <div 
              className="aspect-video flex items-center justify-center text-white text-xs p-2"
              style={{ background: slide.background }}
            >
              {slide.title}
            </div>
          </div>
        ))}
        <button
          onClick={addSlide}
          className="w-full py-2 text-gray-400 hover:text-white text-sm"
        >
          + Add Slide
        </button>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 bg-gray-700 flex items-center px-4 gap-3">
          <button 
            onClick={() => { setCurrentSlide(0); setIsPresenting(true); }}
            className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ▶️ Present
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div 
            className="w-full max-w-4xl aspect-video rounded-lg shadow-2xl flex items-center justify-center text-white"
            style={{ background: current.background }}
          >
            <div className="text-center p-8">
              <input
                value={current.title}
                onChange={(e) => setSlides(slides.map((s, i) => 
                  i === currentSlide ? { ...s, title: e.target.value } : s
                ))}
                className="text-5xl font-bold bg-transparent text-center w-full outline-none mb-4"
              />
              <textarea
                value={current.content}
                onChange={(e) => setSlides(slides.map((s, i) => 
                  i === currentSlide ? { ...s, content: e.target.value } : s
                ))}
                className="text-xl bg-transparent text-center w-full outline-none resize-none"
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keynote;
