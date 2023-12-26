import React from "react";

interface BridgeInButtonProps {
  text: string;
  onClick: () => void;
}

export const BridgeInButton: React.FC<BridgeInButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="px-4 py-1 rounded-lg text-sm font-medium text-white violet-fill"
      onClick={onClick} // No need for an arrow function here
    >
      {text}
    </button>
  );
};
