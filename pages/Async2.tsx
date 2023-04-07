import Head from "next/head";
import Layout from '../components/layout';
import { useAppDispatch, useAppSelector } from "../components/redux/hook/hook";
import { useEffect } from "react";
import { fetchFirstData, selectAsync2, timeoutChange } from "../components/redux/slice/asyncSlice2";
import uuid from "react-uuid";

function Async2() {
    // The `state` arg is correctly typed as `RootState` already
    const dispatch = useAppDispatch()
    const asyncData = useAppSelector(selectAsync2)

    useEffect(() => {
        console.clear();
        dispatch(fetchFirstData())
    }, [])

    useEffect(() => {
        console.log("render")
        console.log(asyncData)
    })

    return (
        <Layout>
            <Head>
                <title>新版Redux</title>
            </Head>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl mt-3">新版Redux用法</h1>
                <h2 className="text-2xl mt-3">範例二 (非同步資料) 使用buttone fetch後更改內容</h2>
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

                <p>點選button後三秒後改變第一個username</p>
                <div className="flex flex-col">
                    <p>使用extraReducers與createAsyncThunk</p>
                    <button className="border p-2 rounded border-title hover:bg-title hover:text-black" onClick={() => dispatch(timeoutChange("Hello World"))}>改變username</button>
                </div>

            </div>
        </Layout>
    )
}

export default Async2
