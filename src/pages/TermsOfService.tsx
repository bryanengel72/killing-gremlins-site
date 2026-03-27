import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [tos, setTos] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);
  const [crisis, setCrisis] = useState(false);
  const [safety, setSafety] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreeTimestamp, setAgreeTimestamp] = useState('');

  const allChecked = tos && disclaimer && crisis && safety;

  const handleAgree = () => {
    const now = new Date();
    setAgreeTimestamp(now.toLocaleString());
    setAgreed(true);
    // In a real app, save this to backend
    console.log('User agreed at', now.toISOString(), '| Version: 1.0');
    
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
          Terms of Service — v1.0
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12 pb-24">
        {/* Doc Meta */}
        <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-brand-gold/20 text-sm tracking-widest uppercase text-brand-text-muted">
          <div>Effective Date: <strong className="text-brand-purple font-medium">January 1, 2025</strong></div>
          <div>Version: <strong className="text-brand-purple font-medium">1.0</strong></div>
          <div>Last Updated: <strong className="text-brand-purple font-medium">January 1, 2025</strong></div>
          <div>Jurisdiction: <strong className="text-brand-purple font-medium">United States</strong></div>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-sm p-5 mb-10 text-sm text-red-900">
          <strong className="block text-red-600 mb-1 tracking-wider uppercase text-xs">Important Notice</strong>
          Killing Gremlins is a performance education and coaching platform. It is NOT a mental health treatment service, medical device, or crisis intervention system. Please read these terms fully before using the app.
        </div>

        <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-brand-gold text-sm border border-brand-gold/50 px-4 py-2 rounded-sm mb-12 hover:border-brand-gold transition-colors">
          <Download className="w-4 h-4" /> Download PDF Copy
        </button>

        {/* Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">01</span> Agreement to Terms
            </h2>
            <p className="mb-4">By accessing or using the Killing Gremlins application ("App," "Service," "Platform"), you agree to be bound by these Terms of Service ("Terms"). These Terms constitute a legally binding agreement between you ("User") and Killing Gremlins ("Company," "we," "us," or "our"). If you do not agree with any part of these Terms, you must not use the App.</p>
            <p>These Terms were last updated as noted above. We reserve the right to modify these Terms at any time. If we make material changes, you will be required to re-accept the updated Terms before continuing to use the Service.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">02</span> Age Requirements
            </h2>
            <p className="mb-4">The Killing Gremlins App is designed for and intended solely for users who are at least <strong>18 years of age</strong>. By using the App, you represent and warrant that you are 18 years of age or older.</p>
            <p>If you are under 18 years of age, you are not permitted to access or use this App. You must either be blocked from access or use an approved institutional access route specifically designated for minors, if one is available to you. We do not knowingly collect personal information from individuals under 18. If we learn that a user is under 18, we will terminate their account immediately.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">03</span> Nature of the Service: Medical and Mental Health Disclaimer
            </h2>

            <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-sm p-5 my-6 text-sm text-red-900">
              <div className="text-xs tracking-widest uppercase text-red-600 font-medium mb-3">Critical Disclaimer</div>
              <p>Killing Gremlins is strictly a <strong>performance education and coaching platform</strong>. It is not psychotherapy, medical treatment, psychological counseling, or crisis intervention of any kind.</p>
            </div>

            <p className="mb-4">By using the App, you expressly acknowledge and agree that:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The App does not provide any medical diagnoses, psychological diagnoses, or clinical assessments of any kind.</li>
              <li>The App does not replace professional mental health care, psychiatric treatment, psychological therapy, or any licensed clinical services.</li>
              <li>No content within the App, including text, audio, video, assessments, coaching prompts, or AI-generated responses, constitutes medical advice, mental health treatment, or a substitute for consultation with a qualified health professional.</li>
              <li>The App is not intended to treat, cure, prevent, or diagnose any mental health condition, medical condition, or psychological disorder.</li>
              <li>You should always seek the advice of a qualified physician, licensed mental health professional, or other qualified health provider regarding any medical or mental health questions you may have.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">04</span> Emergency and Crisis Limitations
            </h2>

            <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-sm p-5 my-6 text-sm text-red-900">
              <div className="text-xs tracking-widest uppercase text-red-600 font-medium mb-3">Emergency Notice</div>
              <p>Killing Gremlins is NOT monitored in real time and cannot provide emergency support, crisis intervention, or immediate mental health assistance. If you are in crisis, do not use this App as a resource.</p>
            </div>

            <p className="mb-4">If you or someone you know is experiencing thoughts of suicide, self-harm, harm to others, or any other mental health emergency, you must contact emergency services immediately:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Call or text 988</strong> (Suicide and Crisis Lifeline, U.S.)</li>
              <li><strong>Call 911</strong> or your local emergency number</li>
              <li><strong>Go to your nearest emergency room</strong></li>
              <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
            </ul>
            <p>By using this App, you acknowledge that the App is not a crisis service and agree not to use it as a substitute for emergency or crisis support.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">05</span> Breathwork and Somatic Safety Warnings
            </h2>
            <p className="mb-4">The App includes physical regulation tools such as breathing exercises and Progressive Muscle Relaxation (PMR) techniques. Before using these features, you must read and acknowledge the following safety warnings:</p>

            <div className="bg-white/60 border border-brand-gold/20 border-l-4 border-l-brand-gold rounded-sm p-5 my-6 text-sm">
              <div className="text-xs tracking-widest uppercase text-brand-gold-dark font-medium mb-3">Safety Requirements</div>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Do NOT</strong> use breathing exercises or PMR techniques while driving, operating machinery, or in any situation where reduced alertness could cause harm.</li>
                <li><strong>Stop immediately</strong> if you feel dizzy, lightheaded, short of breath, faint, or experience any physical distress during an exercise.</li>
                <li><strong>Consult a qualified medical professional</strong> before using breathing or somatic exercises if you have any health condition that may be affected by breathwork, including but not limited to: cardiovascular conditions, respiratory conditions, epilepsy, pregnancy, or a history of fainting.</li>
                <li>The Company is not responsible for any adverse physical effects resulting from use of breathwork or somatic exercises within the App.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">06</span> Assessment Tool Boundaries
            </h2>
            <p className="mb-4">The App may include built-in self-assessment tools, including but not limited to tools informed by frameworks such as the Westside Test Anxiety Scale and ADHD-informed focus pattern evaluations.</p>
            <p className="mb-4">You expressly acknowledge and agree that:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>All assessments within the App are <strong>screening tools designed strictly to increase self-awareness</strong> and are for <strong>educational and performance support purposes only</strong>.</li>
              <li>These assessments do not determine whether you have, or do not have, any psychological condition, mental health disorder, learning disability, or clinical diagnosis of any kind.</li>
              <li>Results from any in-app assessment should not be used as a substitute for formal evaluation by a licensed clinical professional.</li>
              <li>Assessment results are informational only and carry no clinical weight or diagnostic validity.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">07</span> Artificial Intelligence Disclosures
            </h2>
            <p className="mb-4">The App may incorporate AI-powered features, including but not limited to interactive coaching elements, the "Gremlin Hunter" feature, and AI-assisted chat or guidance tools.</p>

            <div className="bg-white/60 border border-brand-gold/20 border-l-4 border-l-brand-gold rounded-sm p-5 my-6 text-sm">
              <div className="text-xs tracking-widest uppercase text-brand-gold-dark font-medium mb-3">AI Feature Disclosure</div>
              <p>All AI-generated content, responses, recommendations, and guidance provided within this App are for <strong>educational and informational purposes only</strong>. AI-generated content does not constitute medical advice, mental health treatment, therapeutic intervention, clinical guidance, or professional consultation of any kind.</p>
            </div>

            <p>AI systems can make errors, misunderstand context, and produce outputs that are inappropriate for specific circumstances. Always use your own judgment and consult qualified professionals for decisions affecting your health, safety, or wellbeing.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">08</span> Privacy Policy
            </h2>
            <p className="mb-4">Your use of the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Our Privacy Policy describes how we collect, use, and share information about you when you use our Services. By agreeing to these Terms, you also agree to our Privacy Policy.</p>
            <p>We store a timestamp of when you agreed to these Terms and the specific version number of the Terms you accepted, as required for compliance and audit purposes.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">09</span> User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You are solely responsible for your use of the App and any decisions you make based on content within the App.</li>
              <li>You agree to use the App only for lawful purposes and in accordance with these Terms.</li>
              <li>You agree not to misuse, reverse-engineer, or attempt to gain unauthorized access to any part of the App or its systems.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">10</span> Limitation of Liability and Disclaimer of Warranties
            </h2>
            <p className="mb-4 uppercase text-xs tracking-wider leading-relaxed">TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
            <p className="mb-4 uppercase text-xs tracking-wider leading-relaxed">IN NO EVENT SHALL KILLING GREMLINS, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF THE APP.</p>
            <p className="uppercase text-xs tracking-wider leading-relaxed">THE COMPANY'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE APP SHALL NOT EXCEED THE AMOUNT YOU PAID TO THE COMPANY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">11</span> Governing Law
            </h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United States and the applicable state in which the Company is headquartered, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved through binding arbitration or in courts of competent jurisdiction, as applicable.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">12</span> Changes to Terms
            </h2>
            <p>We reserve the right to modify these Terms at any time. When we make material changes, we will update the version number and effective date at the top of this document. Upon your next login following any update to these Terms, you will be required to review and re-accept the updated Terms before continuing to use the App. Continued use of the App after re-acceptance constitutes your agreement to the revised Terms.</p>
          </section>

          <section>
            <h2 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-4 pb-2 border-b border-brand-gold/20 flex items-center gap-3">
              <span className="text-sm font-medium text-brand-gold tracking-widest border border-brand-gold/30 px-2 py-0.5 rounded-sm">13</span> Contact Information
            </h2>
            <p className="mb-4">If you have any questions about these Terms, please contact us at:</p>
            <div className="bg-white/60 border border-brand-gold/20 border-l-4 border-l-brand-gold rounded-sm p-5 my-6 text-sm">
              <div className="text-xs tracking-widest uppercase text-brand-gold-dark font-medium mb-3">Legal Contact</div>
              <p>
                Killing Gremlins<br />
                Email: <a href="mailto:legal@killinggremlins.com" className="text-brand-gold hover:underline">legal@killinggremlins.com</a><br />
                Website: <a href="#" className="text-brand-gold hover:underline">www.killinggremlins.com</a>
              </p>
            </div>
          </section>
        </div>

        {/* Consent Form */}
        <div className="glass-panel p-8 rounded-xl mt-16 border border-brand-gold/30">
          <h3 className="font-sans font-bold text-2xl tracking-tight text-brand-purple mb-2">Agreement & Consent</h3>
          <p className="text-sm text-brand-text-muted mb-8">You must complete all fields below before accessing Killing Gremlins. All items are required.</p>

          {age === 'under18' && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-sm mb-6">
              You must be 18 years of age or older to use Killing Gremlins. Please use an institutional access route if one is available to you, or exit the application.
            </div>
          )}

          <div className="flex flex-wrap gap-4 items-center mb-8 p-4 bg-white/50 border border-brand-gold/20 rounded-sm">
            <label htmlFor="age-select" className="text-sm flex-1 min-w-[200px] font-medium text-brand-purple">Please confirm your age to proceed:</label>
            <select 
              id="age-select" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={agreed}
              className="bg-white border border-brand-gold/30 text-brand-purple px-4 py-2 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
            >
              <option value="">-- Select your age range --</option>
              <option value="under18">Under 18 years old</option>
              <option value="18plus">18 years of age or older</option>
            </select>
          </div>

          {age === '18plus' && !agreed && (
            <div className="space-y-4">
              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${tos ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setTos(!tos)}
              >
                <input type="checkbox" checked={tos} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I have read, understood, and agree to the <a href="#" className="text-brand-gold hover:underline">Terms of Service</a> and <a href="#" className="text-brand-gold hover:underline">Privacy Policy</a> of Killing Gremlins.
                </label>
              </div>

              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${disclaimer ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setDisclaimer(!disclaimer)}
              >
                <input type="checkbox" checked={disclaimer} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I understand and acknowledge the <strong>Mental Health Disclaimer</strong>: Killing Gremlins is a performance education and coaching platform only. It is NOT psychotherapy, medical treatment, or any form of clinical or psychological care, and does not replace professional mental health services.
                </label>
              </div>

              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${crisis ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setCrisis(!crisis)}
              >
                <input type="checkbox" checked={crisis} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I understand the <strong>Crisis Statement</strong>: Killing Gremlins is not monitored in real time and cannot provide emergency support. If I experience thoughts of self-harm or am in crisis, I will call or text <strong>988</strong> or contact local emergency services immediately.
                </label>
              </div>

              <div 
                className={`flex items-start gap-3 p-4 bg-white/50 border rounded-sm cursor-pointer transition-colors ${safety ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-gold/20 hover:border-brand-gold/50'}`}
                onClick={() => setSafety(!safety)}
              >
                <input type="checkbox" checked={safety} readOnly className="mt-1 w-4 h-4 accent-brand-gold" />
                <label className="text-sm leading-relaxed cursor-pointer text-brand-purple">
                  I acknowledge the <strong>Safety Warnings</strong>: I will not use breathing or PMR exercises while driving or operating machinery, I will stop immediately if I feel dizzy or distressed, and I will consult a medical professional before use if I have a relevant health condition.
                </label>
              </div>

              <button 
                disabled={!allChecked}
                onClick={handleAgree}
                className="w-full mt-6 py-4 bg-brand-gold text-white font-bold text-lg tracking-widest uppercase rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-gold-dark"
              >
                I Agree — Enter Killing Gremlins
              </button>
            </div>
          )}

          {agreed && (
            <div className="text-center p-8 text-green-700 bg-green-50 border border-green-200 rounded-sm">
              <Check className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <div className="font-medium">Your agreement has been recorded. Welcome to Killing Gremlins.</div>
              <div className="text-xs text-green-600/70 mt-2">Agreed on: {agreeTimestamp} · Version 1.0</div>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-brand-gold/20 p-8 text-center text-xs text-brand-text-muted tracking-widest uppercase">
        &copy; 2025 Killing Gremlins. All rights reserved. &nbsp;&middot;&nbsp; Terms v1.0 &nbsp;&middot;&nbsp; Not a medical or mental health service.
      </footer>
    </div>
  );
};
