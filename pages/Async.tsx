import Head from "next/head";
import Layout from '../components/layout';
import { useAppDispatch, useAppSelector } from "../components/redux/hook/hook";
import { useEffect } from "react";
import { fetchFirstData, selectAsync } from "../components/redux/slice/asyncSlice";
import uuid from "react-uuid";

function Async() {
    // The `state` arg is correctly typed as `RootState` already
    const dispatch = useAppDispatch()
    const asyncData = useAppSelector(selectAsync)

    useEffect(() => {
        console.clear();
        dispatch(fetchFirstData())
    }, [])

    useEffect(() => {
        console.log("render ")
        console.log(asyncData)
    })

    return (
        <Layout>
            <Head>
                <title>Async 範例一</title>
            </Head>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl mt-3">新版Redux用法</h1>
                <h2 className="text-2xl mt-3">範例一 (非同步資料) 使用extraReducers</h2>
                <p>第一次渲染的時候直接啟動(透過useEffect)</p>
                {asyncData.isComplete && (
                    <div className="border border-title p-5 m-3">
                        {asyncData.AsyncStateList.map((item, index) => {
                            return (
                                <div key={uuid()}>
                                    <div>id: {item.id}</div>
                                    <div>username: {item.username}</div>
                                    <div>email: {item.email}</div>
                                    <div>{`address: ${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`}</div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Async
