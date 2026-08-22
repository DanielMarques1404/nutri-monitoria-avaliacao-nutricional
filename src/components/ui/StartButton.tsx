export const StartButton = () => {
  return (
    <button
      aria-label="Iniciar questionário"
      className="-mr-1 shrink-0 cursor-pointer"
      type="button"
    >
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-lighter-green shadow-[inset_0px_0px_1px_1px_rgba(2,66,33,0.35),2px_3px_5px_rgba(2,66,33,0.12)]">
        <div className="absolute left-1/2 top-1 h-7 w-7 -translate-x-1/2 rounded-full bg-dark-green/50 blur-[1px]" />
        <div className="group absolute left-1/2 top-1 z-20 flex h-7 w-7 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-linear-to-b from-light-green to-medium-green shadow-[inset_0px_2px_2px_rgba(192,222,175,0.75),inset_0px_-2px_0px_#024221,0px_0px_2px_rgba(2,66,33,0.8)] active:shadow-[inset_0px_2px_2px_rgba(192,222,175,0.45),inset_0px_-2px_2px_rgba(2,66,33,0.45),0px_0px_2px_rgba(2,66,33,0.8)]">
          <div className="w-3.5 fill-white drop-shadow-[0px_1px_1px_rgba(2,66,33,0.55)] group-active:w-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Filled"
              viewBox="0 0 24 24"
            >
              <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
};
