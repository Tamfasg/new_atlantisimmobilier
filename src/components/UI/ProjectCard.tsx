import React from "react";
import { M } from "../motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectCardProp {
  ImageSrc: string;
  name: string;
}

const ProjectCard = ({ ImageSrc, name }: ProjectCardProp) => {
  return (
    <M.div className="group relative h-120 w-120 overflow-hidden  shadow-xs shadow-champagne transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-10 p-0">
      <M.div className="absolute inset-0  bg-deep p-0.5 w-full h-full m-0">
        <M.image
          src={ImageSrc}
          alt={name}
          className=" h-full w-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:blur-lg group-hover:opacity-20"
        />
      </M.div>

      <M.div
        className="
          pointer-events-none absolute inset-0 
          flex items-end justify-center overflow-hidden
          bg-linear-to-t from-deep/70 to-deep
          opacity-20 transition-opacity duration-700 ease-out
          group-hover:opacity-100
        "
      >
        <M.div className="w-full translate-y-10 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <M.div className="mx-auto mb-10 h-1 w-0 bg-cream transition-all duration-700 ease-out group-hover:w-3/4" />

          <M.p
            className="
              w-full translate-y-full px-6 pb-8 pt-4 text-center
              font-calibri text-4xl font-bold
              bg-linear-to-r 
               text-cream
              flex justify-center items-center
              transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:-translate-y-5
            "
          >
            {name}
            <ArrowRight size={42} />
          </M.p>
          <M.div className="mx-auto mb-10 h-1 w-0 bg-cream transition-all duration-700 ease-out group-hover:w-3/4" />
        </M.div>
      </M.div>
    </M.div>
  );
};

export default ProjectCard;
