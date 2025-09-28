import { Shield } from "lucide-react";
import medivaultLogo from "@/assets/medivault-logo.png";

interface MediVaultLogoProps {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export const MediVaultLogo = ({ className = "", showIcon = true, size = "md" }: MediVaultLogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl", 
    lg: "text-4xl"
  };

  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && (
        <div className="relative">
          <img 
            src={medivaultLogo} 
            alt="MediVault Logo" 
            className={`${iconSizes[size]} object-contain`}
          />
        </div>
      )}
      <span className={`font-bold text-primary ${sizeClasses[size]}`}>
        MediVault
      </span>
    </div>
  );
};