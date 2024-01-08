import "./Check.css";


const Cross = () => {
  return (
    <div className="matchButton">
        <button onclick="handleRejectClick()" class="reject-button">
            <img src="/xmark.png" alt="X Mark" class="icon" />
        </button>
    </div>
  );
};

export default Cross;