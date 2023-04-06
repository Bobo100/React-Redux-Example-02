import Head from "next/head";
import Layout from '../components/layout';
import { useAppDispatch, useAppSelector } from "../components/redux/hook/hook";
import { useEffect, useState } from "react";
import { fetchFirstData } from "../components/redux/slice/asyncSlice";

function HomePage() {

    // The `state` arg is correctly typed as `RootState` already
    const dispatch = useAppDispatch()

    // 第三個slice
    const asyncData = useAppSelector((state) => state.async)

    useEffect(() => {
        dispatch(fetchFirstData());
    }, [])

    console.log(asyncData)

    return (
        <Layout>
            <Head>
                <title>新版Redux</title>
            </Head>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl mt-3">新版Redux用法</h1>
                <h2 className="text-2xl mt-3">範例一 (非同步資料)</h2> 
                <div className="border border-title p-5 m-3">
                    <div>asyncData userId: {asyncData.userId}</div>
                    <div>asyncData id: {asyncData.id}</div>
                    <div>asyncData title: {asyncData.title}</div>
                    <div>asyncData completed: {`${asyncData.completed}`}</div>
                    <div>asyncData isLoading: {`${asyncData.isLoading}`}</div>
                </div>

                <a href="https://react-redux-neon.vercel.app/useReduxOfficial" rel="noopener" target="_blank" className="border p-2 rounded border-title hover:bg-title hover:text-black mt-5">回去學習~</a>
            </div>
        </Layout>
    )
}

export default HomePage