const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",

  heroHeadText:
    // The particle canvas claims its intrinsic width first, so the text column
    // is narrowest just above the lg breakpoint. Fluid sizing there keeps the
    // full name on one line instead of splitting it.
    "font-archivo font-black text-white lg:text-[clamp(48px,5vw,72px)] sm:text-[56px] xs:text-[42px] text-[34px] lg:leading-[1.2] sm:leading-[72px] xs:leading-[56px] leading-[44px] mt-2 tracking-tight",
  heroSubText:
    "text-[#ffffff] font-medium lg:text-[18px] sm:text-[18px] xs:text-[15px] text-[14px] lg:leading-[30px] sm:leading-[28px] xs:leading-[24px] leading-[22px]",

  sectionHeadText:
    "font-archivo font-black text-white md:text-[56px] sm:text-[46px] xs:text-[38px] text-[28px] tracking-tight",
  sectionSubText:
    "sm:text-[14px] text-[12px] text-[#1cb9d7] uppercase tracking-[0.2em] font-medium",
};

export { styles };
