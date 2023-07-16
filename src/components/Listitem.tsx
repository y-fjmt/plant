import * as React from "react";
import { useRouter } from 'next/router'

type Props = {
  img: string
  title: string
  auther: string
  articleId: string
  likes: number
};

const Listitem: React.FC<Props> = (props) => {

  const router = useRouter();
  
  return (
    <div>
      <ul className="max-w-md divide-y divide-gray-200 mx-10 mt-10">
        <li className="pb-3 sm:pb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src={props.img}
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-900 truncate ">
                {props.title}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {props.auther}
              </p>
            </div>
          </div>
          <div className="space-x-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-full">
              &nbsp; likes{props.likes} &nbsp;
            </button>
            <button onClick={() => {router.push(`/article?id=${props.articleId}`);}}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-full">
              &nbsp; 読む &nbsp;
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Listitem;
