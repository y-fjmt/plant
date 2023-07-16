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

type colData = {
	// データのプロパティに応じて適切な型を指定してください
	modified: string;
	tags: string;
	userName: string;
	userIcon: string;
};

type Commit = {
	content: string,
	likes: 0,
	articlePos: string,
	userName: string,
	commitId: string,
	articleId: string,
	ownUserId: string,
	userId: string,
	userIcon: string,
	isPublic: boolean,
	modified: string,
	tags: string
};

type ContentList = {
	pos: number
	content: string
	modified: string;
	tags: string;
	userName: string;
	userIcon: string;
	selecter: {
		content: string,
		likes: number,
		userName: string,
		userIcon: string,
		modified: string,
		tags: string
	}[]
};

const MyComponent = () => {

	const router = useRouter();
	const { post_id } = router.query;
	const contents = [];
	console.log(router.query['id']);

	const [data1, setData1] = useState<Data>();
	const [data2, setData2] = useState<ContentList[]>();
	const [commits, setCommits] = useState<Commit[]>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response1 = await axios.get('/article', {
					params: {
						articleId: router.query['id']
					}
				});

				const response2 = await axios.get('/commit', {
					params: {
						articleId: router.query['id']
					}
				});

				setData1(response1.data);
				setCommits(response2.data);

			} catch (error) {
				console.error(error);
			}

		};

		fetchData();
	}, []);

	useEffect(() => {
		if (data1) {
			console.log(data1?.content);

			var contentList: ContentList[] = [];
			var pos = 0;

			var current = '';
			data1?.content.split('\n\n').forEach(elem => {
				// # 
				if (elem[0] == '#' && elem[1] == ' ') {
					if (current != '') {
						contentList.push({
							pos: (Math.floor(pos * 10)) / 10,
							content: current,
							modified: data1.modified,
							tags: data1.tags,
							userName: data1.userName,
							userIcon: data1.userIcon,
							selecter: [{
								content: current,
								likes: 0,
								userName: data1.userName,
								userIcon: data1.userIcon,
								modified: data1.modified,
								tags: '(main)'
							}]
						});
						current = ''
					}
					current = elem;
					pos += 1
					pos = Math.floor(pos);
				}

				// ##
				else if (elem[0] == '#' && elem[1] == '#' && elem[2] == ' ') {
					if (current != '') {
						contentList.push({
							pos: (Math.floor(pos * 10)) / 10, content: current,
							modified: data1.modified,
							tags: data1.tags,
							userName: data1.userName,
							userIcon: data1.userIcon,
							selecter: [{
								content: current,
								likes: 0,
								userName: data1.userName,
								userIcon: data1.userIcon,
								modified: data1.modified,
								tags: '(main)'
							}]
						})
						current = ''
					}
					pos += 0.1
					current = elem;
				}

				// その他
				else {
					current += '\n\n' + elem
				}
			});
			contentList.push({
				pos: (Math.floor(pos * 10)) / 10, content: current,
				modified: data1.modified,
				tags: data1.tags,
				userName: data1.userName,
				userIcon: data1.userIcon,
				selecter: [{
					content: current,
					likes: 0,
					userName: data1.userName,
					userIcon: data1.userIcon,
					modified: data1.modified,
					tags: '(main)'
				}]
			});

			setData2(contentList);
			console.log(commits);

			commits?.forEach(commit => {
				for (let i = 0; i < contentList.length; i++) {
					if (commit.articlePos === contentList[i].pos.toString()) {
						contentList[i].selecter.push({
							content: commit.content,
							likes: commit.likes,
							userName: commit.userName,
							userIcon: commit.userIcon,
							modified: commit.modified,
							tags: commit.tags
						});
					}
				}
			});
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
					<div>
						<h1 className="m-5 text-4xl">{ data1.tags }</h1>
						<div className="ml-10 flex">
							<img
								className="object-cover rounded-full h-10 w-10 mr-4"
								src={data1.userIcon}
								alt="avatar"
							/>
							<div>
								<p className="">
								{data1.userName}
							</p>
							<p>
								{data1.modified}
							</p>
							</div>
							
						</div>
					</div>
					<table>
						{
							data2.map((elem, i) => {
								return (
									<tr key={i}>
										<td><Link href={`/commit?id=${router.query['id']}&pos=${elem.pos}&name=${data1.tags}&owner=${data1.ownUserId}`}>+</Link></td>
										<td><div className="markdown-body m-5 ">
											<ReactMarkdown className="p-4">{elem.content}</ReactMarkdown>
										</div></td>
										<td>
											<select onChange={event => {
												const index: number = parseInt(event.target.value);
												var tmp = data2.concat();
												tmp[i].content = tmp[i].selecter[index].content;
												tmp[i].userIcon = tmp[i].selecter[index].userIcon;
												tmp[i].userName = tmp[i].selecter[index].userName;
												tmp[i].modified = tmp[i].selecter[index].modified;

												setData2(tmp);
											}}>
												{
													elem.selecter.map((op, index) => {
														return (
															<option value={index} key={index}>
																{op.tags}
															</option>
														);
													})
												}
											</select>
											<div className="flex">
												<img className="w-10 h-10 mr-3 rounded-full" src={elem.userIcon} alt="" /><div>
													<div>
														{elem.userName}
													</div>
													<div>
													</div>
													<div>
														{elem.modified}
													</div>
												</div>
											</div>


										</td>
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
