import Head from "next/head";
import Layout from "../components/layout"
import { useAppDispatch, useAppSelector } from "../components/redux/hook/hook";
import { selectUsers } from "../components/redux/slice/userSlice";
import { useState } from "react";

const User = () => {

    const [name, setName] = useState("")
    const [age, setAge] = useState("")

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setAge(e.target.value)
    }

    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUsers)

    const addUser = () => {
        dispatch({
            type: "users/addUser",
            payload: {
                user: {
                    name: name,
                    age: parseInt(age)
                }
            }
        })
    }

    console.log(userData)

    return (
        <Layout>
            <Head>
                <title>範例四</title>
            </Head>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl mt-3">新版Redux用法</h1>
                <h2 className="text-2xl mt-3">範例四</h2>
                <p>使用addMatcher</p>
                <div className="border border-title p-5 m-3">
                    {userData.users.map((item, index) => {
                        return (
                            <div key={index}>
                                <div>id: {item.name}</div>
                                <div>name: {item.age}</div>
                            </div>
                        )
                    })}
                </div>
                <p>用戶名稱</p>
                <input className="p-2 m-2" type="text" id="name" onChange={handleName} placeholder="name" />
                <p>年齡</p>
                <input className="p-2 m-2" type="number" id="age" onChange={handleAge} placeholder="age" />

                <p>由於我們有設定addMachter 所以有額外的規則</p>
                <p>{` action => action.type === 'users/addUser' && action.payload.user.age > 18, // 條件：新增用戶的年齡大於18歲 `}</p>
                <button className="p-2 m-2" onClick={addUser}>新增</button>
            </div>
        </Layout>
    )
}

export default User