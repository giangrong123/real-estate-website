type Props = {
  active?: boolean;
};

export default function HeartIcon({ active }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={active ? "#ee4d2d" : "none"}
      stroke="#ee4d2d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`heart ${active ? "active" : ""}`}
    >
      <path d="M20.8 4.6c-1.5-1.5-3.9-1.5-5.4 0L12 8l-3.4-3.4c-1.5-1.5-3.9-1.5-5.4 0-1.5 1.5-1.5 3.9 0 5.4L12 21l8.8-11c1.5-1.5 1.5-3.9 0-5.4z" />
    </svg>
  );
}