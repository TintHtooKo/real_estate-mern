import React from 'react'
import Hero from '../component/hero/Hero'
import AgentPage from '../component/agent/AgentPage'

export default function Agent() {
    const title = "AGENTS"
    return (
      <div className="">
        <div className="">
          <Hero title={title}/>
        </div>
        <div className="">
          <AgentPage/>
        </div>
      </div>
  )
}
