import React from "react";

const ErrorScreen = ({
  errorTitle,
  errorMessage,
}: {
  errorTitle: string;
  errorMessage: string;
}) => {
  return (
    <div className="h-[calc(100vh-86.65px)] h-[calc(100vh-107.89px)]">
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-[512px] max-w-full text-center">
          <div className="heart mb-[60px]"></div>
          <h1 className="font-jost font-bold text-32 leading-52 mb-[11.1px]">
            {errorTitle}
          </h1>
          <p className="text-14 font-mono font-light leading-30">
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
