'use client';

import TextAreaWithButton from './TextAreaWithButton';

export default function Newsletter() {
  const handleSubmit = (email: string) => {
    console.log('Newsletter signup:', email);
  };

  return (
    <div className="w-full bg-white border border-primary rounded-[5px] p-8 md:p-12 text-center my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 font-['Space_Grotesk']">
        Sign up for our newsletter
      </h2>
      <p className="text-gray mb-8 max-w-2xl mx-auto">
        Get the latest articles and insights delivered directly to your inbox
      </p>
      <div className="max-w-2xl mx-auto">
        <TextAreaWithButton 
          placeholder="Enter your email"
          buttonText="Subscribe"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
