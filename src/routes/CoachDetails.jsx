import React from 'react';
import { Media } from '../utils/media';
import { User, Star } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import CoachPlans from './CoachPlans';
export const REVIEWS_KISHOR = [
  {
    id: 1,
    name: 'Sunil Rathod',
    rating: 5,
    avatar: null,
    comment: "It's a really good app for managing daily health monitoring and well-being",
  },
  {
    id: 2,
    name: 'Samir Shelar',
    rating: 5,
    avatar: null,
    comment:
      'very nice app to know about your health insights. very good way to track your day to day activities',
  },
  {
    id: 3,
    name: 'Sachin Ghutukade',
    rating: 5,
    avatar: null,
    comment:
      'Nice app for health and habit tracking for me. start your new yr 2026 with this app Definitely change will happen with This app',
  },
  {
    id: 4,
    name: 'Suresh Chavan',
    rating: 5,
    avatar: null,
    comment: 'The app is really authentic for health related issues and feels ausom.',
  },
];

export const REVIEWS_RASHMI = [
  {
    id: 1,
    name: 'Seema Rathod',
    rating: 5,
    avatar: null,
    comment:
      'It’s a really well-designed app for daily health and fitness tracking and insights simple, effective and user-friendly. What truly stands out is the MyTwin t…',
  },
  {
    id: 2,
    name: 'Charanjit Singh',
    rating: 5,
    avatar: null,
    comment: 'very very good health help full this App.',
  },

  {
    id: 3,
    name: 'Manasi Pardeshi',
    rating: 5,
    avatar: null,
    comment: 'nice app easy to use.',
  },

  {
    id: 4,
    name: 'Sujit Kumar ',
    rating: 5,
    avatar: null,
    comment: 'great app please purchase subscription will add to your health.',
  },

  {
    id: 5,
    name: 'Sibin George',
    rating: 5,
    avatar: null,
    comment: 'I have used the app, it is very useful to monitor our daily living pattern.',
  },
];

