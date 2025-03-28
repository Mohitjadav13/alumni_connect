import React, { useState } from "react";

const SendEmails = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    recipients: 'all' // 'all', 'alumni', 'faculty'
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(emailData),
      });
      
      if (res.ok) {
        alert('Emails sent successfully!');
        setEmailData({ subject: '', body: '', recipients: 'all' });
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Send Broadcast Email</h2>
            <p className="text-gray-600 mt-2">Reach out to your community with important updates</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Recipients</label>
              <select
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={emailData.recipients}
                onChange={(e) => setEmailData({...emailData, recipients: e.target.value})}
              >
                <option value="all">All Users</option>
                <option value="alumni">Alumni Only</option>
                <option value="faculty">Faculty Only</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter email subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[200px]"
                placeholder="Write your message here..."
                value={emailData.body}
                onChange={(e) => setEmailData({...emailData, body: e.target.value})}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSending}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Emails
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-800 flex items-center gap-2 mb-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Email Best Practices
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Keep subject lines clear and concise (under 50 characters)
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Personalize when possible by using merge tags like {`{name}`}
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Include a clear call-to-action
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SendEmails;