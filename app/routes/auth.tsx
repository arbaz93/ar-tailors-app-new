import React from "react";
import { useState, useEffect } from "react";
import handleLogin from "~/auth/auth";
import { useLoginStore } from "~/zustand/store";
import Cookies from "js-cookie";
import { base64Decode } from "~/utils/scripting";

type FormInputs = {
    username: string,
    password: string
}
type FormProps = {
    method: string;
    className: string;
    children: React.ReactNode;
    loginInputs: FormInputs;
};

function Form({ method, className, children, loginInputs }: FormProps) {
    const setLoginInfo = useLoginStore(state => state.setLoginInfo)
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const request = await handleLogin(loginInputs, setLoginInfo);
        const response = await console.log(request)
    };

    return (
        <form method={method} className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    );
}


export default function LoginPage() {
    const [formInputs, setFormInputs] = useState({
        username: "",
        password: "",
    });
    const loginInfo = useLoginStore(state => state.loginInfo)

    // when Cookie exist and is allowed then go to homepage
    useEffect(() => {
        const CookieLogStatus = Cookies.get("t000") ? JSON.parse(base64Decode(Cookies.get("t000"))).status : false;
        if(CookieLogStatus == '200') {
            window.location.href = '/'
        }
    }, [])
    // when login status changes it will check if true go to home page
    useEffect(() => {
        if(loginInfo.status === '200') {
            window.location.href = '/'
        }
    }, [loginInfo.status])



    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">{loginInfo.statusMessage != "" ? loginInfo.statusMessage : "Login"}</h1>
                <Form method="post" className="flex flex-col gap-4" loginInputs={formInputs}>
                    <div className="text-left">
                        <label htmlFor="username" className="block mb-2 text-sm text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formInputs.username}
                            onChange={(e) =>
                                setFormInputs({ ...formInputs, username: e.target.value })
                            }
                            required
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-left">
                        <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formInputs.password}
                            onChange={(e) => {
                                setFormInputs({ ...formInputs, password: e.target.value })
                            }}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        disabled={loginInfo.status != "102" ? false : true}
                        type="submit"
                        className={"w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer " + (loginInfo.status === "102" ? ' opacity-85 ' : '')}
                    >
                        {loginInfo.status === "102" ? "Processing" : "Login"}
                    </button>
                </Form>
                <p className="mt-4 text-sm text-gray-500">
                    If you wish to join, please contact the administrator for access.
                </p>
            </div>
        </div>
    );
}
