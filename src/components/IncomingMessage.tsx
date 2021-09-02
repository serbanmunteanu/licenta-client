import React from 'react'

interface Props {
    content: string;
    date: Date;
}

function IncomingMessage(props: Props) {
    return (
        <div className="incoming_msg">
        <div className="incoming_msg_img">
          {" "}
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />{" "}
        </div>
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>{props.content}</p>
            <span className="time_date"> {props.date.toLocaleString() }</span>
          </div>
        </div>
      </div>
    )
}

export default IncomingMessage
