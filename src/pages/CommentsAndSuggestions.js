import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CommentsAndSuggestions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "suggestion",
    message: "",
    rating: 5
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Feedback submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        type: "suggestion",
        message: "",
        rating: 5
      });
    }, 3000);
  };

  const feedbackTypes = [
    { value: "suggestion", label: t("feedback.types.suggestion", "Suggestion") },
    { value: "bug", label: t("feedback.types.bug", "Bug Report") },
    { value: "feature", label: t("feedback.types.feature", "Feature Request") },
    { value: "general", label: t("feedback.types.general", "General Comment") },
    { value: "complaint", label: t("feedback.types.complaint", "Complaint") }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t("feedback.title", "Comments & Suggestions")}
            </h1>
            <p className="text-gray-600 text-lg">
              {t("feedback.subtitle", "We value your feedback and suggestions to improve our financial planning tool")}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t("feedback.form.title", "Share Your Feedback")}
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t("feedback.form.thankYou", "Thank you for your feedback!")}
                </h3>
                <p className="text-gray-600">
                  {t("feedback.form.appreciation", "We appreciate your input and will review it carefully.")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("feedback.form.name", "Name")} ({t("common.optional", "Optional")})
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder={t("feedback.form.namePlaceholder", "Your name")}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("feedback.form.email", "Email")} ({t("common.optional", "Optional")})
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder={t("feedback.form.emailPlaceholder", "your.email@example.com")}
                  />
                </div>

                {/* Type Selection */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("feedback.form.type", "Feedback Type")}
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {feedbackTypes.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("feedback.form.rating", "Overall Rating")}
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className={`text-2xl ${
                          star <= formData.rating ? "text-yellow-400" : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({formData.rating}/5)
                    </span>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("feedback.form.message", "Your Message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder={t("feedback.form.messagePlaceholder", "Please share your comments, suggestions, or feedback...")}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!formData.message.trim()}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t("feedback.form.submit", "Submit Feedback")}
                </button>
              </form>
            )}
          </div>

          {/* Information Panel */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("feedback.contact.title", "Contact Information")}
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>📧 {t("feedback.contact.email", "Email")}: support@financialplanner.com</p>
                <p>📞 {t("feedback.contact.phone", "Phone")}: +1 (555) 123-4567</p>
                <p>🕐 {t("feedback.contact.hours", "Support Hours")}: Mon-Fri 9AM-5PM EST</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("feedback.faq.title", "Frequently Asked Questions")}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    {t("feedback.faq.q1", "How is my data stored?")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("feedback.faq.a1", "Your financial data is stored locally in your browser for privacy and security.")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    {t("feedback.faq.q2", "Can I export my data?")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("feedback.faq.a2", "Currently, you can view and print your summary. Export features are planned for future updates.")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    {t("feedback.faq.q3", "Is this tool free to use?")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("feedback.faq.a3", "Yes, this financial planning tool is completely free to use.")}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Requests */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("feedback.features.title", "Suggest New Features")}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {t("feedback.features.subtitle", "We're always looking to improve. Some ideas from other users:")}
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• {t("feedback.features.multicurrency", "Multi-currency support")}</li>
                <li>• {t("feedback.features.investment", "Investment tracking")}</li>
                <li>• {t("feedback.features.debt", "Debt payoff calculators")}</li>
                <li>• {t("feedback.features.reminders", "Monthly expense reminders")}</li>
                <li>• {t("feedback.features.mobile", "Mobile app version")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors"
          >
            {t("common.backToApp", "Back to Financial Planner")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsAndSuggestions;