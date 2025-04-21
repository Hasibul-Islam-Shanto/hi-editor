import React from 'react';
import Header from './_components/header';
import EditorPanel from './_components/EditorPanel';
import OutputPanel from './_components/OutputPanel';

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1800px] px-4 py-2">
        <Header />

        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
