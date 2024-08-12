import Roboto_Mono from "@/lib/fonts/roboto-mono";

export default function Logo(props) {
  const { className } = props;
  return (
    <div className={`font-semibold ${Roboto_Mono.className} ${className}`}>
      <span>lazuardy;</span>
    </div>
  );
}
