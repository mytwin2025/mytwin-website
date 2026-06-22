import React from 'react';

export default function DetailsCard({
  index = '',
  title = ``,
  paragraph = ``,
  variant = '',
  buttonColor = '#E31F5D',
  image = null,
  icon = null,
  style = {},
  bgColor = '#fff',
  imageClassName='',
  textClassName='',
}) {
  const procTitle = title.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
  const procParagraph = paragraph.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));

  return (
    <div
      style={{
        overflow: 'hidden',
        borderRadius: '32px',
        backgroundColor: bgColor,
        display: 'block',
        position: 'relative',
        margin: '8px',
        ...style,
        
      }}
      className={
        variant === 'vertical'
          ? 'w-full md:w-[276px] h-auto min-h-[400px] md:h-[696px]'
          : 'w-full md:w-[563px] h-auto min-h-[220px] md:h-[342px]'
      }
    >
      <div className="flex h-full w-full flex-col items-start justify-between gap-4 p-6">
        <div className={``}>
          <img src={icon} alt={`${title} icon`} style={{ width: '60px', height: '60px' }} />
          <h3
            style={{ color: buttonColor }}
            className={`font-[Inter] text-xl font-bold text-black mt-2`}
          >
            {procTitle}
          </h3>
          <p className={`text-sm text-[#484848] mt-2 whitespace-pre-wrap ${textClassName}`}>{paragraph}</p>
        </div>
        <RoundArrowButton
          buttonColor={buttonColor}
          onClick={() => {
            // Handle button click, e.g., navigate to details page
            console.log(`Clicked on ${title}`);
          }}
          style={{ zIndex: 1 }}
        />
      </div>

      <img
        src={image}
        alt={title}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          objectFit: 'cover',
        }}
        className={` ${imageClassName}`}
      />
    </div>
  );
}

export const RoundArrowButton = ({
  buttonColor = '#E31F5D',
  height = 40,
  width = 40,
  onClick = () => {},
  style = {},
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: buttonColor,
        height: `${height}px`,
        width: `${width}px`,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        transform: 'rotate(-45deg)',
        ...style,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 15 15">
        <path d="M0 0h15v15H0z" fill="none" />
        <path
          fill="#fff"
          d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"
        />
      </svg>
    </button>
  );
};
