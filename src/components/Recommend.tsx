import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";

import Listitem from "./Listitem";

import axios from "axios";
import { data } from 'autoprefixer';


type EditProps = {
};

type Data = {
  // データのプロパティに応じて適切な型を指定してください
  modified: string;
	articleId: string;
	tags: string;
	userName: string;
	userIcon: string;
  likes: number
};

const Recommend: React.FC<EditProps> = () => {

  const { data: session } = useSession();

  const [data1, setData1] = useState<Data[]>([]);
  const [data2, setData2] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('/article/search', {
          params: {
            userId: session?.user?.email
          }
        });
        const response2 = await axios.get('/article/search');

        setData1(response1.data);
        setData2(response2.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!data1 || !data2) {
    // データの取得中の表示などを行う場合
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        あなたの記事
      </div>
      {
        data1.map(content => {
          return(
            <div>
              <Listitem
                img={content.userIcon}
                title={content.tags}
                auther={content.userName}
                articleId={content.articleId}
                likes={content.likes}
               />
            </div>
          );
        })
      }
      <div>
        最新の記事
      </div>
      {
        data1.map(content => {
          return(
            <div>
              <Listitem
                img={content.userIcon}
                title={content.tags}
                auther={content.userName}
                articleId={content.articleId}
                likes={content.likes}
               />
            </div>
          );
        })
      }
    </div>
  );
};

export default Recommend;
