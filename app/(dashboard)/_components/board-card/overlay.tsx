export const Overlay = () => {
    return (
      <div
        className="
          absolute
          inset-0
          bg-black
          opacity-0
          group-hover:opacity-40
          transition-opacity
          z-10
          w-full
          h-full
          pointer-events-none
        "
      />
    );
  };
  