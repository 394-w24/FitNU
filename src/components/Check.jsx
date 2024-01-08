import "./Check.css";


const Check = () => {
  return (
    <div className="matchButton">
      <button onclick="handleMatchClick()" class="match-button">
        <img src="/checkmark.png" alt="Checkmark" class="icon" />
      </button>
    </div>
  );
};

export default Check;
