import Banana from "./banana.gif";

export default function Title() {
  return (
    <div className="m-[20px] bg-[#ffFfFF50] text-white text-center">
        <div className="flex justify-center">
            <img className="w-[50px]" src={Banana} alt="" />
            <p className="text-4xl font-bold underline">space facts!</p>
            <img className="w-[50px]" src={Banana} alt="" />
        </div>
        <p className="text-2xl">quite cool space facts that will make you say "wow" and nod your head.</p>
    </div>
  )
}