'use client';

export default function Newsletter() {
  return (
    <div className="w-full bg-secondary rounded-lg p-8 md:p-12 text-center my-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Sign up for our newsletter
      </h2>
      <p className="text-white mb-8 max-w-2xl mx-auto">
        Get the latest articles and insights delivered directly to your inbox
      </p>
      <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 border border-white focus:ring-2 focus:ring-primary outline-none"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-primary text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
