function Button({ children, customCSS }) {
  return (
    <button
      className={` justify-center w-3/4 p-4 text-3xl border-4 cursor-pointer min-w-40 max-w-80 ${customCSS}`}
    >
      {children}
    </button>
  );
}

export default Button;
