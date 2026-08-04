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
  DollarSign,
  Scale,
  RefreshCw,
} from 'lucide-react';

export default function Refund() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f0efed]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-10 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-70" />
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 backdrop-blur-sm">
            <DollarSign size={12} /> Pricing & Refunds
          </span> */}
          <h1 className="mt-4 font-[Arima] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Cancellation & Refund Policy
          </h1>
          <p className="mt-4 max-w-2xl font-[Inter] text-sm text-gray-400 sm:text-base">
            Effective Date: July 9, 2026. This policy outlines pricing, payment services, hardware returns, and refund requests on the mytwin platform.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:gap-12 lg:py-16">
        {/* Content Area */}
        <div className="flex-1 space-y-12 font-[Inter] text-sm leading-relaxed text-[#2c2d2d]">
          
          {/* 13. Pricing / Refunds / Return / Payment Services */}
          <section id="pricing-refunds" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              1. Pricing, Refunds & Payment Services
            </h2>
            <div className="space-y-4 text-justify text-gray-800">
              <p>
                All payments in respect of the Medical Services, Health and Wellness Coaching packages, Pro/Premium Plans, Care plans, upgraded plans and Add on lab tests, doctor consultation fees, smart CGM, smart Ring, Smart Scale, Smart BP monitor devices cost or rate or other Services shall be collected in advance or as per the plan on the Platform. Additional GST taxes or third-party charges may apply as communicated at the time of payment. Payments are collected upfront and are non-refundable. mytwin reserves the right to revise pricing for new enrolments and renewals.
              </p>
              <p>
                If you request cancellation before your first scheduled session or onboarding consultation, a refund may be considered. In such cases, any administrative, onboarding, or payment gateway charges may be deducted. If any consultation has already taken place, the cost of those sessions will be deducted at standard rates.
              </p>
            </div>

            {/* Warning / OTP Alert */}
            <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 shadow-sm">
              <AlertTriangle className="mt-0.5 shrink-0 text-red-600" size={20} />
              <div>
                <h4 className="font-bold text-red-950">Security Warning</h4>
                <p className="mt-1 text-xs sm:text-sm">
                  No one from mytwin platform will call you for your OTP, CVV or any other secure codes. Please do not disclose this information to anyone.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* Refund Criteria & Timelines */}
          <section id="criteria-timelines" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              2. Refund Request Criteria & Process
            </h2>
            <p className="text-gray-800 text-justify">
              In case of any cancellation either by You due to some emergency cases of serious medical events, hospitalisation, or other unavoidable circumstances (subject to the terms specified above) or mytwin platform or third-party clinics/ hospitals/labs partners, the amounts paid in respect of such Services shall be initiated for refund after deducting platform charges incurred from our side within seven to fourteen (7-14) business days from the date of approval.
            </p>

            <div className="space-y-4 rounded-2xl border border-black/5 bg-[#e8e7e3]/40 p-5">
              <p className="font-semibold text-gray-900">How to request a refund:</p>
              <ul className="list-disc space-y-2 pl-5 text-gray-800">
                <li>Customers can raise refund requests within <strong>7 days</strong> of purchase.</li>
                <li>Submit your request to <a href="mailto:support@mytwinlab.com" className="text-orange-600 hover:underline">support@mytwinlab.com</a> along with supporting required documents.</li>
                <li>Timelines for refund of the designated amount to the source account shall be governed as per the relevant bank’s policy.</li>
              </ul>
              <p className="text-xs text-gray-600 mt-2">
                Discontinuation of any mytwin Care plans/programs or packages or any services does not automatically entitle the users or Members to a refund.
              </p>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* Wearable Devices Return Policy */}
          <section id="device-returns" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              3. Device & Hardware Return Policy
            </h2>
            <div className="space-y-3 text-gray-800 text-justify">
              <p>
                The wearable, wellness or medical devices (including but not limited to smart CGM, smart Ring, Smart Scale, Smart BP monitor) must be returned in its original condition, unused and in its original packaging along with any accessories or documentation originally provided.
              </p>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs sm:text-sm">
                <strong>Please Note:</strong> mytwin reserves the right to reject any refund or replacement request that does not meet the conditions stated herein or is inconsistent with the outlined return process.
              </div>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 14. Governing Law and Jurisdiction */}
          <section id="governing-law" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              4. Governing Law and Jurisdiction
            </h2>
            <p className="text-gray-800 text-justify">
              These mytwin platforms (Both web and mobile apps) Terms shall be governed by the laws of India. In the event of any dispute between the Parties in relation to these Terms, the courts in Thane, Maharashtra, India shall have exclusive jurisdiction.
            </p>
            <div className="rounded-xl border border-black/5 bg-white p-4 flex items-center gap-3">
              <Scale size={18} className="text-orange-600 shrink-0" />
              <p className="text-xs text-gray-600">
                By using mytwin Services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* 15. Disclaimer of Warranties & Liability */}
          <section id="disclaimer" className="scroll-mt-28 space-y-6">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              5. Disclaimer of Warranties & Liability
            </h2>
            <div className="space-y-4 text-justify text-gray-800">
              <div className="rounded-xl border border-black/5 bg-black/5 p-5 font-mono text-xs text-gray-700 uppercase leading-relaxed">
                USER ACKNOWLEDGES AND AGREES THAT THE SERVICES ARE PROVIDED ON &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE AND THAT USE OF SERVICES SHALL BE AT SOLE RISK OF USER(S). MYTWIN PLATFORM (BOTH WEBSITE AND MOBILE APPS), ANY SUBSIDIARY, AFFILIATE, DIRECTOR, OFFICER, EMPLOYEE AND AGENT (&ldquo;MYTWIN PLATFORM PARTIES, OWNED BY TWINBODY HEALTHCARE TECHNOLOGIES PRIVATE LIMITED&rdquo;) EXPRESSLY DISCLAIMS ANY AND ALL IMPLIED OR EXPRESS WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW IN CONNECTION WITH THE SERVICES. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM THE PORTAL OR SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THE TERMS OF USE.
              </div>

              <p>
                You accept and acknowledge that mytwin platform (Both web and mobile apps) does not verify any content or information provided by or obtained from either the User(s) or Third Party Service Providers, and to fullest extent permitted by applicable law(s), disclaims all liability arising out of the Other Parties’ use or reliance upon the Portal, the Services, data and reports by Third Party Service Providers.
              </p>
              <p>
                MyTwin Platform (Both web and mobile apps) is not responsible for the conduct, whether online or offline, of any User of the Services or Third Party Service Provider.
              </p>
              <p>
                Under no circumstances shall mytwin platform (Both web and mobile apps) be responsible for any loss or damage, including personal injury or death, resulting from use of the Services, from any User(s) Content or mytwin platform Content posted on or through the Services, or from the conduct of any User(s) of the Services or Third Party Service Provider, whether online or offline. mytwin platform cannot guarantee and does not promise any specific results from use of the Services.
              </p>
            </div>
          </section>

          <hr className="border-black/5" />

          {/* Policy Modifications */}
          <section id="policy-modifications" className="scroll-mt-28 space-y-4">
            <h2 className="font-[Arima] text-2xl font-bold text-black md:text-3xl">
              6. Policy Modifications & Discontinuation
            </h2>
            <p className="text-gray-800 text-justify">
              Mytwin platform (Both web and mobile apps) reserves the right to introduce and initiate new features, functionalities and components to the Portal and/or change, alter, modify, suspend, discontinue or remove the existing ones without any prior notice to you. mytwin reserves the right to modify this Refund or Privacy or Terms and conditions Policy at any time. Updated versions will be published on our website with a revised &ldquo;Last updated&rdquo; date. Continued use of the mytwin Services constitutes acceptance of the revised Terms. Further, mytwin platform is entitled to discontinue (either permanently or temporarily) one or more of the Services provided or terminate the Portal without any prior notice to you.
            </p>
            <p className="mt-3 border-t border-black/5 pt-3 text-center font-semibold text-black sm:text-left">
              &copy; twinbody healthcare technologies private limited. All rights reserved.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
