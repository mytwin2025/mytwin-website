import React from "react";
import { Media } from "../../utils/media";
export default function AppSection() {
  return (
    <section className="phone w-full h-screen flex items-center justify-center bg-gray-300 absolute top-0 left-0 right-0 bottom-0 z-[-10]">
      <div ref={bgBlurSlider} id="bgBlurSlider" className="">
        <div className="blur-top" />
      </div>
      <div className="w-auto h-auto flex items-center justify-center relative grid-cols-1 md:grid-cols-1">
        <img
          src={Media.landing.iphoneModel}
          alt="iPhone Model"
          className="h-[584px] object-cover"
        />
      </div>
    </section>
  );
}
