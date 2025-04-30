'use client';

import { useEffect, useState } from 'react';

export const Scripts = () => {
  const [load, setLoad] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {load && (
        <>
          <script
            src='https://www.google.com/recaptcha/api.js?render=6LdLxCkrAAAAAMLe6DCcMo0qEPyxSzke98iEEmxP'
            async
          ></script>
        </>
      )}
    </>
  );
};
