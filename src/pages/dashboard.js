import React, { useState, useEffect } from 'react';
import { Data } from '../constants/sample.js';
import VideoDisplay from '../components/videoDisplay.js'

function Dashboard() {
    const [getHeight, setHeight] = useState(window.screen.height);
    const [getWidth, setWidth] = useState(window.screen.width);
    // const [getLastScrollTop, setLastScrollTop] = useState(0);
    // const [scrolled, setScroll] = useState(false);
    let scrolled=false;
    let lastScrolled=window.pageYOffset || document.documentElement.scrollTop;;
    let scrollHeight=0;

    const setHeightandWidth = () => {
        setHeight(window.screen.height);
        setWidth(window.screen.width);
    }

    const setScrollHeight = async (event) => {
        console.log(lastScrolled)
        if (!scrolled) {
            scrolled=true;
            let scrollToTop = window.pageYOffset || document.documentElement.scrollTop;
            let lastScrollTop = 0;
            if (scrollToTop > lastScrolled) {
                lastScrollTop = scrollHeight + window.screen.height;
            } else {
                lastScrollTop = scrollHeight - window.screen.height;               
            }
            scrollHeight=lastScrollTop;
            window.scrollTo(0, scrollHeight)
            lastScrolled = scrollToTop <= 0 ? 0 : scrollToTop;
            setTimeout(() => { if(scrolled) scrolled=false }, 500);
            event.stopPropagation();
        }
    }

useEffect(() => {
    window.addEventListener("resize", setHeightandWidth);
    window.addEventListener("scroll", (event) => setScrollHeight(event));

    return () => {
        window.removeEventListener("resize", setHeightandWidth);
        window.removeEventListener("scroll", () => { });
    }
})



return (
    <div>
        {Data.map((record) => {
            return <VideoDisplay key={record.id} record={record} getWidth={getWidth} getHeight={getHeight} />
        })}
    </div>
)
}

export default Dashboard;