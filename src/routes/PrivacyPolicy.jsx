import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  FileText,
  Info,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', name: 'Introduction' },
    { id: 'info-collected', name: '1. Information We Collect' },
    { id: 'purpose', name: '2. Purpose of Data Collection' },
    { id: 'data-sharing', name: '3. Data Sharing & Vendors' },
    { id: 'cookies', name: '4. Cookies Policy' },
    { id: 'security', name: '5. Security Measures' },
    { id: 'retention-rights', name: '6. Retention & Rights' },
    { id: 'third-party', name: '7. Third-Party Links' },
    { id: 'dpdp-act', name: '8. Data Protection Act' },
    { id: 'children-privacy', name: '9. Children’s Privacy' },
    { id: 'changes-policy', name: '10. Changes to Policy' },
    { id: 'grievance', name: '11. Grievance Redressal' },
    { id: 'governing-law', name: '12. Governing Law' },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f0efed]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-10 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-70" />
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 backdrop-blur-sm">
            <Shield size={12} /> Compliance & Trust
          </span> */}
          <h1 className="mt-4 font-[Arima] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl font-[Inter] text-sm text-gray-400 sm:text-base">
            Effective Date: July 9, 2026. This policy outlines how twinbody healthcare technologies
            private limited collects, uses, and safeguards your information.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:gap-12 lg:py-16">
        {/* Privacy Policy Documents */}
        <div className="flex-1 space-y-12 font-[Inter] text-sm leading-relaxed text-[#2c2d2d]">
          {/* Introduction */}
          <section id="intro" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">Introduction</h2>
            <div className="space-y-4 text-justify text-gray-800">
              <p>
                The domain name{' '}
                <a href="https://mytwinlab.com/" className="text-orange-600 hover:underline">
                  https://mytwinlab.com/
                </a>{' '}
                (hereinafter referred to as <strong>‘Website’</strong>,{' '}
                <strong>‘Mobile Applications’</strong> (both Android and Apple Store) or{' '}
                <strong>‘Platform’</strong>) is owned and operated by{' '}
                <strong>twinbody healthcare technologies private limited</strong> (hereinafter
                referred to as <strong>‘Company’</strong>, <strong>‘mytwin’</strong>,{' '}
                <strong>‘We’</strong>, <strong>‘Us’</strong>, or <strong>‘Our’</strong>) and the
                Website and Applications are hereafter collectively referred to as the{' '}
                <strong>mytwin platform</strong>.
              </p>
              <p>
                We know that you as a user (<strong>‘You’</strong>, <strong>‘Your’</strong>,{' '}
                <strong>‘User(s)’</strong>) care about how Your personal information is used and
                shared, and we are committed to protecting your personal information and Your right
                to privacy. If You have any questions or concerns about our policy or our practices
                with regards to Your personal information, please contact us at{' '}
                <a href="mailto:support@mytwinlab.com" className="text-orange-600 hover:underline">
                  support@mytwinlab.com
                </a>
                .
              </p>
              <p>
                By using the mytwin lab website, mytwin mobile application, or by providing Your
                information, you consent to the collection and use of the information you disclose
                on the website or mytwin mobile application in accordance with this Privacy Policy.
              </p>
              <p className="font-semibold text-gray-900">
                Please read this privacy policy carefully as it will help you make informed
                decisions about sharing your personal information with us.
              </p>
            </div>

            {/* Warning Callout */}
            <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 shadow-sm">
              <AlertTriangle className="mt-0.5 shrink-0 text-red-600" size={20} />
              <div>
                <h4 className="font-bold text-red-950">Action Required</h4>
                <p className="mt-1 text-xs sm:text-sm">
                  IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY POLICY, PLEASE DO NOT ACCESS
                  THE WEBSITE / MOBILE APPS.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 1. Information We Collect */}
          <section id="info-collected" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              1. Information We Collect
            </h2>
            <p className="text-gray-800">
              We collect the following categories of information to provide personalized health
              tracking and monitoring services or products:
            </p>

            <div className="space-y-6 pl-2 sm:pl-4">
              {/* a. Personal Information */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-base font-bold text-black">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    A
                  </span>
                  Personal Information
                </h3>
                <p className="text-gray-800">
                  &quot;Personal Information&quot; includes &apos;sensitive personal data or
                  information&apos; (as defined under applicable law) and other information that You
                  share with Us whether directly or in combination with other information or is
                  received from a Third Party Service Provider, that personally identifies You or
                  could be used to personally identify You.
                </p>
                <div className="space-y-3 rounded-2xl border border-black/5 bg-[#e8e7e3]/40 p-5">
                  <p className="font-medium text-gray-900">Information We May Collect:</p>
                  <p className="text-xs leading-relaxed text-gray-700">
                    Your full name, gender, height, weight, age, birth date, contact details (email,
                    phone number, city, and Pin code), emergency number, medical conditions, past
                    medical history, diagnostic lab reports, prescriptions, lab results, blood
                    group, existing medications, daily meals logging data, daily activity/workouts
                    data, health interests, daily habits, health risk score, body vitals, blood
                    tests parameters/biomarkers, lifestyle related data, personal preferences,
                    Google calendar data (for consultations and appointments), financial details
                    (bank account, UPI or card details when making payment), and action goals data.
                  </p>
                </div>

                <p className="mt-3 font-medium text-gray-800">
                  Mytwin platform reserves the right to use this User Information for:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-xs text-gray-700 sm:text-sm">
                  <li>Providing Products and Services to the User(s).</li>
                  <li>
                    Publishing information on the End-User Account and listing Partnered Diagnostics
                    Laboratories (like Healthians partners), Partnered Pharmacies, Registered
                    Doctors/Hospitals, or other third-party Vendors/Partners.
                  </li>
                  <li>
                    For contacting User(s) or members Via SMS, Calls, Whats App Calls or Chat, Email
                    for offering current MyTwin Programs, Care Plans, current products or new
                    products, new features or services, Contacting User(s) for taking service
                    feedback etc.
                  </li>
                  <li>
                    Using anonymized or de-identified health data (non-personally identifiable) for
                    research, statistical analysis, and training machine learning or artificial
                    intelligence models.
                  </li>
                  <li>
                    Contacting User(s) to complete transactions, monitoring and improving platform
                    design, customization of ads/content, and medical research on chronic conditions
                    management.
                  </li>
                </ul>
              </div>

              {/* b. Health Data */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-base font-bold text-black">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    B
                  </span>
                  Health Data
                </h3>
                <p className="text-gray-800">
                  Biomarkers, medical history and other health parameters data through blood tests,
                  body vitals and lifestyle trackers data collected through different devices
                  connected to Our mytwin platform (Both web and mobile apps). We also collect
                  personal preference data provided by You as an input that can be used for
                  understanding Your daily wellbeing.
                </p>
                <div className="inline-flex rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700">
                  In Short: Health conditions and doctor-provided recommendations.
                </div>
              </div>

              {/* c. Device and Technical Data */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-base font-bold text-black">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    C
                  </span>
                  Device and Technical Data
                </h3>
                <p className="text-gray-800">
                  IP address, device type, operating system, and browser details.
                </p>
                <div className="inline-flex rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700">
                  In Short: Device connectivity data for monitoring devices used with our platform.
                </div>
              </div>

              {/* d. Google account emails (GMAIL) */}
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-base font-bold text-black">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white">
                    D
                  </span>
                  Google Account Integration (Gmail)
                </h3>
                <p className="text-gray-800">
                  A User (Healthcare Provider/Doctor/CareSeeker/Health Coach) may choose to provide
                  explicit consent to connect/integrate the User’s Gmail account(s) with his/her
                  account on the mytwin Platform.
                </p>
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs leading-relaxed text-blue-900">
                  <strong>Important Gmail Data Usage Restriction:</strong> Any data obtained by this
                  integration will be used by the Company solely for providing the Services,
                  updating the User’s Smart Health Reports & consolidating appointments at one
                  place. We shall not use or transfer any data or information received from this
                  integration to third parties for any purpose other than as explicitly authorized
                  by the User.
                </div>
              </div>

              {/* e. Disclaimer on professional medical advice */}
              <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle size={18} className="shrink-0 text-amber-600" />
                  <h4>E. Disclaimer on Professional Medical Advice</h4>
                </div>
                <p className="text-xs leading-relaxed text-amber-900 sm:text-sm">
                  Mytwin platform (Both web and mobile apps) cannot make any medical diagnoses or
                  professional medical advice. Please consult a doctor if you are concerned about
                  your health or you have any medical queries. You should never override or reject a
                  doctor&apos;s professional advice in favor of any information that you see on
                  mytwin platform&apos;s website or mobile apps.
                </p>
              </div>

              {/* f. Face Scan (rPPG) — Legal Disclaimer */}
              <div className="space-y-3 rounded-2xl border border-red-200 bg-red-50/70 p-5 text-red-950 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-red-900">
                  <AlertTriangle size={18} className="shrink-0 text-red-600" />
                  <h4>F. Face Scan (rPPG) — Legal Disclaimer</h4>
                </div>
                <div className="space-y-2 text-xs leading-relaxed text-red-900 sm:text-sm">
                  <p>
                    The Face Scan feature available within the MyTwin application is classified and
                    offered as a <strong>general wellness tool</strong>. It is not intended or
                    approved for use as a medical device under the Medical Device Rules, 2017
                    (India), the U.S. Federal Food, Drug, and Cosmetic Act, the EU Medical Device
                    Regulation (MDR 2017/745), or any other applicable international regulations.
                  </p>
                  <p>
                    The Face Scan feature uses camera-based photoplethysmography (rPPG) to generate
                    approximate wellness indicators. These measurements are not clinically validated
                    for accuracy, and results may be influenced by environmental conditions, user
                    movement, and device limitations.
                  </p>
                  <div className="mt-2 space-y-1 rounded-xl border border-red-100 bg-white/50 p-3 text-red-950">
                    <p className="font-semibold">Accordingly, the Face Scan feature:</p>
                    <ul className="list-disc space-y-1 pl-5 text-xs">
                      <li>
                        Does not diagnose, treat, cure, mitigate, or prevent any disease or medical
                        condition;
                      </li>
                      <li>Is not intended for medical or clinical decision-making;</li>
                      <li>
                        Should not be considered a substitute for professional medical advice,
                        diagnosis, or treatment;
                      </li>
                      <li>
                        Does not provide real-time medical monitoring, emergency assessment, or
                        clinical diagnosis.
                      </li>
                    </ul>
                  </div>
                  <p className="mt-2 text-xs text-red-800">
                    Users should always seek advice from a licensed healthcare professional
                    regarding any symptoms, medical concerns, or decisions related to their health.
                    MyTwin, its developers, and associated entities shall not be liable for any
                    decisions made based on Face Scan data or for any inaccuracies arising from its
                    use. Use of the Face Scan feature constitutes acknowledgment and acceptance of
                    these terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 2. Purpose of Data Collection */}
          <section id="purpose" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              2. Purpose of Data Collection
            </h2>
            <p className="text-gray-800">
              Your data is collected and processed for the following key purposes:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-xl border border-black/5 bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600">
                  1
                </span>
                <div>
                  <h4 className="text-sm font-bold text-black">Health & Habits Tracking</h4>
                  <p className="mt-1 text-xs text-gray-600">
                    Real-time tracking of parameters, biomarkers, vitals, and lifestyle trackers on
                    our app dashboard.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-black/5 bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600">
                  2
                </span>
                <div>
                  <h4 className="text-sm font-bold text-black">Personalization</h4>
                  <p className="mt-1 text-xs text-gray-600">
                    Tailored insights and recommendations, health trend analysis, clinical insights,
                    and digital twin modeling.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-black/5 bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600">
                  3
                </span>
                <div>
                  <h4 className="text-sm font-bold text-black">Communication</h4>
                  <p className="mt-1 text-xs text-gray-600">
                    Notifications, alerts, and updates related to Health & Fitness Tracking.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-black/5 bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 font-bold text-orange-600">
                  4
                </span>
                <div>
                  <h4 className="text-sm font-bold text-black">Compliance & Analytics</h4>
                  <p className="mt-1 text-xs text-gray-600">
                    Adhering to legal/regulatory obligations and analyzing usage patterns to improve
                    platform design.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 3. Data Sharing and Vendors */}
          <section id="data-sharing" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              3. Data Sharing and Vendors
            </h2>
            <p className="text-gray-800">
              We only share your data with trusted third parties under strict confidentiality
              agreements:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <h4 className="font-bold text-black">a. Vendors and Partners</h4>
                  <p className="mt-1 text-xs text-gray-700 sm:text-sm">
                    Third-party health device manufacturers for device connectivity, cloud service
                    providers for secure storage, and healthcare providers (with your consent) for
                    personalized interventions.
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-gray-700 sm:text-sm">
                    MyTwin partners with licensed diagnostic labs legally named as{' '}
                    <strong>Expedient Healthcare Marketing Private Limited</strong> (also called{' '}
                    <strong>Healthians</strong>) for at-home/center labs testing and diagnostics
                    services.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <h4 className="font-bold text-black">b. Legal Obligations</h4>
                  <p className="mt-1 text-xs text-gray-700 sm:text-sm">
                    Law enforcement agencies if required by applicable laws, and regulatory bodies
                    for audits and compliance checks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-orange-600" />
                <div>
                  <h4 className="font-bold text-black">c. Aggregated or Anonymized Data</h4>
                  <p className="mt-1 text-xs text-gray-700 sm:text-sm">
                    We may use anonymized data for research and analytics purposes, ensuring it
                    cannot identify you personally.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 4. Cookies Policy */}
          <section id="cookies" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              4. Cookies Policy
            </h2>
            <div className="space-y-3 text-gray-800">
              <p>
                The cookie information stored on the User’s hard drive is: (a) User(s) segment hits
                or information on a specific product, service, brand or model in which the User(s)
                has shown interest during its visit to a certain website and (b) time and date stamp
                of the latest update of the User(s) profile.
              </p>
              <p>
                If the cookie is deleted by the User(s), all profile data is removed. For the sake
                of clarity, no segments relating to information which mytwin platform considers
                sensitive have been or will be created, such as segments relating to political
                opinions, religious beliefs, physical or mental health conditions or sexual life.
              </p>
              <p>
                Cookies are used to enhance your experience on Our mytwin platform. You can manage
                or disable cookies through your browser settings. However, this may affect certain
                platform functionalities.
              </p>
              <div className="inline-flex rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700">
                In Short: Analytics cookies to understand platform usage.
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 5. Security Measures */}
          <section id="security" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              5. Security Measures
            </h2>
            <p className="text-gray-800">
              We implement robust, industry-standard security measures to protect your data:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-black/5 bg-white p-4">
                <Lock className="mb-2 text-orange-600" size={20} />
                <h4 className="text-xs font-bold text-black sm:text-sm">Encryption</h4>
                <p className="mt-1 text-xs text-gray-600">
                  All sensitive data is encrypted during storage and transmission.
                </p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white p-4">
                <Shield className="mb-2 text-orange-600" size={20} />
                <h4 className="text-xs font-bold text-black sm:text-sm">Access Control</h4>
                <p className="mt-1 text-xs text-gray-600">
                  Strict role-based access control policies for internal development and support
                  teams.
                </p>
              </div>
              <div className="rounded-xl border border-black/5 bg-white p-4">
                <CheckCircle className="mb-2 text-orange-600" size={20} />
                <h4 className="text-xs font-bold text-black sm:text-sm">Regular Audits</h4>
                <p className="mt-1 text-xs text-gray-600">
                  Routine security audits to identify and patch vulnerabilities.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 6. Data Retention, Deletion, Rights */}
          <section id="retention-rights" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              6. Data Retention, Deletion, Rights
            </h2>
            <div className="space-y-3 text-gray-800">
              <p>
                Health records data are retained for a <strong>minimum of 8 years</strong>, as
                required under applicable medical laws, or health data will be retained as long as
                necessary to fulfill the purposes outlined in this policy.
              </p>
              <p>
                Based on the applicable laws of the country, you may have the right to request
                access to the personal information we collect from you, change that information, or
                delete it in some circumstances.
              </p>
              <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-black/5 bg-[#e8e7e3]/45 p-4 sm:flex-row sm:items-center">
                <div>
                  <h4 className="text-xs font-bold text-black sm:text-sm">
                    Need to update or delete your information?
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-600">
                    Please send a request and our team will respond to you.
                  </p>
                </div>
                <a
                  href="mailto:support@mytwinlab.com"
                  className="rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-black/80"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 7. Third-Party Links */}
          <section id="third-party" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              7. Third-Party Links
            </h2>
            <p className="text-gray-800">
              Our platform may include links to third-party websites or services. We are not
              responsible for their privacy practices. Please review their privacy policies before
              sharing any information.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 8. Data Protection Act */}
          <section id="dpdp-act" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              8. Data Protection Act
            </h2>
            <p className="text-gray-800">
              The mytwin &apos;Website/Applications/Platform&apos; is in compliance with the
              framework for data protection as laid down by{' '}
              <strong>The Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 9. Children’s Privacy */}
          <section id="children-privacy" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              9. Children’s Privacy
            </h2>
            <div className="space-y-3 text-gray-800">
              <p>
                Our platform is not intended for individuals under the age of{' '}
                <strong>18 Years</strong>. We do not knowingly collect data from or market to
                children under 18 years of age.
              </p>
              <p>
                By using the Services, Products or Apps, you represent that you are at least 18 or
                that you are the parent or guardian of such a minor and consent to such minor
                dependent’s use of the Services, Products or Apps.
              </p>
              <p>
                If we learn that personal information from users less than 18 years of age has been
                collected, we will deactivate the account and take reasonable measures to promptly
                delete such data from our records. If you become aware of any data we have collected
                from children under age 18, please contact us at{' '}
                <a href="mailto:support@mytwinlab.com" className="text-orange-600 hover:underline">
                  support@mytwinlab.com
                </a>
                .
              </p>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 10. Changes to This Privacy Policy */}
          <section id="changes-policy" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-800">
              We reserve the right to amend, change or update this privacy policy from time to time
              or as and when required. It is Your responsibility to keep yourself updated of the
              changes made from time to time. Your continued use of the Portal shall be deemed to be
              Your acceptance of such changes. Significant changes will be communicated through our
              platform or via email.
            </p>
          </section>

          <hr className="border-black/5" />

          {/* 11. Grievance Redressal */}
          <section id="grievance" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              11. Grievance Redressal
            </h2>
            <p className="text-gray-800">
              For any queries, questions or concerns, feel free to contact our Grievance Officer:
            </p>
            <div className="space-y-4 rounded-2xl border border-black/5 bg-white p-6">
              <div className="grid gap-4 font-[Inter] sm:grid-cols-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Name
                  </span>
                  <p className="mt-1 text-sm font-semibold text-black sm:text-base">
                    Manasi Pardesi
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email
                  </span>
                  <p className="mt-1 text-sm font-semibold text-orange-600 hover:underline sm:text-base">
                    <a href="mailto:support@mytwinlab.com">support@mytwinlab.com</a>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Phone
                  </span>
                  <p className="mt-1 text-sm font-semibold text-black hover:underline sm:text-base">
                    <a href="tel:+918261922472">+91 82619 22472</a>
                  </p>
                </div>
              </div>
              <div className="border-t border-black/5 pt-4 text-xs text-gray-500">
                We will address your concerns within the timelines prescribed by the applicable
                laws.
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 12. Governing Law */}
          <section id="governing-law" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              12. Governing Law
            </h2>
            <p className="text-gray-800">
              This Privacy Policy is governed by the laws of India. Any disputes arising out of this
              policy will be resolved in the courts of <strong>Thane District, Maharashtra</strong>.
            </p>
            <p className="font-medium text-gray-800">
              mytwin platform is committed to protecting your privacy while offering you
              cutting-edge health monitoring solutions.
            </p>
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
                We do not sell your data. Your information is shared only among members of your care
                team relevant to your care plans/programs.
              </p>
              <p>
                MyTwin app/website/platform is not a substitute for professional medical advice,
                diagnosis or treatment. The information provided by the app is based on
                user-reported input and is for informational purposes only. It should not be relied
                upon as medical advice. Always seek the advice of your physician or other qualified
                healthcare provider with any questions you may have regarding a medical condition.
              </p>
              <p>
                mytwin platform does not replace consultation with healthcare professionals and
                users should consult doctors for medical diagnoses and prescriptions. Privacy and
                data security are a priority in accordance with our Privacy Policy. By using mytwin
                app/website/platform, users agree and give consent to these terms.
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
