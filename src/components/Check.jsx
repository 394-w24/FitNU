import "./Check.css";
import { nextProfile } from "./ProfileHandler";


const Check = () => {
  return (
    <div className="matchButton">
      <button onClick={handleMatchClick} class="match-button">
        <img src="/checkmark.png" alt="Checkmark" class="icon" />
      </button>
    </div>
  );
};

function handleMatchClick() {
  console.log("You clicked me!");
  nextProfile();
};






export default Check;
