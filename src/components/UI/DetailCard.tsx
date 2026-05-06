import React from "react";
import { M } from "../motion";
import { MapPin, Building2, CheckCircle2, ArrowRight } from "lucide-react";

interface DetailCardProp {
  src: string;
  name: string;
  location?: string;
  subtitle?: string;
  status?: string;
  statusColor?: string,
}

const DetailCard = ({
  src,
  name,
  location ,
  subtitle,
  statusColor,
  status,
}: DetailCardProp) => {
  return (
    <M.div className="relative mx-auto w-130 max-sm:w-[90vw] h-fit scale-95">
      <M.div className="absolute inset-0 rounded-[2.5rem] bg-[#d6c7a3]/20 blur-3xl" />

      <M.div
        className="
          relative overflow-hidden
          rounded-[2.5rem]
          bg-[#1e1e1e]
          border border-[#d6c7a3]/50
          shadow-2xl
        "
      >
        <M.div className="absolute inset-3 pointer-events-none rounded-[2rem] border border-[#d6c7a3]/20 -z-0" />

        <M.div className="relative h-[350px] max-sm:h-[200px] overflow-hidden">
          <M.image
            src={src}
            alt={name}
            className="w-full h-full object-cover"
          />

        </M.div>
        <M.div className="relative z-20 px-10 max-sm:px-6 pt-8 pb-10">
          <M.div className="flex gap-6 items-center border-b border-[#d6c7a3]/20 pb-7">
            <InfoIcon>
              <Building2 size={23} />
            </InfoIcon>

            <M.div>
              <M.p className="text-[#d6c7a3] text-xs tracking-[0.35em] uppercase mb-2">
                Brand
              </M.p>

              <M.h3 className="text-[#f0ede6] text-4xl max-sm:text-3xl font-georgia leading-tight">
                {name}
              </M.h3>

              {subtitle && (
                <M.p className="text-[#f0ede6]/50 text-sm mt-2">
                  {subtitle}
                </M.p>
              )}
            </M.div>
          </M.div>

          <M.div className="flex gap-6 items-center border-b border-[#d6c7a3]/20 py-7">
            <InfoIcon>
              <MapPin size={23} />
            </InfoIcon>

            <M.div>
              <M.p className="text-[#d6c7a3] text-xs tracking-[0.35em] uppercase mb-2">
                City
              </M.p>

              <M.h4 className="text-[#f0ede6] text-3xl max-sm:text-2xl font-calibri">
                {location}
              </M.h4>
            </M.div>
          </M.div>

          <M.div className="flex items-center justify-between gap-6 py-7 max-sm:flex-col max-sm:items-start">
            <M.div className="flex gap-6 items-center">
              <InfoIcon>
                <CheckCircle2 size={23} />
              </InfoIcon>

              <M.p className="text-[#d6c7a3] text-2xl tracking-[0.35rem] uppercase font-calibri font-semibold">
                Status
              </M.p>
            </M.div>
            <M.div className={`flex items-center gap-3 rounded-full border border-[#d6c7a3]/50  px-6 py-3 bg-${statusColor}`}>
              <M.span className="w-2 h-2 rounded-full bg-[#d6c7a3]" />
              <M.span className="text-[#f0ede6] text-lg font-calibri">
                {status}
              </M.span>
            </M.div>
          </M.div>

          <M.button
            className="
              group w-full h-16
              rounded-full
              bg-[#d6c7a3]
              text-[#1e1e1e]
              font-calibri text-2xl
              flex items-center justify-center gap-5
              transition-all duration-500
              hover:bg-[#f0ede6]
            "
          >
            Découvrir
            <ArrowRight
              size={24}
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </M.button>
        </M.div>
      </M.div>
    </M.div>
  );
};

const InfoIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <M.div
      className="
        shrink-0 size-16 max-sm:size-14
        rounded-full
        border border-[#d6c7a3]/45
        bg-[#0f3d2e]
        text-[#d6c7a3]
        flex items-center justify-center
      "
    >
      {children}
    </M.div>
  );
};

export default DetailCard;