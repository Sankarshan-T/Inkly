export const Overlay = () => {
    return (
      <div
        className="
          absolute
          inset-0
          bg-foreground
          opacity-0
          group-hover:opacity-20
          transition-opacity
          z-10
          w-full
          h-full
          pointer-events-none
        "
      />
    );
  };
  