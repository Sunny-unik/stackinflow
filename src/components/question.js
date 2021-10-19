import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Question(props) {

    const [question, setquestion] = useState("")
    const [qusername, setqusername] = useState("")
    const [tag, settag] = useState([])
    const [qdate, setqdate] = useState()
    const [qlikes, setqlikes] = useState([])
    const [answer, setanswer] = useState([])
    const [adate, setadate] = useState()
    const [alikes, setalikes] = useState([])
    const [addanswer, setaddanswer] = useState("")

    var qid = props.match.params.id;
    console.log(qid)
    useEffect(() => {
        axios.get("http://localhost:3001/question-by-id/?id="+qid).then((res) => {
        console.log(res.data.data)
            setquestion(res.data.data[0].question)
            setqusername(res.data.data[0].userdname)
            settag(res.data.data[0].tag)
            setqdate(res.data.data[0].date)
            setqlikes(res.data.data[0].qlikes)
            // setanswer(res.data.data[0].answer.answer)
            // setadate(res.data.data[0].answer.date)
            // setalikes(res.data.data[0].answer.alikes)
        })
    }, [])
    
    return  <React.Fragment>
        <div>{question}</div>
        <div>{qlikes? qlikes.length : "zero like" }</div>
        <div>{tag}</div>
        <div>{qusername}</div>
        <div>{qdate}</div>
        {/* <div>{answer? (answer.answer? answer.answer : " no answer given ") : 0}</div> */}
        {/* <div>{adate}</div>
        <div>{alikes}</div> */}
            </React.Fragment>
}
