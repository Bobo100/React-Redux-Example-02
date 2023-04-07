import Head from "next/head";
import Layout from '../components/layout';
import { useAppDispatch, useAppSelector } from "../components/redux/hook/hook";
import { useEffect } from "react";
import { fetchUsers, selectAsync3 } from "../components/redux/slice/asyncSlice3";
import uuid from "react-uuid";

function Async3() {
    // The `state` arg is correctly typed as `RootState` already
    const dispatch = useAppDispatch()
    const asyncData = useAppSelector(selectAsync3)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(fetchUsers());
                console.log("data：", data)
            } catch (err) {
                console.log("err：", err)
            }
        };
        console.clear();
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

                <h2 className="text-2xl mt-3">範例三 (非同步資料) 沒有使用extraReducers和createAsyncThunk</h2>
                <p>會把資料fetch到store中，再從store中取出來</p>
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

export default Async3
