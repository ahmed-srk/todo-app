import React from "react";

export default function CustomModal(props){
    return (
        <div>
            <div className=" flex justify-center items-center min-h-full max-w-fit m-auto overflow-y-auto overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto flex items-center">
                    <div className=" relative flex flex-col w-full p-4 space-y-6 bg-white rounded shadow-lg outline-none focus:outline-none">
                        <Header title={`Create new ${props.title}`} setShowModal={props.setShowModal} />
                        <div className="relative flex-auto">{props.body}</div>
                        <Footer title={`Create A ${props.title}`} setShowModal={props.setShowModal} createContent={props.createContent} />
                    </div>
                </div>
            </div>
            <div onClick={() => props.setShowModal(false)} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>      
    );
}

function Header(props){
    return(
        <div className=" flex items-start justify-between border-solid border-slate-200 rounded-t">
            <h3 className=" text-xl font-light">{props.title}</h3>
            <button className=" p-0 ml-auto bg-transparent text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}>
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                </span>
            </button>
        </div>
    )
}

function Footer(props){
    return(
        <div className="flex items-center justify-end border-solid border-slate-200 rounded-b">
            <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => props.setShowModal(false)}>
                Close
            </button>
            <button className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-8 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={props.createContent} type="submit">
                {props.title}
            </button>
        </div>
    )
}