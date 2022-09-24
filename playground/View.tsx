// @ts-ignore
import React from "react"

const dummyTrueValue = Date.now()
export const View = ()=> {

    return (
      <div>
          {(666 &&  <>Kill me in production</>)}
          {(dummyTrueValue &&  <>Preserve in production</>)}
      </div>
    
    )
}