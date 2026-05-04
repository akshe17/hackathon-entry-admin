import KainWiseLogo from "../../public/images/KainWiseLogo.svg";
export function BrandName({ size = "1em", color }) {
  return (
    <div className="flex flex-center  items-center justify-center flex-row">
      <img src={KainWiseLogo} height={50} width={50} alt="KainWise Logo" />
      <span style={{ color }}>
        Kain
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontWeight: 400,
            fontSize: `calc(${size} * 1.4)`,
            marginLeft: "-0.15em",
            verticalAlign: "middle",
          }}
        >
          Wise
        </span>
      </span>
    </div>
  );
}
