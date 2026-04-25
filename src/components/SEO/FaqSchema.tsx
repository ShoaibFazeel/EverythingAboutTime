import React from "react";

export type FAQ = {
  question: string;
  answer: string;
};

export default function FaqSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
            <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}
