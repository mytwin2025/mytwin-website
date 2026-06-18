import React from 'react';
import { CheckCircle as Check } from 'lucide-react';
import RazorpayButton from './PaymentComponent';
import Button from './Button';
import { showToast } from './Toast';
export default function PlanInclusionPricing({
  inclusions = [],
  pricing = [],
  style = {},
  addOnPrice = 0,
  buttonText = 'Proceed to Payment',
  paymentHandler = () => {},
  selectedWeeklyPlan,
  setSelectedWeeklyPlan,
  totalPrice,
  paymentLoading,
}) {
  const [tab, setTab] = React.useState('inclusions');
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div
      className="plan-inclusion-pricing flex h-full w-[70%] flex-col items-start justify-center gap-6 rounded-2xl bg-[#fff] p-8 shadow-lg"
      style={style}
    >
      <h3 className="text-left text-sm font-semibold text-[#71717A]">WHAT'S INCLUDED</h3>
      <div className="content flex w-full items-start justify-around gap-12">
        <div className="inclusions flex w-full flex-col items-start gap-4">
          {inclusions.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check size={20} className="text-[#ff6b01]" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
        <div className="pricing flex w-full flex-col items-center justify-start gap-12">
          <div className="flex items-center gap-3 rounded-full bg-[#f4f4f5] px-4 py-2">
            {pricing.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedWeeklyPlan(pricing[i])}
                className="plan-card cursor-pointer rounded-full px-4 py-2"
                style={{
                  backgroundColor: selectedWeeklyPlan.id === pricing[i].id ? '#fff' : '#f4f4f5',
                  color: selectedWeeklyPlan.id === pricing[i].id ? '#000' : '#71717A',
                  border:
                    selectedWeeklyPlan.id === pricing[i].id
                      ? '2px solid #f2f3f2'
                      : '1px solid #f4f4f5',
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <span className="text-xs font-semibold text-[#71717A]">SUSTAINABLE FAT LOSS FOR</span>
            <span className="text-4xl font-bold text-[#000]">{`₹${totalPrice?.toLocaleString()}`}</span>
          </div>
          <Button
            style={{
              backgroundColor: '#ff6b01',
              color: '#fff',
              padding: '10px 20px',
              height: '50px',
              width: '200px',
              border: 'none',
              borderRadius: '25px',
              cursor: paymentLoading ? 'not-allowed' : 'pointer',
            }}
            onClick={paymentHandler}
            isLoading={paymentLoading}
            text={buttonText}
          />
        </div>
      </div>
    </div>
  );
}
