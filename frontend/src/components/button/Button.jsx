function Button({ title, toggle, children, onClick, className }) {
  return (
    <>
      <button className={className} onClick={() => onClick({ toggle })}>
        {children}
        {title}
      </button>
    </>
  );
}

export default Button;
