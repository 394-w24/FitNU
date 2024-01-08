import "./Check.css";
import { nextProfile } from "./ProfileHandler";


const Cross = () => {
  return (
    <div className="matchButton">
      <button onClick={handleRejectClick} class="reject-button">
        <img src="/xmark.png" alt="X Mark" class="icon" />
      </button>
    </div>
  );
};

function handleRejectClick() {
  alert("You clicked reject!");
  nextProfile();
};


export default Cross;