import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={overlayStyle}>
      <div style={spinnerStyle}></div>
      <div style={textStyle}>Loading...</div>
    </div>
  );
}

// CSS-in-JS styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(255, 255, 255, 0.9)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const spinnerStyle = {
  width: "60px",
  height: "60px",
  border: "6px solid #ccc",
  borderTop: "6px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const textStyle = {
  marginTop: "12px",
  fontSize: "18px",
  color: "#555",
  fontFamily: "Arial, sans-serif",
};
