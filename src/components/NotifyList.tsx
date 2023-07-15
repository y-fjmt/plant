import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { useRecoilState } from "recoil";
import { LoginState } from "../components/atoms";

import axios from "axios";

var hasGet = false;

function kindBadge(kind: string) {

	if (kind === 'like'){
		return (
			<div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-purple-100/60`}>
				<h2 className={`text-sm font-normal text-pink-500`}>{ kind }</h2>
			</div>
		);
	}
	if (kind === 'pull request'){
		return (
			<div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-pink-100/60`}>
				<h2 className={`text-sm font-normal text-purple-500`}>{ kind }</h2>
			</div>
		);
	}
	if (kind === 'commit'){
		return (
			<div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60`}>
				<h2 className={`text-sm font-normal text-yellow-500`}>{ kind }</h2>
			</div>
		);
	}
}

type Content = {
  // データのプロパティに応じて適切な型を指定してください
  articleId: string;
  fromUserId: string;
	kind: string;
	notiId: string;
	receve: string;
	userId: string;
	userName: string;
	userIcon: string;
};

export default function NotifyList() {
  const [contents, setContents] = useState<Content[]>([]);
  const [userInfo, setUserInfo] = useRecoilState(LoginState);
  const maxNotification = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo.email !== '' && hasGet === false) {
		hasGet = true;
          console.log({
            userId: userInfo.email,
            size: maxNotification
          });

          const response = await axios.get('/notification', {
            params: {
              userId: userInfo.email,
              size: maxNotification
            }
          });

          setContents(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userInfo.email]);


	return (
		<div>
			<section className="container px-4 mx-auto">


				<div className="flex flex-col mt-6">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden border border-gray-200  md:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
												<div className="flex items-center gap-x-3">
													<span>Name</span>
												</div>
											</th>

											<th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
												<button className="flex items-center gap-x-2">
													<span>Kind</span>
												</button>
											</th>

											<th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
												<button className="flex items-center gap-x-2">
													<span>DateTime</span>
												</button>
											</th>

											<th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Detail</th>

											<th scope="col" className="relative py-3.5 px-4">
												<span className="sr-only">Edit</span>
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">

										{
											contents.map(content => {
												return (
													<tr key={content.notiId}>
														<td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
															<div className="inline-flex items-center gap-x-3">
																<div className="flex items-center gap-x-2">
																	<img className="object-cover w-10 h-10 rounded-full" src={content.userIcon} alt="" />
																	<div>
																		<h2 className="font-medium text-gray-800">{ content.userName }</h2>
																		<p className="text-sm font-normal text-gray-600">{ content.fromUserId }</p>
																	</div>
																</div>
															</div>
														</td>
														<td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
															{kindBadge(content.kind)}
														</td>
														<td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{ content.receve }</td>
														<td className="px-4 py-4 text-sm whitespace-nowrap">
															<div className="flex items-center gap-x-2">
																<p className="px-3 py-1 text-xs text-pink-500 rounded-full bg-pink-100/60">Get Detail</p>
															</div>
														</td>
														<td className="px-4 py-4 text-sm whitespace-nowrap">
															<div className="flex items-center gap-x-6">
																<button className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
																	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
																		<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
																	</svg>
																</button>
															</div>
														</td>
													</tr>
												);
											})
         						 }
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}