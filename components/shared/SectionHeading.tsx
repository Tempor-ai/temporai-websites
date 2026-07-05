import React from "react";
interface ISectionHeading {
  tag: string;
  title: string;
  subTitle: string;
}
const SectionHeading = ({ tag, title, subTitle }: ISectionHeading) => {
  return (
    <div className="section-heading">
      <div className="flex justify-center">
        <div className="tag">{tag}</div>
      </div>
      <h2 className="section-title mt-5">{title}</h2>
      <p className="section-description mt-5">{subTitle}</p>
    </div>
  );
};

export default SectionHeading;
