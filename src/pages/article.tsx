import NotifyList from "../components/NotifyList";
import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import "github-markdown-css";

import axios from "axios";
import { data } from "autoprefixer";

type Data = {
	// データのプロパティに応じて適切な型を指定してください
	modified: string;
	articleId: string;
	tags: string;
	userName: string;
	userIcon: string;
	likes: number;
	content: string;
	ownUserId: string;
};

type ContentList = {
	pos: number
	content: string
};

const MyComponent = () => {

	const router = useRouter();
	const { post_id } = router.query;
	const contents = [];
	console.log(router.query['id']);

	const [data1, setData1] = useState<Data>();
	const [data2, setData2] = useState<ContentList[]>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response1 = await axios.get('/article', {
					params: {
						articleId: router.query['id']
					}
				});

				setData1(response1.data);

			} catch (error) {
				console.error(error);
			}

		};

		fetchData();
	}, []);

	useEffect(() => {
		if (data1) {
			console.log(data1?.content);

		var contentList: ContentList[]= [];
		var pos = 0;

		var current = '';
		data1?.content.split('\n\n').forEach(elem => {
			// # 
			if(elem[0] == '#' && elem[1] == ' '){
				if(current != ''){
					contentList.push({pos: (Math.floor(pos * 10)) / 10, content: current})
					current = ''
				}
				current = elem;
				pos += 1
				pos = Math.floor(pos);
			}

			// ##
			else if(elem[0] == '#' && elem[1] == '#' && elem[2] == ' '){
				if(current != ''){
					contentList.push({pos: (Math.floor(pos * 10)) / 10, content: current})
					current = ''
				}
				pos += 0.1
				current = elem;
			}

			// その他
			else{
				current += '\n\n'+elem
			}
		});
		contentList.push({pos: (Math.floor(pos * 10)) / 10, content: current});

		setData2(contentList);
		}
	}, [data1]);

	const handleEditClick = () => {
		console.log("Edit button clicked");
	};
	if (!data1 || !data2) {
		return (<div>
			<Sidebar>
				<div>Loading...</div>
			</Sidebar>
		</div>);
	} else {
		return (
			
			<div>
				<Sidebar>
					<div className="flex  mt-6">
						<img
							className="object-cover rounded-full h-7 w-7"
							src={data1.userIcon}
							alt="avatar"
						/>
						<p className="">
							{data1.userName}
						</p>
						<p>
							{data1.modified}
						</p>
					</div>
					<table>
						{
							data2.map(elem => {
								return (
									<tr>
										<td><Link href={`/commit?id=${router.query['id']}&pos=${elem.pos}&name=${data1.tags}&owner=${data1.ownUserId}`}>+</Link></td>
										<td>{ elem.pos }</td>
										<td><div className="markdown-body m-5 ">
						<ReactMarkdown className="p-4">{elem.content}</ReactMarkdown>
					</div></td>
									</tr>
								);
							})
						}
					</table>
					
					<div>


					</div>
				</Sidebar>
			</div>
		);
	}


};

export default MyComponent;
