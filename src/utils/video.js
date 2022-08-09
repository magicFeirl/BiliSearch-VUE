export function getVideoAttrText(attr) {
    if (attr === 62002) {
        return '失效: 自删'
    }

    return '失效'
}

export function videoLink(aid) {
    return `https://www.bilibili.com/video/av${aid}`
}

export function jumpToBili(aid) {
    window.open(this.videoLink(aid));
}

export function videoDuration(duration) {
    let sec = duration % 60,
        min = Math.floor((duration / 60) % 60),
        hour = Math.floor(duration / 3600);

    if (sec < 10) {
        sec = "0" + sec;
    }

    if (min < 10) {
        min = "0" + min;
    }

    let duration_str = "";

    if (hour) {
        duration_str = duration_str + hour + ":";
    }

    duration_str = duration_str + min + ":" + sec;

    return duration_str;
}
