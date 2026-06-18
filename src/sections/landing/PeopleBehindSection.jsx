import React from 'react';
import Avatar from '../../components/Avatar';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Media } from '../../utils/media';
export default function PeopleBehindSection() {
  const content = React.useRef(null);
  const avatar = React.useRef(null);
  const heading = React.useRef(null);
  const people = [
    {
      name: 'John Doe',
      designation: 'CEO',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Jane Smith',
      designation: 'CTO',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Emily Johnson',
      designation: 'Lead Designer',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Michael Brown',
      designation: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      name: 'Sarah Davis',
      designation: 'Marketing Head',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: content.current,
        start: 'top 100%',
        end: 'bottom 20%',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    });

    // gsap.set(avatar.current, { y: '20%' });
    tl.to(heading.current, {
      y: '200%',
      duration: 1,
      ease: 'power2.out',
    }).to(
      avatar.current,
      {
        y: '60%',
        // duration: 1,
        ease: 'power2.out',
      },
      '<'
    );
  }, []);

  return (
    <div className="relative h-screen w-full items-start justify-center bg-[#F0EFED]">
      <div ref={content} className="relative z-10 h-full w-full">
        <h1 ref={heading} className="text-center font-[Arima] text-4xl font-bold text-gray-800">
          The Minds Behind The Mission
        </h1>
        <div
          ref={avatar}
          className="mt-10 flex w-full translate-y-[90%] flex-wrap items-center justify-center gap-8"
        >
          {people.map((person, index) => (
            <Avatar
              key={index}
              image={person.image}
              name={person.name}
              designation={person.designation}
              style={{
                transform: index % 2 === 0 ? 'translateY(30%)' : 'translateY(-30%)',
              }}
            />
          ))}
        </div>
      </div>
      <img
        src={Media.landing.bgGrid}
        alt="Background Grid"
        style={{ zIndex: 1 }}
        className="absolute bottom-0 left-0 right-0 top-0 m-auto h-full w-full scale-[0.8] object-cover"
      />
    </div>
  );
}
