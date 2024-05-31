import React, { ReactNode } from 'react';
import { Header } from './header';

interface Props {
  children?: ReactNode;
}

export const Page: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {children}
    </div>
  );
};
