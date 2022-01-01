import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import Topquestions from './Topquestions'

export default function Mostliked() {



    return (<div>
<div style={{ padding: '0 0 1% 0', borderBottom: '.1rem solid lightgrey' }}>
    <h1 style={{ margin: '1% 0 1% 2%', display: 'inline-block' }}> Top Questions </h1><br />
    <div class="btn-group" style={{ margin: '0px .3rem 0px .8rem' }}>
        <NavLink class="btn btn-primary active" id="mostl" style={{ textShadow: ".02em .02em white" }} type='button' to='/mostliked'>
            Most Liked
        </NavLink>
        <NavLink class="btn btn-primary" id="mosta" style={{ backgroundColor: "dodgerblue", textShadow: ".02em .02em white" }}
         type='button' to="/mostanswered">
            Most Answered
        </NavLink>
    </div>
</div>
<Switch>
    <Route path='/mostliked' component={Mostliked} />
    <Route path='/mostanswered' component={Topquestions} />
</Switch>
    </div>)
}