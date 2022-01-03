import { ReactNode } from 'react';
import { theme } from 'theme/Theme';
import { StyledNav } from './NavLink.styles';

export const NavLink = ({
  href,
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  return (
    <StyledNav
      to={href}
      activeStyle={{ color: theme.palette.text.primary }}
      className={className}
    >
      {children}
    </StyledNav>
  );
};
