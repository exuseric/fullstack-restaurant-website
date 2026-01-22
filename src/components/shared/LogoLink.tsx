import Link from "next/link";
import LogoSvg from "./LogoSvg";

export default function LogoLink() {
  return (
    <Link
      href="/"
      className="flex w-fit items-center justify-start gap-x-2 no-underline"
    >
      <span className="icon">
        <LogoSvg />
      </span>
      <span className="text-primary text-xl font-bold">Restaurant</span>
    </Link>
  );
}
