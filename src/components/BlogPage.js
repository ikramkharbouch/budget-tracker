const BlogPage = ({ onNavigateBack, t }) => {
  const sampleArticle = {
    title: "5 Smart Budgeting Tips for Financial Success",
    author: "Financial Planning Team",
    date: "September 26, 2025",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Managing your finances effectively is one of the most important skills you can develop. Whether you're just starting your financial journey or looking to improve your current situation, these proven budgeting strategies will help you take control of your money and work toward your financial goals."
      },
      {
        type: "heading",
        text: "1. Track Every Dollar"
      },
      {
        type: "paragraph",
        text: "The foundation of any successful budget is knowing exactly where your money goes. Start by tracking all your expenses for at least a month. Use apps, spreadsheets, or even a simple notebook – the method doesn't matter as much as the consistency. You might be surprised by how much you're spending on small, recurring purchases."
      },
      {
        type: "heading",
        text: "2. Follow the 50/30/20 Rule"
      },
      {
        type: "paragraph",
        text: "This popular budgeting framework allocates your after-tax income as follows: 50% for needs (housing, utilities, groceries), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. This provides a balanced approach that covers essentials while still allowing for enjoyment and future planning."
      },
      {
        type: "heading",
        text: "3. Automate Your Savings"
      },
      {
        type: "paragraph",
        text: "Make saving effortless by setting up automatic transfers to your savings account right after payday. Even if you start with just $25-50 per paycheck, the key is building the habit. As your income grows or expenses decrease, you can gradually increase the amount."
      },
      {
        type: "heading",
        text: "4. Build an Emergency Fund First"
      },
      {
        type: "paragraph",
        text: "Before focusing on other financial goals, prioritize building an emergency fund of 3-6 months of expenses. This safety net will prevent you from going into debt when unexpected costs arise, such as medical bills, car repairs, or job loss."
      },
      {
        type: "heading",
        text: "5. Review and Adjust Regularly"
      },
      {
        type: "paragraph",
        text: "Your budget isn't set in stone. Review it monthly and make adjustments based on changes in your income, expenses, or goals. Life circumstances change, and your budget should evolve with them. Don't be afraid to experiment with different approaches until you find what works best for your lifestyle."
      }
    ]
  };

  return (
    <div className="w-full h-full bg-white border rounded-lg overflow-hidden">
      <div className="bg-transparent px-3 flex items-center justify-between">
        <button
          onClick={onNavigateBack}
          className="flex items-center mt-2 hover:text-blue-100 transition-colors text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t?.('navigation.backToPlanner', 'Back') || 'Back'}
        </button>
        <h1 className="text-white font-bold text-lg">
          {t?.('blog.title', 'Financial Blog') || 'Financial Blog'}
        </h1>
        <div className="w-12"></div>
      </div>

      {/* Scrollable Content Area */}
      <div className="h-full overflow-y-auto p-4" style={{ maxHeight: 'calc(100% - 60px)' }}>
        {/* Article Header */}
        <div className="mb-4">
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
              Tips
            </span>
            <span>{sampleArticle.date}</span>
            <span className="mx-1">•</span>
            <span>{sampleArticle.readTime}</span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {sampleArticle.title}
          </h2>
          
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center text-white font-semibold text-xs mr-2">
              FP
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{sampleArticle.author}</p>
              <p className="text-xs text-gray-500">Financial Expert</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="space-y-4">
          {sampleArticle.content.map((section, index) => {
            if (section.type === 'heading') {
              return (
                <h3 key={index} className="text-lg font-bold text-gray-900 mb-2 first:mt-0">
                  {section.text}
                </h3>
              );
            } else {
              return (
                <p key={index} className="text-gray-700 leading-relaxed text-sm">
                  {section.text}
                </p>
              );
            }
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-6 p-4 bg-transparent rounded-lg border border-blue-200">
          <h4 className="text-md font-semibold text-gray-900 mb-2">
            Ready to Put These Tips into Action?
          </h4>
          <p className="text-gray-700 mb-3 text-sm">
            Use our interactive financial planner to create a personalized budget and start tracking your progress.
          </p>
          <button
            onClick={onNavigateBack}
            className="bg-transparent text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-sm"
          >
            Start Your Financial Plan
          </button>
        </div>

        {/* Related Articles - Compact Version */}
        <div className="mt-6">
          <h4 className="text-lg font-bold text-gray-900 mb-3">More Articles</h4>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
              <h5 className="font-semibold text-gray-900 text-sm mb-1">
                How to Create Your First Budget
              </h5>
              <p className="text-gray-600 text-xs mb-2">
                A beginner's guide to setting up a budget that actually works.
              </p>
              <span className="text-xs text-gray-500">3 min read</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
              <h5 className="font-semibold text-gray-900 text-sm mb-1">
                Debt Payoff Strategies That Work
              </h5>
              <p className="text-gray-600 text-xs mb-2">
                Compare different methods to pay off debt and find the right approach.
              </p>
              <span className="text-xs text-gray-500">4 min read</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
              <h5 className="font-semibold text-gray-900 text-sm mb-1">
                Building Wealth in Your 20s and 30s
              </h5>
              <p className="text-gray-600 text-xs mb-2">
                Investment strategies and financial habits for young professionals.
              </p>
              <span className="text-xs text-gray-500">6 min read</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;