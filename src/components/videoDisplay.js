import React, { useState } from 'react';

function VideoDisplay(props) {

    const [startx, setStartx] = useState(null);
    const [starty, setStarty] = useState(null);

    const onTouchStarting = (event) => {
        setStartx(event.touches[0].clientX);
        setStarty(event.touches[0].clientY);
    }

    const onTouchMoving = (event) => {
        if (startx === null) {
            return;
        }

        if (starty === null) {
            return;
        }
        let baseTarget = document.getElementById(`${event.target.id}`);
        let target = document.getElementById(`user${event.target.id.substring(5)}`)
        let diffX = startx - event.touches[0].clientX;
        let diffY = starty - event.touches[0].clientY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
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
        setStartx(event.touches[0].clientX);
        setStarty(event.touches[0].clientY);
    }

    const onUserTouchStarting = (event) => {
        setStartx(event.touches[0].clientX);
        setStarty(event.touches[0].clientY);
    }

    const onUserTouchMoving = (event) => {
        if (startx === null) {
            return;
        }

        if (starty === null) {
            return;
        }
        let baseTarget = document.getElementById(`video${event.target.id.substring(4)}`);
        let target = document.getElementById(`${event.target.id}`);
        let diffX = startx - event.touches[0].clientX;
        let diffY = starty - event.touches[0].clientY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
            baseTarget.style.transition = "all .3s";
            target.style.transition = "all .3s";
            baseTarget.style.left = 0;
            target.style.left = '100%';
            target.style.display = 'none';
            baseTarget.style.display = 'block';

            }
        } 
        setStartx(event.touches[0].clientX);
        setStarty(event.touches[0].clientY);
    }

    const { record: { id,
        video: { originalUrl },
        channel },
        getWidth, getHeight } = props;

    return (
        <div id="check">
            <div style={{ clear: 'both' }}>
                <video width={getWidth} height={getHeight} controls
                    id={`video${id}`} onTouchStart={(event) => onTouchStarting(event)}
                    onTouchMove={(event) => onTouchMoving(event)} >
                    <source src={originalUrl} type="video/mp4" />
                </video>
            </div>
            <div id={`user${id}`} className="userName"
                onTouchStart={(event) => onUserTouchStarting(event)}
                onTouchMove={(event) => onUserTouchMoving(event)}>
                {channel && channel.user.name ? channel.user.name : `#user`}
            </div>
        </div>
    );
}

export default VideoDisplay;