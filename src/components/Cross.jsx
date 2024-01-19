import "./Check.css";
import { calculateMatchingAll, nextProfile } from "./ProfileHandler";


const Cross = () => {
  calculateMatchingAll('cross')
  return (
    <div className="matchButton">
      <button onClick={handleRejectClick} className="reject-button">
        <img src="/xmark.png" alt="X Mark" className="icon" />
      </button>
    </div>
  );
};

function handleRejectClick() {
  alert("You rejected this match!");

  nextProfile();
};


export default Cross;