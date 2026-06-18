import React from 'react';
import { Media } from '../utils/media';
import {
  User, Star,
} from "lucide-react";
export default function CoachDetails() {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-[#f0efed]">
      <div className="content flex w-[80%] h-full flex-col items-start justify-start gap-6 mt-[124px]">
        <CoachBanner />
        <div className="w-full h-full flex items-start justify-center gap-6">
          <div className="flex flex-col items-center justify-start gap-4 w-[25%] h-full">
            <FollowerCard />
            <ReviewCard />
            <ChipCard />
            <ChipCard name="Interested" data={['calisthenics', 'trecking', 'powerlifting']} />
          </div>
          <div className="flex w-[75%] h-full">
            <RatingReviewComment/>
          </div>
        </div>
      </div>
    </div>
  );
}

const CoachBanner = ({
  imgSrc = Media.coaches.coachBanner,
  name = 'Rashmi Jaiswal',
}) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end rounded-xl overflow-hidden">
      <img
        src={imgSrc}
        alt="Coach Banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-[32px] left-[32px] flex w-[calc(100%-64px)] items-center justify-between">
        <div className="flex items-center justify-start gap-8">
          <div className="flex h-[144px] w-[144px] items-center justify-center overflow-hidden rounded-full bg-[#c3c8d7]">
            <img
              src={Media.coaches.coachImage}
              alt="Coach"
              style={{ objectFit: 'cover' }}
              className="h-full w-full rounded-full"
            />
          </div>
          <span className="rounded-full bg-[#26373f] px-6 py-2 font-[Inter] text-[20px] text-white">
            {name}
          </span>
        </div>
        <div className="absolute bottom-0 right-0 flex items-end justify-end gap-4">
          <GradientButton text="See Plans" onClick={() => {}} />
          <GradientButton text="Chat With Coach" icon={Media.icons.msgIcon} iconSize={24} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

const GradientButton = ({ text, icon, iconSize, onClick, textStyle }) => {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[48px] min-w-[120px] px-4  items-center justify-around gap-2 rounded-full border-x-[2px] border-b-[2px] border-[#fff] bg-gradient-to-t from-[#C9CED5] to-[#fff] text-[14px] font-semibold text-black"
    >
      {icon && (
        <img src={icon} alt={`${text} icon`} style={{ height: iconSize, width: iconSize }} />
      )}
      <span className="ml-2" style={textStyle}>
        {text}
      </span>
    </button>
  );
};

const FollowerCard = ({
  following = 108, followers = 1200,
}) => {
  return (
    <div className="flex items-center justify-around gap-8 rounded-lg bg-white px-2 py-4 w-full h-[84px]">
      <div className="flex flex-col items-center justify-center">
        <span className="text-[18px] font-bold text-black">{following}</span>
        <span className="text-[14px] text-gray-500">Following</span>
      </div>
      <div className="h-full w-[1px] bg-gray-300"></div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-[18px] font-bold text-black">{followers}</span>
        <span className="text-[14px] text-gray-500">Followers</span>
      </div>
    </div>
  );

};

const ReviewCard = ({
  peopleCoached = 100,
  rating = 4.5,
  reviews = 200,
}) => {
  return (
    <div className="flex flex-col items-start justify-between rounded-lg bg-white pl-4 py-3 w-full h-[84px]">
      <div className="flex items-center justify-start gap-4"> 
        <User size={15} className="text-gray-500" />
        <span className="text-[14px] font-semibold text-black font-[Public Sans]">{peopleCoached} People Coached </span> 
      </div>
      <div className="flex items-center justify-start gap-4"> 
        <Star size={15} className="text-gray-500" />
        <span className="text-[14px] font-semibold text-black font-[Public Sans]">{rating} ({reviews} Reviews) </span> 
      </div>
    </div>
  );
};

