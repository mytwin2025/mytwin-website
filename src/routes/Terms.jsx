import React from 'react';
import Footer from '../components/Footer';
import {
  Shield,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  HelpCircle,
  Activity,
  Heart,
  FileSpreadsheet,
  Lock,
  Smartphone,
  MessageSquare,
} from 'lucide-react';

export default function Terms() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f0efed]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-10 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-70" />
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 backdrop-blur-sm">
            <FileText size={12} /> Legal & Terms
          </span> */}
          <h1 className="mt-4 font-[Arima] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mt-4 max-w-2xl font-[Inter] text-sm text-gray-400 sm:text-base">
            Effective Date: July 9, 2026. Please read these Terms and Conditions carefully before using the mytwin platform.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:gap-12 lg:py-16">
        {/* Content Area */}
        <div className="flex-1 space-y-12 font-[Inter] text-sm leading-relaxed text-[#2c2d2d]">
          {/* Welcome & Introduction */}
          <section id="welcome" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">Welcome to mytwin</h2>
            <div className="space-y-4 text-justify text-gray-800">
              <p>
                Welcome to mytwin platform. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions (T&C). If you do not agree to these terms, you must discontinue using the platform.
              </p>
            </div>

            {/* Warning Callout */}
            <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 shadow-sm">
              <AlertTriangle className="mt-0.5 shrink-0 text-red-600" size={20} />
              <div>
                <h4 className="font-bold text-red-950">Action Required</h4>
                <p className="mt-1 text-xs sm:text-sm">
                  IF YOU DO NOT AGREE WITH THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MUST DISCONTINUE USING THE PLATFORM IMMEDIATELY.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* About MyTwin */}
          <section id="about" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">About MyTwin</h2>
            <p className="text-gray-800 text-justify">
              India’s family-first AI health twin mobile application or platform or related tools for lifestyle disease reversal for you and your parents.
            </p>
            <p className="text-gray-800 text-justify">
              MyTwin is an AI-powered health twin mobile application or platform or tools that creates a real-time digital replica of your unique body by integrating data from wearables, lifestyle habits, vitals, food intake, lab tests and personal preferences & helps people to prevent and reverse lifestyle diseases through continuous monitoring, habit intelligence and coach-led personalised care.
            </p>

            <div className="rounded-2xl border border-black/5 bg-[#e8e7e3]/40 p-5 space-y-3">
              <p className="font-semibold text-gray-900">How MyTwin Works:</p>
              <p className="text-gray-800 text-justify">
                With a combination of: Technology, Medical expertise, Behavioural science and Personalized clinical protocols based on the users or patient's individual health history followed by Root-cause care.
              </p>
              <p className="text-gray-800 text-justify">
                MyTwin predicts health risks early, enables timely coach-led interventions, delivers personalized and actionable behavioral and lifestyle insights, tracks progress across metabolic health parameters, supports healthier aging and empowers you and your parents to prevent, manage and reverse lifestyle conditions like diabetes, pre diabetes, obesity, hypertension, high cholesterol, heart health issues, fatty liver related issues and PCOS/PCOD before complications begin.
              </p>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 1. Agreement to Terms */}
          <section id="agreement" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-800 text-justify">
              These terms and conditions (&ldquo;mytwin Terms&rdquo;) shall be applicable to all chronic disease related medical and diagnostic services and/or other ancillary services and/or any other services provided on the mytwin website, (collectively referred to as &ldquo;Platform&rdquo;), operated by <strong>twinbody healthcare technologies private limited</strong> and/or facilitated through its partner company/ies (&ldquo;mytwin&rdquo; or &ldquo;Us&rdquo; or &ldquo;Our&rdquo; or &ldquo;We&rdquo;) and availed by user(s) (&ldquo;You&rdquo; or &ldquo;Your&rdquo; or &ldquo;User&rdquo;) of the Platform.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 2. Information on the Platform */}
          <section id="information" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              2. Information on the Platform
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <p className="text-gray-800 text-justify">
                  Please note that any and all information, material or details available on the Platform (except such information sought from a Registered Medical Practitioner) is not a substitute for medical care or advice and none of this information should be used for the purpose of self-diagnosis or treatment. Please seek and rely on medical advice sought from a Registered Medical Practitioner.
                </p>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <p className="text-gray-800 text-justify">
                  The details of the registered medical practitioners of mytwin and/or third party registered medical practitioners (collectively &ldquo;Registered Medical Practitioners&rdquo;), available on the Platform is not a recommendation or endorsement by mytwin regarding the qualifications or the services provided by such practitioners and appointments booked by You to avail the Medical Services has been made by You voluntarily, at Your option.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 3. Relationship between You and mytwin platform */}
          <section id="relationship" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              3. Relationship between You and mytwin platform
            </h2>
            <p className="text-gray-800 text-justify">
              No doctor-patient relationship is created between You and mytwin platform (Both web and mobile apps) or You and any Registered Medical Practitioner or Registered Dietitian (RDs) engaged or appointed by Us, merely by booking an appointment or purchasing a chronic disease related health package/plans/programmes with mytwin platform (Both web and mobile apps) as part of the Medical Services or any other services. Such a relationship is established only when information pertaining to Your health and other medical records (&ldquo;Medical Records&rdquo;) are disclosed by You to the Registered Medical Practitioners engaged or appointed by mytwin platform (Both web and mobile apps), during a consultation session.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 4. Consent for Sharing, Storage and Processing of Medical Records */}
          <section id="consent" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              4. Consent for Sharing, Storage and Processing of Medical Records
            </h2>
            <p className="text-gray-800">
              By providing Your consent, You agree to allow mytwin platform (both web and mobile apps) to:
            </p>

            <ul className="list-disc space-y-3 pl-5 text-gray-800 text-justify">
              <li>
                Share Your Medical Records, where required, including details recorded by Registered Medical Practitioners during consultations.
              </li>
              <li>
                Obtain and store Medical Records, which may include blood test results conducted through Our partnered third-party diagnostic service providers/partners, or tests conducted by You through Your chosen diagnostic labs.
              </li>
              <li>
                Share data entered into the mytwin app forms part of your care record and is handled in accordance with our Privacy Policy.
              </li>
              <li>
                Ensure that You are responsible for maintaining the confidentiality of your login credentials and for all activity on your account. mytwin is not liable for unauthorised access resulting from users or members negligence. App features may be updated from time to time to improve the users or members experience.
              </li>
            </ul>

            <div className="rounded-2xl border border-black/5 bg-[#e8e7e3]/40 p-5 space-y-3">
              <p className="text-gray-800 text-justify">
                Additionally, You consent to the storage and processing of medical reports and sensitive information generated by mytwin platform (both web and mobile apps), its Registered Medical Practitioners, or associated diagnostic partners. This information will be uploaded and securely stored on the mytwin platform (both web and mobile app) for the purposes of providing healthcare services.
              </p>
              <p className="text-gray-800 text-justify">
                Additionally, You acknowledge that nurses, paramedical staff, diagnostic service providers, other persons employed or engaged by mytwin platform (both web and mobile app) for providing services may also have access to the Medical Records and accordingly provide Your consent to share the Medical Records with such persons. You hereby provide Your consent to share/notify Your Medical Records (as monitored by mytwin platform (both web and mobile app)) with You through SMS / other messaging services including but not limited to, WhatsApp messaging services. All Medical Records shall be stored, used and disclosed only in the manner stipulated under the mytwin Privacy Policy. You can choose to withdraw Your consent in the manner provided under the mytwin Privacy Policy.
              </p>
              <p className="text-gray-800 font-semibold text-justify">
                We reserve the right to add, modify, amend, cancel, limit, vary or change, either wholly, or in part, at any point in time, the Agreement, without prior notice. Further, mytwin platform (Both web and mobile apps) reserves the right to withdraw, suspend, alter, modify, change or vary the Portal, the Portal features, the Portal content, Services or parts thereof, at its sole discretion, without prior notice.
              </p>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 5. Lab Testing & Diagnostic Consent */}
          <section id="lab-consent" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              5. Lab Testing & Diagnostic Consent
            </h2>
            <p className="text-gray-800">
              Users opting for diagnostic services through MyTwin and its partner Healthians acknowledge and agree that:
            </p>

            <div className="space-y-6 pl-2 sm:pl-4">
              {/* Sample Collection */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    A
                  </span>
                  Sample Collection
                </h3>
                <p className="text-gray-800 text-justify">
                  MyTwin partners with licensed diagnostic labs services, legally named as <strong>Expedient Healthcare Marketing Private Limited</strong> (also called <strong>Healthians</strong>). By booking a test, you authorize the lab to collect, transport, store and analyse your biological sample including but not limited to: Blood, Urine, Saliva and Swabs by a certified phlebotomist or medical professional from partner labs such as Healthians. You agree that minor risks during sample collection may occur (e.g., mild pain, bruising).
                </p>
              </div>

              {/* Health Data Processing */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    B
                  </span>
                  Health Data Processing
                </h3>
                <p className="text-gray-800 text-justify">
                  You consent to MyTwin and partners diagnostics labs such as Healthians accessing and processing your health data for generating insights, digital twin modelling, health scores and insights recommendations.
                </p>
              </div>

              {/* Data Security */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    C
                  </span>
                  Data Security & Compliance
                </h3>
                <p className="text-gray-800">
                  All data is encrypted and processed in compliance with:
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-black/5 bg-white p-4 text-center">
                    <Shield className="mx-auto mb-2 text-orange-600" size={20} />
                    <h4 className="text-xs font-bold text-black">DPDP Act 2023</h4>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white p-4 text-center">
                    <Lock className="mx-auto mb-2 text-orange-600" size={20} />
                    <h4 className="text-xs font-bold text-black">NABL 112 Guidelines</h4>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white p-4 text-center">
                    <FileSpreadsheet className="mx-auto mb-2 text-orange-600" size={20} />
                    <h4 className="text-xs font-bold text-black">ICMR Ethical Requirements</h4>
                  </div>
                </div>
              </div>

              {/* Third-Party Sharing */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    D
                  </span>
                  Third-Party Sharing
                </h3>
                <p className="text-gray-800 text-justify">
                  Your data is shared only with diagnostic labs like Healthians, healthcare professionals, or regulators as required.
                </p>
              </div>

              {/* User Rights */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    E
                  </span>
                  User Rights
                </h3>
                <p className="text-gray-800 text-justify">
                  Users may request data deletion, withdraw consent, or restrict processing by contacting{' '}
                  <a href="mailto:support@mytwinlab.com" className="text-orange-600 hover:underline">
                    support@mytwinlab.com
                  </a>.
                </p>
              </div>

              {/* No Medical Emergency Use Callout */}
              <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-sm">
                <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={20} />
                <div>
                  <h4 className="font-bold text-amber-950">No Medical Emergency Use</h4>
                  <p className="mt-1 text-xs sm:text-sm text-justify">
                    MyTwin does not replace emergency care or doctor diagnosis. MyTwin care plans/programs/protocols are not a substitute for emergency medical care, hospitalisation or any primary medical treatment. In the event of a medical emergency, contact emergency services immediately (<strong>Dial 112</strong>).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 6. Health Services Disclaimer */}
          <section id="disclaimer" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              6. Health Services Disclaimer
            </h2>

            <div className="space-y-6 pl-2 sm:pl-4">
              {/* Medical services */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    1
                  </span>
                  Medical Services
                </h3>
                <p className="text-gray-800 text-justify">
                  The platform provides health and wellness coaching care plans or programs or packages, Pro memberships plans, add on lab tests, add on wearables devices, doctor consultation, real-time health, fitness and lifestyle tracking and monitoring data from lifestyle trackers, wearables devices, health sensors, respective biomarkers from lab tests, personal preferences data through connected devices, diagnostics services and tele consultations from Registered Medical Practitioners or Registered Dietitian (RDs.) Any provided information/data/reports on mytwin platform is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>

              {/* Medical Consultation */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    2
                  </span>
                  Medical Consultation & Offerings
                </h3>
                <p className="text-gray-800 text-justify">
                  We provide the following offerings: Tele-consultations from Registered Medical Practitioners, Tele-consultations from Metabolic Health Coach, Dietitian, Fitness Coach, Yoga Coach or Any Wellness Consultants, Diagnostic services from / through third party diagnostics labs like Healthians, clinics or partners, Device offerings through third party partners, Health Coaches to train on the usage of the Devices. We advise you to always consult a qualified healthcare professional for any medical concerns.
                </p>
                <div className="rounded-xl border border-black/5 bg-[#e8e7e3]/30 p-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-900">Participation in Experiments (Optional):</p>
                  <p className="text-xs text-gray-700 text-justify">
                    You may choose to participate in Experiments with the purpose of exploring and switching to healthier alternatives in relation to eating, activity, sleep schedule, stress management etc. and monitor your glucose levels, health vitals and respective biomarkers. Please note that participating in such Experiments is optional and can be discontinued at any point in time during the subsistence of your health monitoring plans. Mytwin platform (Both web and mobile apps) does not promote/endorse consumption of any of the food items included in the Experiments, nor does it promote/ endorse any particular form of lifestyle. Results may vary from person to person and are dependent on a number of factors other than your food intake or any physical activity you perform. mytwin platform (Both web and mobile apps) does not guarantee accuracy in results of Experiments and same shall not be construed as medical advice in any form, whatsoever.
                  </p>
                </div>
              </div>

              {/* Accuracy Disclaimer */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    3
                  </span>
                  Accuracy Disclaimer
                </h3>
                <p className="text-gray-800 text-justify">
                  Please note that appointments for physical consultations and tele-consultations may not be advisable in cases of all type of emergency or critical conditions. We at mytwin platform (Both web and mobile apps) shall not be responsible for any inconvenience or loss caused to You as a result of delay in medical evaluation or treatment. While we strive for accuracy, we do not guarantee the reliability or completeness of the health services or data provided by the platform or connected devices or diagnostics. Accuracy of respective wearables devices or sensors or wellness devices are as per their claims documented by them to prove the accuracy.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 7. Data Protection Laws */}
          <section id="data-protection" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              7. Data Protection Laws
            </h2>
            <p className="text-gray-800 text-justify">
              This shall mean all laws, rules, regulations, decrees, or other enactments, orders, mandates, or resolutions relating to privacy, data security, and/or data protection, and any implementing, derivative or related legislation, rule, and regulation as amended, extended, repealed and replaced, or re-enacted, as well as any applicable industry self-regulatory programs related to the collection, use, disclosure, and security of Personal Data including the Information Technology Act, 2000 (&ldquo;IT Act, 2000&rdquo;), the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011) and the framework for data protection as laid by The Digital Personal Data Protection Act, 2023 (DPDP Act) and any recent revised updation to this.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-black/5 bg-white p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-black">
                  <Lock size={16} className="text-orange-600" />
                  <h4>Data Storage & Encryption</h4>
                </div>
                <p className="text-xs text-gray-700 text-justify">
                  Data is stored on secure servers within India, with encryption applied in transit and at rest. Access is role-based and monitored to prevent misuse. Regular security audits, vulnerability assessments, and penetration testing are performed.
                </p>
              </div>

              <div className="rounded-xl border border-black/5 bg-white p-5 space-y-2">
                <div className="flex items-center gap-2 font-bold text-black">
                  <FileSpreadsheet size={16} className="text-orange-600" />
                  <h4>Data Retention</h4>
                </div>
                <p className="text-xs text-gray-700 text-justify">
                  Health records data are retained for a minimum of 8 years, as required under applicable medical laws. Financial records are retained as per applicable Indian tax laws. Inactive accounts may be anonymised or deleted once retention obligations have been met.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 8. Force Majeure Event */}
          <section id="force-majeure" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              8. Force Majeure Event
            </h2>
            <p className="text-gray-800 text-justify">
              This shall mean and include any and/or all acts, events, omissions or accidents a Party’s reasonable control, including, without limitation, strikes, industrial disputes, failure of a utility service or transport network, acts of God, war, riot, civil commotion, malicious damage, compliance with any law or governmental order, rule, regulation or direction, accident, breakdown of machinery, act of terror, Internet service provider failure or delay, denial of service, Scheduled maintenance, attack, fire, flood or storm, but excluding (a) financial distress or the inability of either Party to make a profit or avoid a financial loss; (b) changes in market prices or conditions; or (c) a Party’s financial inability to perform its obligations hereunder.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 9. Malware */}
          <section id="malware" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              9. Malware
            </h2>
            <p className="text-gray-800 text-justify">
              This shall mean any device or application (including any software, code, file or program) which may prevent, impair or otherwise adversely affect the access to or operation, reliability or user experience of any computer software, hardware or network, telecommunications service, equipment or network or any other service or device, including worms, trojan horses, viruses and other similar devices or applications.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 10. Intellectual Property Rights (IPR) */}
          <section id="ipr" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              10. Intellectual Property Rights (IPR)
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <div className="space-y-1">
                  <h4 className="font-bold text-black">a. Ownership</h4>
                  <p className="text-gray-800 text-justify">
                    All content, software, trademarks, and other intellectual property on the platform are owned by mytwin platform (Both web and mobile apps) operated by twinbody healthcare technologies private limited or its licensors. All Content is protected by copyright, patent and trademark laws, service marks, trade names other trade related symbols and inventions, design rights, trade secrets rights and various other intellectual property rights, anywhere in the world, whether registered or unregistered and including applications for the grant of any such rights. You are not permitted to use any marks without the prior consent of mytwin platform (Both web and mobile apps) owned by twinbody healthcare technologies private limited, or the third party that may own the Marks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <div className="space-y-1">
                  <h4 className="font-bold text-black">b. Prohibited Use</h4>
                  <p className="text-gray-800 text-justify">
                    You may not post, modify, distribute, or reproduce in any way any copyrighted material, trademarks, or other proprietary information belonging to mytwin platform.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 11. Suspension and Termination */}
          <section id="suspension" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              11. Suspension and Termination
            </h2>
            <p className="text-gray-800 text-justify">
              Mytwin platform (Both web and mobile apps) may delist You or block Your future access to the Platform or suspend or terminate your Account if it believes, in its sole and absolute discretion that you have infringed, breached, violated, abused, or unethically manipulated or exploited any term of these mytwin platform Terms or anyway otherwise acted unethically.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 12. Communications */}
          <section id="communications" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              12. Communications
            </h2>
            <p className="text-gray-800 text-justify">
              You hereby expressly agree to receive communications by way of SMS/WhatsApp and/or emails from mytwin platform, and other third parties relating to the Platform and Services provided through the Platform.
            </p>
            <div className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="grid gap-4 font-[Inter] sm:grid-cols-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Opt-Out / Unsubscribe WhatsApp/SMS
                  </span>
                  <p className="mt-1 text-sm font-semibold text-black sm:text-base">
                    <a href="tel:+918369255417" className="hover:underline">+91 83692 55417</a>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Opt-Out / Unsubscribe Email
                  </span>
                  <p className="mt-1 text-sm font-semibold text-orange-600 hover:underline sm:text-base">
                    <a href="mailto:support@mytwinlab.com">support@mytwinlab.com</a>
                  </p>
                </div>
              </div>
              <div className="border-t border-black/5 pt-4 mt-4 text-xs text-gray-500">
                You can opt-out at any time by sending an email or contacting the above number.
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* Disclaimer & Copyright */}
          <section className="space-y-4 rounded-2xl border border-black/5 bg-black/5 p-6">
            <div className="flex items-center gap-2 font-bold text-black">
              <Info size={16} />
              <h3>Disclaimer</h3>
            </div>
            <div className="space-y-3 text-justify text-xs leading-relaxed text-gray-600">
              <p>
                MyTwin app/website/platform is not a substitute for professional medical advice, diagnosis or treatment. The information provided by the app is based on user-reported input and is for informational purposes only. It should not be relied upon as medical advice. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition.
              </p>
              <p>
                mytwin platform does not replace consultation with healthcare professionals and users should consult doctors for medical diagnoses and prescriptions. Privacy and data security are a priority in accordance with our Privacy Policy. By using mytwin app/website/platform, users agree and give consent to these terms.
              </p>
              <p className="mt-3 border-t border-black/5 pt-3 text-center font-semibold text-black sm:text-left">
                &copy; twinbody healthcare technologies private limited. All rights reserved.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
