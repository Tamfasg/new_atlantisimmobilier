import React, { ReactNode } from "react";
import { M } from "../motion";
import { LucideProps } from "lucide-react";

interface CardViewerProp {
  title: string;
  description: string;
  icon: ReactNode;
}

const CardViewer = ({ title, description, icon }: CardViewerProp) => {
  return (
    <M.div className="w-140 h-60 flex flex-colr justify-center  border-gold-muted     backdrop-blur-md bg-white/20 border  rounded-2xl shadow-xl p-8 ">
      <M.div className="w-full h-full flex items-center gap-6">
        <M.div className="text-gold-muted">{icon}</M.div>
        <M.div className="w-full flex flex-col items-start gap-2.5">
          <M.div className="text-3xl font-black font-calibri">
            <M.p className="text-cream">{title}</M.p>
          </M.div>
          <M.div className="text-2xl font-calibri">{description}</M.div>
        </M.div>
      </M.div>
    </M.div>
  );
};

export default CardViewer;
