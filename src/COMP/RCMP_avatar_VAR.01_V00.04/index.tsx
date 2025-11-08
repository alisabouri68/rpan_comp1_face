/******************************************
Component:       Avatar

Last Update:     2025.09.24
By:              Apps.68

Description:     A reusable Avatar component with support for single avatar, group avatars with collapse/expand variants, and online status.
Architecture:    Smart-Comp Architecture (Standard React Component Structure)
******************************************/

/*------------------------------------------------------------
Meta Data

ID:              RCMP_avatar
Title:           Avatar Component with Group Variants
Version:         V00.05
VAR:             02

Last-Update:     D2025.09.24
Owner:           Apps.68

Description:     This component is used to render user avatars with single and group variants including collapse and expand modes.

------------------------------------------------------------*/

/**************************************
 * Step 01: Import dependencies - kernels
 **************************************/

import { useState } from "react";
import { FaCircleUser, FaCompress, FaExpand } from "react-icons/fa6";

/**************************************
 * Step 02: Define Props interfaces
 **************************************/
interface BaseAvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  fallbackText?: string;
  className?: string;
  jsonAdd?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface SingleAvatarProps extends BaseAvatarProps {
  variant?: "single";
}

interface GroupAvatarProps extends BaseAvatarProps {
  variant: "group-collapse" | "group-collapse-live" | "group-expand";
  users?: Array<{
    src?: string;
    alt?: string;
    isOnline?: boolean;
    fallbackText?: string;
  }>;
  maxDisplay?: number;
  collapseThreshold?: number;
}

type AvatarProps = SingleAvatarProps | GroupAvatarProps;

/**************************************
 * Step 03: Define size classes
 **************************************/
const sizeClasses = {
  sm: {
    avatar: "w-8 h-8 text-sm",
    group: "w-8 h-8 text-xs",
    status: "w-2 h-2",
    border: "border-2"
  },
  md: {
    avatar: "w-12 h-12 text-base",
    group: "w-10 h-10 text-sm",
    status: "w-3 h-3",
    border: "border-2"
  },
  lg: {
    avatar: "w-16 h-16 text-xl",
    group: "w-14 h-14 text-base",
    status: "w-4 h-4",
    border: "border-2"
  },
};

/**************************************
 * Step 04: Component Definition
 **************************************/

// Simple Image component replacement
const Image: React.FC<{
  styles: React.CSSProperties;
  logic: { src: string; alt: string; lazy?: boolean };
  geo: { width: string; height: string; variant: string };
}> = ({ logic, styles }) => {
  return <img src={logic.src} alt={logic.alt} style={styles} />;
};

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    variant = "single",
    size = "md",
    className = "",
    onClick,
    jsonAdd,
    ...rest
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant.includes("group-collapse")) {
      setIsExpanded(!isExpanded);
    }
    onClick?.(e);
  };

  // Render single avatar
  if (variant === "single") {
    const singleProps = rest as SingleAvatarProps;
    const {
      src,
      alt = "Avatar",
      isOnline = false,
      fallbackText = "?",
    } = singleProps;

    const sizeClass = sizeClasses[size].avatar;
    const statusSize = sizeClasses[size].status;

    return (
      <div
        onClick={handleClick}
        className={`relative ${sizeClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      >
        {src ? (
          <div className="rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <Image 
              styles={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
              logic={{ src: src, alt: alt, lazy: true }}
              geo={{ width: "100", height: "100", variant: "normal" }}
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold border-2 border-gray-200 dark:border-gray-600 shadow-sm ${sizeClass}`}
          >
            {fallbackText ? (
              fallbackText
            ) : (
              <FaCircleUser className="w-full h-full p-1" />
            )}
          </div>
        )}

        {isOnline && (
          <span className={`absolute bottom-0 right-0 ${statusSize} bg-green-500 border-2 border-white dark:border-gray-800 rounded-full`} />
        )}
      </div>
    );
  }

  // Render group avatars
  const groupProps = props as GroupAvatarProps;
  const {
    users = [],
    maxDisplay = 3,
    collapseThreshold = 4,
    isOnline = false,
  } = groupProps;

  const shouldCollapse = users.length > collapseThreshold;
  const displayUsers = isExpanded ? users : users.slice(0, maxDisplay);
  const hiddenCount = users.length - displayUsers.length;
  const groupSizeClass = sizeClasses[size].group;
  const statusSize = sizeClasses[size].status;
  const borderClass = sizeClasses[size].border;

  return (
    <div className={`flex items-center ${className}`}>
      <div 
        onClick={handleClick}
        className={`flex items-center ${onClick ? 'cursor-pointer' : ''} relative`}
      >
        {/* Stacked avatars */}
        <div className="flex items-center">
          {displayUsers.map((user, index) => (
            <div
              key={index}
              className={`relative ${groupSizeClass} ${index > 0 ? '-ml-3' : ''}`}
              style={{ zIndex: displayUsers.length - index }}
            >
              {user.src ? (
                <div className={`rounded-full ${borderClass} border-white dark:border-gray-800 shadow-sm overflow-hidden`}>
                  <Image
                    styles={{
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    logic={{ src: user.src, alt: user.alt || "User", lazy: true }}
                    geo={{ width: "100", height: "100" }}
                  />
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold ${borderClass} border-white dark:border-gray-800 shadow-sm ${groupSizeClass}`}
                >
                  {user.fallbackText || "?"}
                </div>
              )}
              
              {user.isOnline && (
                <span className={`absolute bottom-0 right-0 ${statusSize} bg-green-500 border-2 border-white dark:border-gray-800 rounded-full`} />
              )}
            </div>
          ))}
        </div>

        {/* Hidden count badge */}
        {hiddenCount > 0 && !isExpanded && (
          <div
            className={`flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 font-semibold ${borderClass} border-white dark:border-gray-800 shadow-sm ${groupSizeClass} -ml-3 z-10`}
          >
            +{hiddenCount}
          </div>
        )}

        {/* Expand/Collapse indicator */}
        {(variant === "group-collapse-live" || variant === "group-collapse") && (
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-700 rounded-full p-1 shadow-sm">
            {isExpanded ? (
              <FaCompress className="w-2 h-2 text-gray-600 dark:text-gray-400" />
            ) : (
              <FaExpand className="w-2 h-2 text-gray-600 dark:text-gray-400" />
            )}
          </div>
        )}

        {/* Group status indicator */}
        {isOnline && variant === "group-collapse-live" && (
          <span className={`absolute -top-1 -right-1 ${statusSize} bg-green-500 border-2 border-white dark:border-gray-800 rounded-full`} />
        )}
      </div>

      {/* Live status indicator for group */}
      {variant === "group-collapse-live" && isOnline && (
        <div className="ml-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Live</span>
        </div>
      )}
    </div>
  );
};

/**************************************
 * Step 05: Export component
 **************************************/
export default Avatar;