const ChipCard = ({
  data = ['Weight Loss', 'Muscle Gain', 'Nutrition', 'Yoga', 'Cardio'],
  name="Speciality"
}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-3 w-full">
      <span className="text-[16px] font-bold text-black">{name}</span>
      <div className="flex  items-center justify-start gap-4 flex-wrap ">
        {data.map((item, index) => (
          <p key={index} className="rounded-xl bg-[#3B424929] px-4 py-1 text-[12px] text-gray-700 font-[Public Sans]">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

const DUMMY_REVIEWS = [
  {
    id: 1,
    name: 'Khushhali Chauhan',
    rating: 5,
    avatar: null,
    comment:
      "I've been working with Priti for just 3 months, and the transformation has been incredible. She has been so supportive, warm, and encouraging every step of the way. When I started, my HbA1c was 9.8, and I felt overwhelmed. Today, it's down to 6.1, something I honestly couldn't have done without her guidance and constant support. More than just the numbers, I feel happier, more confident, and stronger in my body. This journey has truly changed how I feel about myself, and I'm deeply grateful to her.",
  },
  {
    id: 2,
    name: 'Surekha Reddy',
    rating: 5,
    avatar: null,
    comment:
      'I have been with Priti for 6 months! She was the difference I needed to start losing weight again. I was stuck and could not out-exercise my poor diet. She taught me the order in which to eat foods — fiber, protein, carbs — which makes sense for my prediabetes. She literally showed me how to eat 100+ grams of protein with foods I already had in my house. She encouraged me to push my weights weekly when I had become complacent. Her ultimate goals for me had to do with being the healthiest version of myself as I age. It has been very inspiring!💕',
  },
  {
    id: 3,
    name: 'Amrita',
    rating: 5,
    avatar: null,
    comment:
      'Before I met Priti, I have struggled with weight loss for almost 3 years, I tried everything on my own. But as soon as I started working with Priti, I could see results from next week itself. I have PCOD and Priti educated me so much on this, and I was able to see changes in my mood, craving pattern, skin, sleep schedule and everything which collectively showed me immense results. I\'ll highly recommend her for anyone who is looking to get into better version of themselves along with learning about their body.',
  },
  {
    id: 4,
    name: 'Shraddha Rajpriya Raval',
    rating: 5,
    avatar: null,
    comment:
      "When I had to decide which coach I was going to go with, I messaged a few of them, Priti was the quickest who replied. hence, I made my mind to go with Priti. I joined her coaching on 22nd April 2024. in the last six months, I was able to lose 15.8kg under her guidance. Priti is amazing in explaining her knowledge of nutrition and workout techniques, which makes everything so simple and easy to believe and understand. Priti has always replied to me, it doesn't matter what time of the day or what day of the week.",
  },
];

const STAR_DISTRIBUTION = [
  { label: '5 Star', percent: 88 },
  { label: '4 Star', percent: 6 },
  { label: '3 Star', percent: 3 },
  { label: '2 Star', percent: 2 },
  { label: '1 Star', percent: 1 },
];

const RatingReviewComment = ({
  averageRating = 4.9,
  totalStars = 5,
  reviews = DUMMY_REVIEWS,
  starDistribution = STAR_DISTRIBUTION,
}) => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Rating Summary Card */}
      <div className="flex w-full items-center justify-between rounded-xl bg-white px-8 py-6 gap-8">
        {/* Left: Average Rating */}
        <div className="flex flex-col items-center justify-center gap-2 min-w-[140px]">
          <span className="text-[14px] text-gray-500 font-[Public Sans]">Average rating</span>
          <span className="text-[48px] font-bold text-black leading-tight">{averageRating}/{totalStars}</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStars }).map((_, i) => (
              <Star
                key={i}
                size={22}
                className={i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-200'}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[80px] w-[1px] bg-gray-200 shrink-0" />

        {/* Right: Star Breakdown */}
        <div className="flex flex-1 flex-col gap-2">
          {starDistribution.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-[44px] text-right text-[13px] text-gray-500 font-[Public Sans]">{row.label}</span>
              <div className="flex-1 h-[6px] rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gray-800"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Comments */}
      <div className="flex flex-col gap-4 w-full">
        {reviews.map((review) => (
          <div key={review.id} className="flex items-start gap-6 rounded-xl bg-white px-6 py-5">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2 shrink-0 w-[80px]">
              <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#c3c8d7] overflow-hidden">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} className="h-full w-full object-cover rounded-full" />
                ) : (
                  <User size={32} className="text-[#7a8499]" />
                )}
              </div>
              <span className="text-[12px] font-semibold text-black text-center font-[Public Sans] leading-tight">
                {review.name}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: totalStars }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-200'}
                  />
                ))}
              </div>
              <p className="text-[14px] text-gray-700 font-[Public Sans] leading-relaxed">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};