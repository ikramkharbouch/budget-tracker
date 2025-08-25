import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t("terms.title", "Terms and Conditions")}
            </h1>
            <p className="text-gray-600 text-lg">
              {t("terms.subtitle", "Please read these terms carefully before using our financial planning service")}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("terms.section1.title", "1. Acceptance of Terms")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("terms.section1.content", "By accessing and using this financial planning application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("terms.section2.title", "2. Use License")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("terms.section2.content", "Permission is granted to temporarily use this financial planning tool for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>{t("terms.section2.restriction1", "modify or copy the materials")}</li>
                <li>{t("terms.section2.restriction2", "use the materials for any commercial purpose or for any public display")}</li>
                <li>{t("terms.section2.restriction3", "attempt to decompile or reverse engineer any software contained in the application")}</li>
                <li>{t("terms.section2.restriction4", "remove any copyright or other proprietary notations from the materials")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("terms.section3.title", "3. Financial Disclaimer")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("terms.section3.content", "This application is designed to provide general financial planning guidance and should not be considered as professional financial advice. The calculations and recommendations provided are for informational purposes only. You should consult with a qualified financial advisor before making any financial decisions.")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("terms.section4.title", "4. Data Privacy")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("terms.section4.content", "We are committed to protecting your privacy. Your financial data is stored locally in your browser and is not transmitted to our servers unless explicitly stated. We do not sell, trade, or rent your personal information to third parties.")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("terms.section5.title", "5. Accuracy of Materials")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("terms.section5.content", "The materials appearing in this financial planning application could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials at any time without notice.")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("terms.section6.title", "6. Limitations")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("terms.section6.content", "In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use this application, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.")}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("terms.section7.title", "7. Contact Information")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t("terms.section7.content", "If you have any questions about these Terms and Conditions, please contact us through our Comments & Suggestions page.")}
              </p>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-gray-500 text-sm">
                {t("terms.lastUpdated", "Last updated")}: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
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

export default TermsAndConditions;