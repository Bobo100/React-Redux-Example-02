import Head from "next/head";
import Layout from '../components/layout';
import { useAppDispatch, useAppSelector } from "../components/redux/hook/hook";
import { useEffect, useState } from "react";
import { fetchFirstData, fetchUsers, selectAsync, setDataTitle, timeoutChange } from "../components/redux/slice/asyncSlice";
import uuid from "react-uuid";

function HomePage() {

    // The `state` arg is correctly typed as `RootState` already
    const dispatch = useAppDispatch()

    // 第三個slice
    const asyncData = useAppSelector(selectAsync)

    useEffect(() => {
        dispatch(fetchFirstData())
    }, [])

    const [user, setUser] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(fetchUsers());
                setUser(data)
            } catch (err) {
                console.log("err：", err)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log("render ")
        console.log(asyncData)
    })

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

                <button className="border p-2 rounded border-title hover:bg-title hover:text-black mt-5" onClick={() => dispatch(timeoutChange("Hello World"))}>改變title</button>

                <a href="https://react-redux-neon.vercel.app/useReduxOfficial" rel="noopener" target="_blank" className="border p-2 rounded border-title hover:bg-title hover:text-black mt-5">回去學習~</a>

                {user && (<>
                    <h2 className="text-2xl mt-3">範例二 (同步資料)</h2>
                    <div className="border border-title p-5 m-3">
                        {user.map((item, index) => {
                            return (
                                <div key={uuid()}>
                                    <div>id: {item.id}</div>
                                    <div>name: {item.name}</div>
                                    <div>username: {item.username}</div>
                                    <div>email: {item.email}</div>
                                    <div>phone: {item.phone}</div>
                                </div>
                            )
                        })}
                    </div>
                </>)}
            </div>
        </Layout>
    )
}

export default HomePage
