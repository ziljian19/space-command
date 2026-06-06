import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#040d1a",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rocket body */}
          <path
            d="M12 2C12 2 7 7 7 13H17C17 7 12 2 12 2Z"
            fill="#22d3ee"
            opacity="0.95"
          />
          {/* Rocket window */}
          <circle cx="12" cy="10" r="1.8" fill="#040d1a" />
          <circle cx="12" cy="10" r="1.1" fill="#67e8f9" opacity="0.6" />
          {/* Left fin */}
          <path d="M7 13L5 17L9 15Z" fill="#0e7490" />
          {/* Right fin */}
          <path d="M17 13L19 17L15 15Z" fill="#0e7490" />
          {/* Rocket base */}
          <rect x="9" y="13" width="6" height="2" fill="#0891b2" />
          {/* Flame outer */}
          <path d="M10 15C10 15 9 18 12 19C15 18 14 15 14 15Z" fill="#f97316" opacity="0.9" />
          {/* Flame inner */}
          <path d="M11 15.5C11 15.5 10.5 17.5 12 18C13.5 17.5 13 15.5 13 15.5Z" fill="#fbbf24" opacity="0.9" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
