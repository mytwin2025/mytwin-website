import { Star, MessageCircle } from 'lucide-react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RazorpayButton from '../../components/PaymentComponent';
export default function CoachAppointmenCard({
  name,
  image,
  rating,
  peopleCoached,
  availableSlots,
  onClickAppoint,
  onClickMsg,
  style,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="relative block cursor-pointer flex h-[357px] w-[326px] flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white pb-4 shadow-sm"
      style={style}
    >
      <Link to="/coach-details" className="absolute inset-0 z-0" />
      {/* Coach image */}
      <div className="flex h-[200px] w-full items-end justify-center overflow-hidden bg-gray-100">
        <img src={image} alt={name} className="h-full w-full object-cover object-top" />
      </div>

      {/* Info */}
      <div className="flex w-full flex-col items-center gap-2 px-4 pt-3">
        <p className="text-[18px] font-bold text-black">{name}</p>

        {/* Rating & people coached */}
        <div className="flex items-center gap-1 text-[13px] text-gray-500">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-black">{rating}</span>
          <span>•</span>
          <span>{peopleCoached} People Coached</span>
        </div>

        {/* Availability */}
        <div className="flex w-full items-center justify-between rounded-full bg-gray-100 px-4 py-2">
          <span className="text-[13px] font-medium text-gray-600">Availability</span>
          <span className="text-[13px] font-semibold text-orange-500">
            {availableSlots} slots left
          </span>
        </div>

        {/* CTA row */}
        <div className="mt-1 flex w-full items-center gap-2 z-10" >
          <button
            onClick={onClickAppoint}
            className="flex-1 rounded-full bg-orange-500 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Schedule Appointment
          </button>
          <button
            onClick={onClickMsg}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-orange-300 text-orange-400 transition-colors hover:bg-orange-50"
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
