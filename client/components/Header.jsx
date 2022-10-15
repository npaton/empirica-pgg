import React from "react";
import { Piggy } from "./assets/Assets";
import { Label } from "./Label";

export const Header = ({
  left,
  showPiggyBank = false,
  piggyBankAmount = 0,
  timerMinutes = "--",
  timerSeconds = "--",
  right,
  rightOnClick,
}) => {
  return (
    <header className="w-full grid grid-cols-3 items-baseline bg-white py-4 px-12">
      <div className="flex items-center space-x-8">
        <Label size="lg" color="pink">
          {left}
        </Label>
        {showPiggyBank && (
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 -mt-2">
              <Piggy />
            </div>
            <Label size="lg" color="yellow">
              {piggyBankAmount}
            </Label>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Label size="2xl" color="sky">
          <Clock timerMinutes={timerMinutes} timerSeconds={timerSeconds} />
        </Label>
      </div>
      <div className="flex items-center justify-end">
        <button className="py-1 px-4" onClick={rightOnClick}>
          <Label size="md" color="gray">
            {right}
          </Label>
        </button>
      </div>
    </header>
  );
};

const Digit = ({ digit, tight = false }) => (
  <div className={`flex justify-center ${tight ? "w-[20px]" : "w-[34px]"}`}>
    {digit}
  </div>
);

function Clock({ timerMinutes, timerSeconds }) {
  let ts = timerSeconds;
  if (timerSeconds.length == 1) {
    ts = "0" + timerSeconds;
  }

  return (
    <div className="flex">
      {timerMinutes.split("").map((num) => (
        <Digit digit={num} />
      ))}
      <Digit tight digit=":" />
      {ts.split("").map((num) => (
        <Digit digit={num} />
      ))}
    </div>
  );
}
