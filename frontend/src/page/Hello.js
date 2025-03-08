import {useEffect, useState} from "react";
import api from "../api";


function Hello() {

    const [data, setData] = useState("");

    useEffect(() => {
        api.get("/hello")
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });

    })

    return (
        <div>
            <h1>hello</h1>
            <p>spring에서 json으로 받은 data : "{data}"</p>
        </div>
    );
}

export default Hello;