import React from 'react';

function SendMessage() {
  return (
    <div>
        <div className="h-16 flex justify-center items-center bg-[#092b3d] bottom-0 w-full">
            <form className="w-full flex justify-center items-center">
                <div className="input-wrapper w-2/3 relative">
                    <input className="w-full py-2 pl-5 pr-12 bg-[#0b3b55] rounded-md focus:outline-none" value="" />
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="send-image absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"></path>
                    </svg>
                </div>
            </form>
        </div>
    </div>
  );
}

export default SendMessage;
