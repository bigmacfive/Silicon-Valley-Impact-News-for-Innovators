import React, { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  content: string;
}

const newsItems: NewsItem[] = [
  {
    title: "AI Ethics Coalition Formed",
    content: "Major tech companies form AI Ethics Coalition to address concerns about bias and privacy in machine learning models. The coalition aims to establish industry-wide standards for responsible AI development and deployment. Key areas of focus include algorithmic fairness, data privacy protection, and transparency in AI decision-making processes. This initiative comes as governments worldwide are increasing scrutiny on AI technologies and their societal impacts. The coalition plans to collaborate with academic institutions and civil society organizations to ensure diverse perspectives are incorporated into their guidelines."
  },
  {
    title: "Quantum Computing Breakthrough",
    content: "Scientists achieve quantum supremacy with a 1000-qubit computer, opening new possibilities for complex problem-solving. This milestone represents a significant leap forward in quantum computing capabilities, potentially revolutionizing fields such as cryptography, drug discovery, and financial modeling. The team behind this achievement has demonstrated the ability to perform calculations that would be practically impossible for classical supercomputers. However, challenges remain in scaling this technology for practical applications and maintaining quantum coherence over longer periods. Researchers are now focusing on developing error-correction techniques and more stable qubit architectures."
  },
  {
    title: "Edge Computing Surge",
    content: "Edge computing adoption surges, with analysts predicting a 500% growth in edge AI applications by 2025. This trend is driven by the increasing need for real-time data processing and reduced latency in various industries. IoT devices, autonomous vehicles, and smart cities are among the key sectors fueling this growth. Edge computing enables faster response times, improved data security, and reduced bandwidth usage. However, challenges such as standardization, interoperability, and power efficiency need to be addressed. Tech giants and startups alike are investing heavily in edge computing infrastructure and software solutions to capitalize on this emerging market."
  },
  {
    title: "Blockchain Renaissance",
    content: "Ethereum 2.0 launch sparks renewed interest in blockchain technology, with focus shifting to scalability and sustainability. The upgrade promises to address long-standing issues of transaction speed and energy consumption that have hindered widespread blockchain adoption. This development has reignited interest from enterprise users and developers, leading to a surge in decentralized finance (DeFi) applications and non-fungible token (NFT) platforms. However, challenges remain in ensuring seamless transition for existing Ethereum users and maintaining network security. The success of Ethereum 2.0 could pave the way for more sustainable and scalable blockchain solutions across various industries."
  },
  {
    title: "GPT-4 Redefines Coding",
    content: "GPT-4 is revolutionizing code generation and debugging, potentially increasing developer productivity by up to 40%. This advanced language model demonstrates unprecedented capabilities in understanding context, generating complex algorithms, and even explaining code logic. Early adopters report significant time savings in routine coding tasks, allowing developers to focus on higher-level problem-solving and innovation. However, concerns about over-reliance on AI-generated code and potential introduction of subtle bugs are being debated in the developer community. As GPT-4 continues to evolve, it's expected to reshape software development practices and potentially lower the barrier to entry for coding."
  }
];

const useTypewriter = (texts: string[], speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayedText.length < texts[textIndex].length) {
        timer = setTimeout(() => {
          setDisplayedText(texts[textIndex].slice(0, displayedText.length + 1));
        }, speed);
      } else {
        setIsTyping(false);
        timer = setTimeout(() => {
          setIsTyping(true);
          setDisplayedText('');
          setTextIndex((textIndex + 1) % texts.length);
        }, speed * 10);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, speed / 2);
      } else {
        setIsTyping(true);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, textIndex, isTyping, texts, speed]);

  return displayedText;
};

const SiliconValleyNews: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const typedText = useTypewriter(newsItems.map(item => item.content), 50);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setIsSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 font-serif">
      <div className="w-full max-w-[700px] text-left">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Silicon Valley</h1>
          <h2 className="text-4xl font-bold mb-2">Impact News</h2>
          <h3 className="text-4xl font-bold mb-8">for Innovators</h3>
          <p className="text-xl mb-4 border-l-4 border-black pl-4">
            Get the fastest, most impactful tech news from Silicon Valley. Stay ahead of the curve with our concise, cutting-edge updates.
          </p>
        </header>
        
        <main>
          <div className="bg-black text-white p-4 sm:p-8 mb-8 flex items-center justify-center overflow-hidden">
            <p className="text-lg sm:text-xl font-mono">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mb-4 px-4 py-2 border-2 border-black text-lg"
                required
              />
              <button type="submit" className="w-full bg-black text-white px-4 py-2 font-bold text-lg hover:bg-white hover:text-black border-2 border-black transition-colors">
                Subscribe / $20*
              </button>
            </form>
          ) : (
            <p className="text-2xl font-bold mb-8 border-2 border-black p-4">Thanks for subscribing!</p>
          )}
          
          <p className="mb-16 text-sm text-gray-500 opacity-50">
            *Lifetime Access: Pay a one-time fee of $20
          </p>

          <div className="mb-32">
            <h3 className="font-bold mb-8 text-3xl underline">Latest Headlines:</h3>
            {newsItems.map((item, index) => (
              <div key={index} className="mb-8 border-l-4 border-black pl-4">
                <h4 className="font-bold text-2xl mb-2">{item.title}</h4>
                <p className="text-lg">{item.content}</p>
              </div>
            ))}
          </div>
        </main>
        
        <footer className="mt-32 text-lg border-t-2 border-black pt-4">
          <a href="#" className="mr-6 hover:underline">Terms of Service</a>
          <a href="#" className="mr-6 hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </footer>
      </div>
    </div>
  );
};

export default SiliconValleyNews;