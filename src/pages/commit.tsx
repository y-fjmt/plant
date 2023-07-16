import NotifyList from "../components/NotifyList";
import Sidebar from "../components/Sidebar";
import React, { useState, ChangeEvent } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import { useRouter } from "next/router";
import axios from "axios";

const MyComponent = () => {

    const { data: session } = useSession();

  const [markdownText, setMarkdownText] = useState("");
  const [titileText, setTitleText] = useState("");

  const router = useRouter();

  const updateContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(event.target.value);
  };

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target.value);
  };

  const handleEditClick = () => {
    // Editボタンがクリックされた時の処理
    console.log("Edit button clicked");
  };

  
  return (
    <div>
      <Sidebar>
      <div>
      <section className="container px-4 mx-auto">
        <div className="-mx-5 font-bold text-xl text-gray-600">
          記事に追記({router.query.name} - { router.query.pos })
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            
          <label
              htmlFor="input-label"
              className="block text-sm font-bold mb-1 ml-2 text-gray-600"
            >
              タイトル
            </label>
            <div className="flex">
              <div>
                <input
                  type="title"
                  id="input-label"
                  className="py-3 px-4 block w-full sm:w-96 border border-gray-300 border-opacity-50 rounded-md text-sm focus:border-gray-500 focus:ring-gray-500"
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
                className="m-1 mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-full"
                onClick={() => {
                  console.log("下書き保存.");
                }}
              >
                下書き保存
              </button>
              <button
                className="m-1 mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-full"
                // {
                //     "userId":"aaa",
                //     "articleId":"c956b418-5b92-4c15-8d27-627935d28816",
                //     "articlePos":"1.1",
                //     "ownUserId":"bbb",
                //     "content":"aaaaaaaaa",
                //     "isPublic":true,
                //     "userName": "Yudai Fujiomoto",
                //     "userIcon": "aaa"
                // }
                onClick={() => {
                  axios.post("/commit", {
                        articleId: router.query.id,
                        content: markdownText,
                        ownUserId: router.query.owner,
                        isPublic: true,
                        tags: titileText,
                        articlePos: router.query.pos,
                        userName: session?.user?.name,
                        userIcon: session?.user?.image,
                        userId: session?.user?.email
                      }).then((res) => {
                      console.log(res.data);
                    });
                  router.push("/");
                  alert("記事を投稿しました。");
                console.log({
                    articleId: router.query.id,
                    content: markdownText,
                    ownUserId: router.query.owner,
                    isPublic: true,
                    tags: titileText,
                    articlePos: router.query.pos,
                    userName: session?.user?.name,
                    userIcon: session?.user?.image,
                    userId: session?.user?.email
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
      </Sidebar>
    </div>
  );
};

export default MyComponent;
