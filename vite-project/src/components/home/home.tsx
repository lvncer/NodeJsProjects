import React from "react";

interface HomeComponentProps {
  title: string;
}

const HomeComponent: React.FC<HomeComponentProps> = ({ title }) => {
  return (
    <div>
      <h2>This is Home Component!</h2>
      <p>{title}</p>
    </div>
  );
};

export default HomeComponent;
