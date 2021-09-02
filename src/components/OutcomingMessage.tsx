import React from 'react'

interface Props {
    date: Date;
    content: string;
}

function OutcomingMessage(props: Props) {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
              <p>{props.content}</p>
              <span className="time_date">{props.date.toLocaleString()}</span>{" "}
            </div>
          </div>
    )
}

export default OutcomingMessage
