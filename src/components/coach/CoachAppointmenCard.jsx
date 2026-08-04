import { Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  return (
    <div
      className="relative flex h-fit w-full flex-col rounded-2xl border border-gray-200 bg-white pb-4"
      style={style}
    >
      {/* Coach image */}
      <Link
        to="/coach-details"
        state={{
          coachImage: image,
          coachName: name,
          coachRating: rating,
          coachPeopleCoached: peopleCoached,
        }}
      >
        <div className="flex h-[180px] w-full items-end justify-center bg-gray-100 sm:h-[200px]">
          <img src={image} alt={name} className="h-full w-full object-cover object-top" />
        </div>
      </Link>

      {/* Info */}
      <div className="flex w-full flex-1 flex-col px-4 pt-3">
        <p className="line-clamp-1 text-center text-[18px] font-bold text-black">{name}</p>

        {/* Rating & people coached */}
        <div className="flex flex-wrap items-center justify-center gap-1 text-[13px] text-gray-500">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-black">{rating}</span>
          <span>•</span>
          <span>{peopleCoached} People Coached</span>
        </div>

        {/* Availability */}
        <div className="flex w-full items-center justify-between rounded-full bg-gray-100 px-4 py-1">
          <span className="text-[13px] font-medium text-black">Availability</span>
          <span className="text-[13px] font-semibold text-green-500">
            {availableSlots} slots left
          </span>
        </div>

        {/* CTA row */}
        <div className="z-10 mt-4 flex w-full items-center gap-4">
          <Link
            to="/coach-details?plans=true"
            state={{
              coachImage: image,
              coachName: name,
              coachRating: rating,
              coachPeopleCoached: peopleCoached,
            }}
          >
            <button
              onClick={onClickAppoint}
              className="rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 md:px-4 md:py-1.5 md:text-xs"
            >
              See Programs
            </button>
          </Link>
          <Link
            to="/coach-details"
            state={{
              coachImage: image,
              coachName: name,
              coachRating: rating,
              coachPeopleCoached: peopleCoached,
            }}
          >
            <button className="rounded-full bg-orange-100 px-8 py-3 text-sm font-semibold text-orange-500 transition-colors hover:bg-orange-200 md:px-4 md:py-1.5 md:text-xs">
              View Profile
            </button>
          </Link>
          {/* <button
            onClick={onClickMsg}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-orange-300 bg-orange-100 text-orange-400 transition-colors hover:bg-orange-50"
          >
            <MessageCircle size={16} />
          </button> */}
        </div>
      </div>
    </div>
  );
}
