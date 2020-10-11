import React, { useState } from 'react';

function VideoDisplay(props){

    const [startx, setStartx] = useState(0);

    const onTouchStarting = (event) => {
        setStartx(event.touches[0].clientX);
    }

    const onTouchMoving = (event) => {
        let touch = event.touches[0];
        let change = startx-touch.clientX;
        let baseTarget = document.getElementById(`${event.target.id}`);
        let target = document.getElementById(`user${event.target.id.substring(5)}`)
        if (change < 0) {
            return
        }
        baseTarget.style.left = '-' + change + 'px';
        target.style.display = 'block';
        target.style.left = ((window.screen.width) - change) + 'px';
    }

    const onTouchEnding = (event) => {
        let change = startx - event.changedTouches[0].clientX;
        let threshold = window.screen.width / 3;
        let baseTarget = document.getElementById(`${event.target.id}`);
        let target = document.getElementById(`user${event.target.id.substring(5)}`)
        if (change < threshold) {
            baseTarget.style.left = 0;
            target.style.left = '100%';
            target.style.display = 'none';
        } else {
            baseTarget.style.transition = "all .3s";
            target.style.transition = "all .3s";
            baseTarget.style.display = '-100%';
            target.style.left = '0';
            target.style.display = 'flex';
            baseTarget.style.display = 'none'
            target.style.height = `${window.screen.height}px`;
            target.style.width = `${window.screen.width}px`;
        }
    }

    const onUserTouchStarting = (event) => {
        setStartx(event.touches[0].clientX);
        let baseTarget = document.getElementById(`video${event.target.id.substring(4)}`);
        let target = document.getElementById(`${event.target.id}`);
        baseTarget.style.transition = '';
        target.style.transition = '';
        baseTarget.style.display = 'none'
    }

    const onUserTouchMoving = (event) => {
        let touch = event.touches[0];
        let change = touch.clientX - startx;
        let baseTarget = document.getElementById(`video${event.target.id.substring(4)}`);
        let target = document.getElementById(`${event.target.id}`);
        if (change < 0) {
            return
        }
        baseTarget.style.display = 'block'
        baseTarget.style.left = change - window.screen.width + 'px';
        target.style.display = 'flex';
        target.style.left = change + 'px';
    }

    const onUserTouchEnding = (event) => {
        let change = event.changedTouches[0].clientX - startx;
        let threshold = window.screen.width / 4;
        let baseTarget = document.getElementById(`video${event.target.id.substring(4)}`);
        let target = document.getElementById(`${event.target.id}`);
        if (change < threshold) {
            baseTarget.style.left = '-100%';
            baseTarget.style.display = 'none';
            target.style.left = 0;
        } else {
            baseTarget.style.transition = "all .3s";
            target.style.transition = "all .3s";
            baseTarget.style.left = 0;
            target.style.left = '100%';
            target.style.display = 'none';
            baseTarget.style.display = 'block';
        }
    }

    const { record : {id,
        video: { originalUrl },
        channel},
        getWidth,getHeight } = props;

    return (
        <div id="check">
            <div style={{ clear: 'both' }}>
                <video width={getWidth} height={getHeight} controls
                    id={`video${id}`} onTouchStart={(event) => onTouchStarting(event)}
                    onTouchMove={(event) => onTouchMoving(event)} onTouchEnd={(event => onTouchEnding(event))}>
                    <source src={originalUrl} type="video/mp4" />
                </video>
            </div>
            <div id={`user${id}`} className="userName"
                onTouchStart={(event) => onUserTouchStarting(event)}
                onTouchMove={(event) => onUserTouchMoving(event)}
                onTouchEnd={(event => onUserTouchEnding(event))}>
                {channel&& channel.user.name? channel.user.name : `#user`}
            </div>
        </div>
    );
}

export default VideoDisplay;