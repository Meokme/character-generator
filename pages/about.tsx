import { NextPage } from 'next';
import { Page } from '@ui';

const HomePage: NextPage = () => {
  return (
    <Page>
      <div className="p-4">
        <p className="text-lg">Some about stuff</p>
      </div>
    </Page>
  );
};

export default HomePage;
