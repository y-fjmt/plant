import * as React from "react";
import { signIn } from "next-auth/react";

const Signin = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 text-gray-800"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          ログイン
        </h1>
        <button
          onClick={() => signIn("github")}
          className="flex items-center justify-center bg-slate-800 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-md w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-6 h-6 text-white mr-4"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.582 0 8c0 3.537 2.29 6.533 5.47 7.59.4.074.547-.174.547-.387 0-.19-.007-.693-.01-1.36-2.223.483-2.693-1.07-2.693-1.07-.364-.924-.888-1.17-.888-1.17-.727-.498.055-.487.055-.487.803.057 1.225.826 1.225.826.714 1.224 1.87.87 2.324.665.072-.518.28-.87.508-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.87.31-1.586.826-2.146-.083-.2-.36-1.015.078-2.118 0 0 .67-.216 2.2.82.638-.178 1.318-.266 2-.27.68.004 1.36.092 2 .27 1.524-1.036 2.194-.82 2.194-.82.44 1.103.165 1.918.08 2.118.517.56.825 1.277.825 2.146 0 3.073-1.87 3.75-3.65 3.946.287.245.54.73.54 1.476 0 1.063-.01 1.922-.01 2.184 0 .21.142.46.55.38C13.71 14.53 16 11.535 16 8c0-4.418-3.582-8-8-8z"
              clipRule="evenodd"
            />
          </svg>
          <span>GitHubでログイン</span>
        </button>
      </div>
    </div>
  );
};

export default Signin;

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  fill="currentColor"
  className="w-12 h-12 text-gray-600"
>
  <path
    fillRule="evenodd"
    d="M8 0C3.58 0 0 3.582 0 8c0 3.537 2.29 6.533 5.47 7.59.4.074.547-.174.547-.387 0-.19-.007-.693-.01-1.36-2.223.483-2.693-1.07-2.693-1.07-.364-.924-.888-1.17-.888-1.17-.727-.498.055-.487.055-.487.803.057 1.225.826 1.225.826.714 1.224 1.87.87 2.324.665.072-.518.28-.87.508-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.87.31-1.586.826-2.146-.083-.2-.36-1.015.078-2.118 0 0 .67-.216 2.2.82.638-.178 1.318-.266 2-.27.68.004 1.36.092 2 .27 1.524-1.036 2.194-.82 2.194-.82.44 1.103.165 1.918.08 2.118.517.56.825 1.277.825 2.146 0 3.073-1.87 3.75-3.65 3.946.287.245.54.73.54 1.476 0 1.063-.01 1.922-.01 2.184 0 .21.142.46.55.38C13.71 14.53 16 11.535 16 8c0-4.418-3.582-8-8-8z"
    clipRule="evenodd"
  />
</svg>; */
}
