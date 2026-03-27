import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Download } from 'lucide-react';

export const DataUseAgreement: React.FC = () => {
  const navigate = useNavigate();
  const [dua, setDua] = useState(false);
  const [tiers, setTiers] = useState(false);
  const [nosell, setNosell] = useState(false);
  const [rights, setRights] = useState(false);
  const [ca, setCa] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreeTimestamp, setAgreeTimestamp] = useState('');

  const allChecked = dua && tiers && nosell && rights && ca;

  const handleAgree = () => {
    const now = new Date();
    setAgreeTimestamp(now.toLocaleString());
    setAgreed(true);
    // In a real app, save this to backend
    console.log('DUA accepted at', now.toISOString(), '| Version: 1.0');
    
    // Optional: navigate to onboarding or home after a delay
    setTimeout(() => navigate('/signup'), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-purple font-sans font-light leading-relaxed">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-gold/20 px-8 py-6 flex items-end gap-8">
        <div className="font-sans font-bold text-3xl tracking-tight text-brand-gold leading-none">
          Killing Gremlins
          <span className="block text-brand-text-muted text-sm tracking-widest font-light mt-1">Performance Education Platform</span>
        </div>
        <div className="ml-auto text-xs tracking-widest uppercase text-brand-text-muted border border-brand-gold/20 px-3 py-1 rounded-sm">
          Data Use Agreement — v1.0
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12 pb-24">
        {/* Doc Meta */}
        <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-brand-gold/20 text-sm tracking-widest uppercase text-brand-text-muted">
          <div>Effective Date: <strong className="text-brand-purple font-medium">January 1, 2025</strong></div>
          <div>Version: <strong className="text-brand-purple font-medium">1.0</strong></div>
          <div>Last Updated: <strong className="text-brand-purple font-medium">January 1, 2025</strong></div>
          <div>Jurisdiction: <strong className="text-brand-purple font-medium">United States / California</strong></div>
        </div>

        {/* Intro Block */}
        <div className="bg-white/60 border border-brand-gold/20 border-l-4 border-l-brand-gold rounded-sm p-6 mb-10 text-sm">
          <p className="mb-3">This Data Use Agreement ("Agreement") describes how Killing Gremlins ("Company," "we," "us," or "our") collects, stores, uses, and protects the personal information you provide when using the Killing Gremlins application ("App," "Service").</p>
          <p>This Agreement is incorporated by reference into the Killing Gremlins <Link to="/tos" className="text-brand-gold hover:underline">Terms of Service</Link>. By accepting this Agreement, you acknowledge that you have read and understood how your data is handled. You must actively consent to this Agreement before accessing the App.</p>
        </div>

        <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-brand-gold text-sm border border-brand-gold/50 px-4 py-2 rounded-sm mb-12 hover:border-brand-gold transition-colors">
          <Download className="w-4 h-4" /> Download PDF Copy
        </button>

        {/* Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">01</span> Who This Agreement Applies To
            </h2>
            <p className="mb-4">This Agreement applies to all users of the Killing Gremlins App, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Individual consumers aged 18 or older accessing the App directly</li>
              <li>College and university students accessing the App as individual users</li>
            </ul>
            <p>The App is not directed at children under the age of 13. We do not knowingly collect personal information from anyone under 13. If we become aware that a user is under 13, we will delete their data and terminate their account immediately.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">02</span> What Data We Collect
            </h2>
            <p className="mb-4">We collect data in three tiers, depending on how you interact with the App:</p>

            <div className="border border-brand-gold/20 rounded-sm overflow-hidden my-6">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-brand-gold/20">
                <div className="bg-white/50 p-4 text-xs font-medium tracking-widest uppercase text-brand-gold md:border-r border-brand-gold/20 flex items-start">
                  Tier 1: Account Data
                </div>
                <div className="p-4 text-sm">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Password (stored in encrypted form; never readable by staff)</li>
                    <li>Institution or organization name (if voluntarily provided)</li>
                    <li>Date of account creation</li>
                    <li>Date and version of consent agreements accepted</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] border-b border-brand-gold/20">
                <div className="bg-white/50 p-4 text-xs font-medium tracking-widest uppercase text-brand-gold md:border-r border-brand-gold/20 flex items-start">
                  Tier 2: Assessment Data
                </div>
                <div className="p-4 text-sm">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Scores from in-app screening tools (e.g., Westside Test Anxiety Scale results, ADHD-informed focus pattern evaluations)</li>
                    <li>Timeline self-ratings and progress check-ins</li>
                    <li>Session engagement records (features accessed, time spent)</li>
                    <li>Goal-setting inputs and performance tracking entries</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
                <div className="bg-white/50 p-4 text-xs font-medium tracking-widest uppercase text-brand-gold md:border-r border-brand-gold/20 flex items-start">
                  Tier 3: User-Generated Content
                </div>
                <div className="p-4 text-sm">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Personal journal entries</li>
                    <li>Notes and written reflections</li>
                    <li>Action plans and goal documents created within the App</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500 rounded-sm p-5 my-6 text-sm text-blue-900">
              <div className="text-xs tracking-widest uppercase text-blue-600 font-medium mb-3">AI Chat Sessions</div>
              <p>Conversations with the Gremlin Hunter AI feature are <strong>not stored or retained</strong> after your session ends. No AI chat history is saved to our servers or linked to your account. Each session begins fresh with no memory of prior exchanges.</p>
            </div>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">03</span> How We Use Your Data
            </h2>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Personal Use and Progress Tracking</h3>
            <p className="mb-4">The primary purpose of data collection is to provide you with a personalized performance education experience. Your assessment results, journal entries, and progress data are used to power your in-app dashboard, track changes over time, and enable the App's coaching and education tools.</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Service Operations</h3>
            <p className="mb-4">Account data is used to authenticate your identity, communicate with you about your account, send service-related notifications, and maintain the security and integrity of the App.</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Product Improvement</h3>
            <p className="mb-4">We may use anonymized, aggregated, non-identifiable usage data to understand how the App is being used broadly and to improve its features and content. This data cannot be traced back to any individual user.</p>

            <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-sm p-5 my-6 text-sm text-red-900">
              <div className="text-xs tracking-widest uppercase text-red-600 font-medium mb-3">What We Do Not Do</div>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not sell your personal data to any third party under any circumstances.</li>
                <li>We do not share your individual assessment scores, journal entries, or psychological data with any institution, employer, school, or other organization.</li>
                <li>We do not use your data to train external AI models or share it with AI providers beyond what is necessary to operate in-app features in real time.</li>
                <li>We do not use your data for targeted advertising.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">04</span> Data Storage and Retention
            </h2>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Retention Policy</h3>
            <p className="mb-4">Your account data, assessment data, and user-generated content (including journal entries and personal notes) are stored securely on our servers for as long as your account remains active. This data is retained permanently until you submit a deletion request or close your account, at which point it is permanently removed in accordance with Section 6 of this Agreement.</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Security Measures</h3>
            <p className="mb-4">We implement industry-standard technical and organizational security measures to protect your data, including encryption at rest and in transit, access controls limiting which staff can view user data, and regular security reviews. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Sensitive Data Handling</h3>
            <p className="mb-4">Personal journal entries and assessment scores are treated as sensitive personal data. They are:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Stored in an encrypted database</li>
              <li>Never shared with third parties in identifiable form</li>
              <li>Accessible only by you through your authenticated account, and by a strictly limited number of authorized technical staff solely for the purpose of maintaining service operations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">05</span> Third-Party Sharing and Disclosure
            </h2>
            <p className="mb-4">We do not sell, rent, trade, or otherwise share your personal data with third parties for their own purposes.</p>
            <p className="mb-4">We may share limited data with trusted service providers who assist us in operating the App (such as cloud hosting providers or analytics platforms). These providers are contractually required to process data only on our behalf and in accordance with this Agreement.</p>
            <p className="mb-4">We may disclose your data if required to do so by law, court order, or governmental authority, or if we believe in good faith that disclosure is necessary to protect the rights, property, or safety of Killing Gremlins, our users, or others.</p>
            <p className="mb-4">In the event of a merger, acquisition, or sale of company assets, user data may be transferred to a successor entity, subject to the same protections described in this Agreement. You will be notified of any such change.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">06</span> Your Rights and Data Requests
            </h2>
            <p className="mb-4">You have the following rights with respect to your personal data:</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Right to Access</h3>
            <p className="mb-4">You may request a complete export of all personal data we hold about you, including your account information, assessment history, and any stored user-generated content.</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Right to Deletion</h3>
            <p className="mb-4">You may request the permanent deletion of your account and all associated data at any time. Upon verified request, we will delete your data within 30 days, except where retention is required by law.</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">Right to Correction</h3>
            <p className="mb-4">You may request that we correct any inaccurate personal information we hold about you.</p>

            <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-brand-purple mt-8 mb-3">How to Submit a Request</h3>
            <div className="bg-white/60 border border-brand-gold/20 border-l-4 border-l-brand-gold rounded-sm p-5 my-6 text-sm">
              <div className="text-xs tracking-widest uppercase text-brand-gold-dark font-medium mb-3 flex items-center gap-2">
                Data Request Process 
                <span className="inline-block bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm">Placeholder</span>
              </div>
              <p className="mb-3">To submit a data export or deletion request, please use one of the following methods. <em>Note: The specific submission method (in-app form, web form, or email) will be confirmed prior to launch and this section will be updated accordingly.</em></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Email:</strong> <a href="mailto:privacy@killinggremlins.com" className="text-brand-gold hover:underline">privacy@killinggremlins.com</a></li>
                <li><strong>In-App:</strong> [Data request button location to be confirmed]</li>
                <li><strong>Web Form:</strong> [Link to be confirmed]</li>
              </ul>
              <p>We will respond to all verified requests within <strong>45 days</strong>. We may ask you to verify your identity before processing a request.</p>
            </div>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">07</span> California Privacy Rights (CCPA / CPRA)
            </h2>
            <p className="mb-4">If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), in addition to the rights described in Section 6:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Right to Know:</strong> You have the right to know what personal information we collect, use, disclose, and sell (we do not sell personal information).</li>
              <li><strong>Right to Delete:</strong> You have the right to request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong>Right to Correct:</strong> You have the right to request correction of inaccurate personal information.</li>
              <li><strong>Right to Opt Out of Sale or Sharing:</strong> We do not sell or share your personal information for cross-context behavioral advertising. No opt-out is required, but you may contact us to confirm this at any time.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights. You will receive the same quality of service regardless of whether you make a data rights request.</li>
              <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> You may request that we limit our use of sensitive personal information (such as assessment scores) to only what is necessary to provide the Service.</li>
            </ul>
            <p className="mb-4">To exercise your California privacy rights, please use the contact methods listed in Section 6. We will respond within the timeframes required by California law (generally 45 days, with one 45-day extension where reasonably necessary).</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">08</span> Cookies and Tracking Technologies
            </h2>
            <p className="mb-4">The App may use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze usage patterns. We use only the cookies necessary to operate the Service. We do not use third-party advertising cookies or tracking pixels.</p>
            <p className="mb-4">You may configure your browser to refuse cookies, but doing so may limit certain App functionality.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">09</span> Assessment Data Disclaimer
            </h2>
            <p className="mb-4">Assessment scores and screening results stored in your account are retained for your personal reference and progress tracking only. As stated in the Killing Gremlins Terms of Service, all in-app assessments are screening tools for educational and performance support purposes only. Stored assessment data does not constitute a medical or psychological record and carries no clinical or diagnostic weight.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">10</span> Changes to This Agreement
            </h2>
            <p className="mb-4">We reserve the right to update this Data Use Agreement at any time. When material changes are made, we will update the version number and effective date at the top of this document. Upon your next login following any update, you will be required to review and re-accept the revised Agreement before continuing to use the App. The backend system records the version number and timestamp of each acceptance to maintain a verifiable audit trail.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">11</span> Contact Information
            </h2>
            <p className="mb-4">For questions, concerns, or requests related to this Data Use Agreement or your personal data, please contact:</p>
            <div className="bg-white/60 border border-brand-gold/20 border-l-4 border-l-brand-gold rounded-sm p-5 my-6 text-sm">
              <div className="text-xs tracking-widest uppercase text-brand-gold-dark font-medium mb-3">Privacy Contact</div>
              <p>
                Killing Gremlins — Privacy Team<br />
                Email: <a href="mailto:privacy@killinggremlins.com" className="text-brand-gold hover:underline">privacy@killinggremlins.com</a><br />
                Website: <a href="#" className="text-brand-gold hover:underline">www.killinggremlins.com</a>
              </p>
            </div>
          </section>
        </div>

        {/* Consent Form */}
        <div className="glass-panel p-8 rounded-xl mt-16 border border-brand-gold/30">
          <h3 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-2">Consent to Data Use</h3>
          <p className="text-sm text-brand-text-muted mb-8">You must check all boxes below before accessing Killing Gremlins. All items are required.</p>

          {!agreed && (
            <div className="space-y-4">
              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${dua ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setDua(!dua)}
              >
                <input type="checkbox" checked={dua} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I have read and understood this <strong>Data Use Agreement</strong> and consent to the collection, storage, and use of my personal data as described.
                </label>
              </div>

              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${tiers ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setTiers(!tiers)}
              >
                <input type="checkbox" checked={tiers} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I understand that Killing Gremlins collects Account Data, Assessment Data, and User-Generated Content (including journal entries), and that this data is stored securely and permanently until I request deletion.
                </label>
              </div>

              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${nosell ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setNosell(!nosell)}
              >
                <input type="checkbox" checked={nosell} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I understand that my personal data is never sold or shared with third parties for their own purposes, and that my individual assessment scores and journal entries are not shared with any institution or employer.
                </label>
              </div>

              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${rights ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setRights(!rights)}
              >
                <input type="checkbox" checked={rights} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I understand that I may submit a <strong>data export or deletion request</strong> at any time by contacting <a href="mailto:privacy@killinggremlins.com" className="text-brand-gold hover:underline">privacy@killinggremlins.com</a>, and that my request will be processed within 45 days.
                </label>
              </div>

              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${ca ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setCa(!ca)}
              >
                <input type="checkbox" checked={ca} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  If I am a California resident, I acknowledge my rights under the CCPA/CPRA as described in Section 7 of this Agreement.
                </label>
              </div>

              <button 
                disabled={!allChecked}
                onClick={handleAgree}
                className="w-full mt-6 py-4 bg-brand-gold text-white font-bold text-lg tracking-widest uppercase rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold-dark"
              >
                I Agree — Accept Data Use Agreement
              </button>
            </div>
          )}

          {agreed && (
            <div className="text-center p-8 text-green-700 bg-green-50 border border-green-200 rounded-sm">
              <Check className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <div className="font-medium">Your consent has been recorded.</div>
              <div className="text-xs text-green-600/70 mt-2">Agreed on: {agreeTimestamp} · Version 1.0</div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-brand-gold/20 p-8 text-center text-xs text-brand-text-muted tracking-widest uppercase">
        &copy; 2025 Killing Gremlins. All rights reserved. &nbsp;&middot;&nbsp; Data Use Agreement v1.0 &nbsp;&middot;&nbsp; Not a medical or mental health service.
      </footer>
    </div>
  );
};
