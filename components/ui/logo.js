import Roboto_Mono from "@/lib/fonts/roboto-mono";

export default function Logo(props) {
  const { className } = props;
  return (
    <div
      className={`logo font-medium select-none hover:cursor-default ${Roboto_Mono.className} ${className}`}
    >
      lazuardy;
    </div>
  );
}
