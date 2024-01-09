import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross"

const PersonalizedView = () => {
  return <div className="personalized-view">


    <Check />
    {/* profile image here */}
    <Cross />

  </div>;
};

export default PersonalizedView;
