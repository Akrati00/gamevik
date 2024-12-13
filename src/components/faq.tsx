import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "What is our content about?",
      answer: "We create content on game betting and everything related to it. Strategy guides, game analysis, and trends – all to help you make informed bets."
    },
    {
      id: 2,
      question: "How can I request a specific article?",
      answer: "Have an interesting topic? Send us a suggestion! We’re open to relevant and original ideas from the community."
    },
    {
      id: 3,
      question: "Who creates the content on the site?",
      answer: "Our authors are professionals in betting and esports, so you're getting information from experienced people."
    },
    {
      id: 4,
      question: "Can I become an author?",
      answer: "Yes! If you're interested in writing for us, fill out the contact form, and we'll consider your application."
    }
  ];

  const [selectedFaq, setSelectedFaq] = useState(null);

  const handleFaqClick = (faq) => {
    setSelectedFaq(selectedFaq === faq.id ? null : faq.id);
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-green-500">
            FAQ
          </h2>
          <p className="mb-4">The most popular questions that we receive</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`relative bg-white dark:bg-gray-900 rounded-lg shadow-lg px-6 py-4 cursor-pointer transition duration-300 transform ${
                selectedFaq === faq.id
                  ? "border-l-4 border-green-400 scale-105"
                  : "border-l-4 border-transparent hover:scale-105"
              }`}
              onClick={() => handleFaqClick(faq)}
              style={
                selectedFaq === faq.id
                  ? { animation: "shine-green 2s infinite" }
                  : {}
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <svg
                  className={`h-5 w-5 text-green-400 transform transition-transform ${
                    selectedFaq === faq.id ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 14l6-6H4z" />
                </svg>
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  selectedFaq === faq.id ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      </div>
    </div>
  );
};

export default FAQ;
