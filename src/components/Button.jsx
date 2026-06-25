import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  to, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseClasses = "inline-block px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-out focus:outline-none";
  
  const variants = {
    primary: "bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark",
    secondary: "border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white",
    gold: "bg-brand-gold text-brand-dark hover:bg-brand-dark hover:text-white",
    text: "text-brand-dark underline underline-offset-4 hover:text-brand-gold px-0 py-0 tracking-[0.25em]"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
