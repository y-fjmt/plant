import React, { useState, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";

import axios from "axios";

type EditProps = {
  onClick: () => void;
};

const Edit: React.FC<EditProps> = ({ onClick }) => {
  const [markdownText, setMarkdownText] = useState("");
  const [titileText, setTitleText] = useState("");

  const updateContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target.value);
  };

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="-mx-5 font-bold text-xl">新しい記事の作成</div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <label
              htmlFor="input-label"
              className="block text-sm font-bold mb-1 ml-2 dark:text-white"
            >
              タイトル
            </label>
            <div className="flex">
              <div>
                <input
                  type="title"
                  id="input-label"
                  className="py-3 px-4 block w-full sm:w-96 border border-gray-300 border-opacity-50 rounded-md text-sm focus:border-gray-500 focus:ring-gray-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder="title"
                  onChange={updateTitle}
                />
              </div>
            </div>
            <hr className="w-full m-4 border border-gray-300" />
            <div className="flex">
              <div className="w-1/2 h-125 border">
                <textarea
                  className="w-full h-full border rounded p-4 resize-none"
                  value={markdownText}
                  onChange={updateContent}
                ></textarea>
              </div>
              <div className="w-1/2 h-125 border">
                <div className="markdown-body m-5 ">
                  <ReactMarkdown className="p-4">{markdownText}</ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="m-1 mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  console.log("下書き保存.");
                }}
              >
                下書き保存
              </button>
              <button
                className="m-1 mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  console.log("publish.");
                  axios
                    .post("article", {
                      content: markdownText,
                    })
                    .then((res) => {
                      console.log(res.data);
                    });
                }}
              >
                投稿
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Edit;
