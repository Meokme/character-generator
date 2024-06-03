import '@styles/global.css';
import React, { ReactNode } from 'react';
import { Header } from '@ui';

interface Props {
  children?: ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