export default function CoachDetails() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isPlans = searchParams.get('plans') === 'true';
  //     coachRating: rating,
  //     coachPeopleCoached: peopleCoached,
  return (
    <div className="flex h-auto min-h-screen w-full items-start justify-center bg-[#f0efed]">
      <div className="content flex h-full w-full max-w-5xl flex-col items-start justify-start gap-4 px-4 pb-8 pt-[96px] sm:gap-6 sm:px-6 sm:pb-10 sm:pt-[112px] lg:px-0 lg:pt-[124px]">
        <CoachBanner
          coachImage={location?.state?.coachImage || Media.coaches.coachBanner}
          name={location?.state?.coachName}
          onSeePlans={() => setSearchParams({ plans: 'true' })}
        />
        {isPlans ? (
          <CoachPlans />
        ) : (
          <div className="flex h-full w-full flex-col items-start justify-center gap-4 lg:flex-row lg:gap-6">
            <div className="flex h-full w-full flex-col items-center justify-start gap-4 lg:w-[25%]">
              <FollowerCard />
              <ReviewCard
                rating={location.state.coachRating}
                peopleCoached={location.state.coachPeopleCoached}
              />
              <ChipCard />
              <ChipCard name="Interested" data={['calisthenics', 'trecking', 'powerlifting']} />
            </div>
            <div className="flex h-full w-full lg:w-[75%]">
              {location?.state?.coachName === 'Kishor Chavan' ? (
                <RatingReviewComment reviews={REVIEWS_KISHOR} />
              ) : (
                <RatingReviewComment reviews={REVIEWS_RASHMI} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const CoachBanner = ({
  imgSrc = Media.coaches.coachBanner,
  name = 'Rashmi Jaiswal',
  onSeePlans,
  coachImage,
}) => {
  return (
    <div className="relative flex min-h-[280px] w-full flex-col items-center justify-end overflow-hidden rounded-2xl sm:min-h-[340px] lg:min-h-[420px]">
      <img
        src={imgSrc}
        alt="Coach Banner"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative flex w-full flex-col gap-4 p-4 sm:p-6 lg:mt-auto lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:p-8">
        <div className="flex flex-col items-start justify-start gap-4 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
          <div className="flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-full bg-[#c3c8d7] sm:h-[112px] sm:w-[112px] lg:h-[144px] lg:w-[144px]">
            <img
              src={coachImage || Media.coaches.coachImage}
              alt="Coach"
              style={{ objectFit: 'cover' }}
              className="h-full w-full rounded-full"
            />
          </div>
          <span className="rounded-full bg-[#26373f] px-4 py-2 font-[Inter] text-[16px] text-white sm:px-5 sm:text-[18px] lg:px-6 lg:text-[20px]">
            {name}
          </span>
        </div>
        <div className="flex w-full flex-col items-stretch justify-end gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start lg:w-auto lg:justify-end">
          <GradientButton text="Chat with coach" onClick={() => {}} />
          {/* <GradientButton
            text="Chat With Coach"
            icon={Media.icons.msgIcon}
            iconSize={24}
            onClick={() => {}}
          /> */}
        </div>
      </div>
    </div>
  );
};

const GradientButton = ({ text, icon, iconSize, onClick, textStyle }) => {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-x-[2px] border-b-[2px] border-[#fff] bg-gradient-to-t from-[#C9CED5] to-[#fff] px-4 text-[14px] font-semibold text-black sm:w-auto sm:min-w-[160px]"
    >
      {icon && (
        <img src={icon} alt={`${text} icon`} style={{ height: iconSize, width: iconSize }} />
      )}
      <span className={icon ? 'ml-2' : ''} style={textStyle}>
        {text}
      </span>
    </button>
  );
};

const FollowerCard = ({ following = 108, followers = 1200 }) => {
  return (
    <div className="flex h-auto w-full items-center justify-around gap-4 rounded-lg bg-white px-4 py-4 sm:min-h-[84px] sm:gap-8 sm:px-2">
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

const ReviewCard = ({ peopleCoached = 100, rating = 4.5, reviews = 200 }) => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-3 rounded-lg bg-white px-4 py-3 sm:min-h-[84px] sm:gap-2">
      <div className="flex items-center justify-start gap-3">
        <User size={15} className="text-gray-500" />
        <span className="font-[Public Sans] text-[14px] font-semibold text-black">
          {peopleCoached} People Coached{' '}
        </span>
      </div>
      <div className="flex items-center justify-start gap-3">
        <Star size={15} className="text-gray-500" />
        <span className="font-[Public Sans] text-[14px] font-semibold text-black">
          {rating} ({reviews} Reviews){' '}
        </span>
      </div>
    </div>
  );
};

const ChipCard = ({
  data = ['Weight Loss', 'Muscle Gain', 'Nutrition', 'Yoga', 'Cardio'],
  name = 'Speciality',
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-3">
      <span className="text-[16px] font-bold text-black">{name}</span>
      <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
        {data.map((item, index) => (
          <p
            key={index}
            className="font-[Public Sans] rounded-xl bg-[#3B424929] px-3 py-1 text-[12px] text-gray-700 sm:px-4"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};



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
      <div className="flex w-full flex-col items-stretch justify-between gap-6 rounded-xl bg-white px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-6">
        {/* Left: Average Rating */}
        <div className="flex min-w-[140px] flex-col items-center justify-center gap-2 self-center lg:self-auto">
          <span className="font-[Public Sans] text-[14px] text-gray-500">Average rating</span>
          <span className="text-[36px] font-bold leading-tight text-black sm:text-[48px]">
            {averageRating}/{totalStars}
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalStars }).map((_, i) => (
              <Star
                key={i}
                size={22}
                className={
                  i < Math.round(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-300'
                }
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full shrink-0 bg-gray-200 lg:h-[80px] lg:w-[1px]" />

        {/* Right: Star Breakdown */}
        <div className="flex flex-1 flex-col gap-2">
          {starDistribution.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="font-[Public Sans] w-[44px] text-right text-[13px] text-gray-500">
                {row.label}
              </span>
              <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-gray-200">
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
      <div className="flex w-full flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-start gap-4 rounded-xl bg-white px-4 py-4 sm:flex-row sm:gap-6 sm:px-6 sm:py-5"
          >
            {/* Avatar */}
            <div className="flex w-full shrink-0 flex-row items-center gap-3 sm:w-[80px] sm:flex-col sm:items-center sm:gap-2">
              <div className="flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-[#c3c8d7] sm:h-[64px] sm:w-[64px]">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-[#7a8499]" />
                )}
              </div>
              <span className="font-[Public Sans] text-left text-[12px] font-semibold leading-tight text-black sm:text-center">
                {review.name}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: totalStars }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-300'
                    }
                  />
                ))}
              </div>
              <p className="font-[Public Sans] text-[14px] leading-relaxed text-gray-700">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
