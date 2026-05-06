import { MotionValue } from "motion";
import { M } from "../motion";
import { HTMLAttributes, HtmlHTMLAttributes } from "react";

export interface CardProp {
  lineWidth: MotionValue<string>;
  title: string;
  button: boolean;
  buttonTitle?: string;
  bgColor: string;
  textColor: string;
  line: boolean;
  className?: HTMLAttributes<HTMLDivElement | string | null> | string;
}

export default function ({
  lineWidth,
  title,
  button,
  buttonTitle,
  bgColor,
  textColor,
  line,
  className,
}: CardProp) {
  return (
    <div
      className={`
            group  bg${bgColor}
    border-[6px] border-black
    shadow-[12px_12px_0_#000]
    transition-[transform,box-shadow] duration-300 ease-out
    will-change-transform
    hover:-translate-x-1.25 hover:-translate-y-1.25
    hover:shadow-[17px_17px_0_#000]
    flex flex-col
      ${className}`}
    >
      <p
        className={`font-calibri leading-[1.2] font-bold tracking-wide mb-6 mr-20 text-deep ${textColor} `}
      >
        {title}
      </p>
      {line ? (
        <M.div style={{ width: lineWidth }} className="h-0.75 bg-black mb-5" />
      ) : (
        ""
      )}
      {button ? (
        <button
          className="
          relative overflow-hidden w-full
          border-[3px] border-deep bg-deep text-white
          py-3 text-xl font-bold uppercase tracking-widest
          font-georgia cursor-pointer
          transition-transform duration-300 active:scale-95
          before:content-['Let\'s_go_→']
          before:absolute before:inset-0 before:w-full before:h-[105%]
          before:bg-cream before:text-black
          before:flex before:items-center before:justify-center
          before:translate-y-full before:transition-transform before:duration-300
          hover:before:translate-y-0
        "
        >
          {buttonTitle}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
