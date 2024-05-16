import "./HistoryPanel.css";

const HistoryPanel = ({ children }) => {
  const handleClearHistory = () => {
    localStorage.removeItem("calculatorHistory");
    window.location.reload();
  };
  return (
    <>
      <div className="historyHeader">
        <h3>History</h3>
        {/* <button className="history-toggle">☰</button> */}
      </div>
      <ul className="historyArea">{children}</ul>
      <button className="clearHistory" onClick={handleClearHistory}>
        Clear History
      </button>
    </>
  );
};

export default HistoryPanel;

HistoryPanel.propTypes = { children: String };
