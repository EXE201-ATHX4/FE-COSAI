import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react'; // Import icons for success and error
// If you don't have lucide-react, you can use FontAwesome or a simple SVG

const ConfirmationDialog = ({
  open, // Controls visibility
  icon, // 'success' or 'error'
  title,
  message,
  primaryButtonText,
  onPrimaryButtonClick,
  secondaryButtonText, // Optional
  onSecondaryButtonClick, // Optional
  onClose // For closing the dialog via overlay/escape (optional for this specific use case)
}) => {
  if (!open) return null; // Don't render if not open

  const IconComponent = icon === 'success' ? CheckCircle : XCircle; // Choose icon based on prop
  const iconColor = icon === 'success' ? '#4CAF50' : '#d32f2f'; // Green for success, red for error

  return (
    <div className="dialog-overlay" onClick={onClose}> {/* Allow closing by clicking overlay */}
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <IconComponent size={60} className="dialog-icon" style={{ color: iconColor }} />
        <h3 className="dialog-title" style={{ color: iconColor }}>{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          {secondaryButtonText && (
            <button className="dialog-button cart-button" onClick={onSecondaryButtonClick}>
              {secondaryButtonText}
            </button>
          )}
          <button className="dialog-button home-button" onClick={onPrimaryButtonClick}>
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;