import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="md:mx-40 mx-2 text-center py-10">
      <div className="text-red-500 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-error-404"
          width="240"
          height="240"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {' '}
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
          <path d="M3 7v4a1 1 0 0 0 1 1h3" /> <path d="M7 7v10" />{' '}
          <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z" />{' '}
          <path d="M17 7v4a1 1 0 0 0 1 1h3" /> <path d="M21 7v10" />{' '}
        </svg>
      </div>
      <div className="mb-10 md:mb-20 text-gray-600 font-light">
        <h1 className="font-black uppercase text-3xl lg:text-5xl text-red-500 mb-10">
          You seem to be lost!
        </h1>
        <p>The page you're looking for isn't available.</p>
        <p>Try searching again or use the Go Back button below.</p>
      </div>
      <div className="mb-20 md:mb-0 flex justify-center">
        <button
          className="text-lg flex font-light outline-none focus:outline-none items-center transform transition-all hover:scale-110 text-red-500"
          onClick={() => navigate(`/`)}
        >
          <BsArrowLeft className="mr-1" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
