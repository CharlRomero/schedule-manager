export const Button = ({ title, toggle, children, onClick, className }) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {children}
        {title}
      </button>
    </>
  );
};
