/**
 * 为每个用户设备分配的唯一标识，会存储在浏览器的 localStorage 里面，用来区分用户, 只有用户清理浏览器缓存才会更新。
 */
const USER_VID = "USER_VID";
function getVid() {
    try {
        let vid = localStorage.getItem(USER_VID)
        if (!vid) {
            vid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                /[xy]/g,
                function (c) {
                    const r = (Math.random() * 16) | 0,
                        v = c == 'x' ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
            localStorage.setItem(USER_VID, vid)
        }
        return vid;
    } catch (e) {
        return ''
    }
}

const testUa = regexp => regexp.test(navigator.userAgent.toLowerCase());

function getSystem() : string {
    let system = "unknow";
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
        system = "windows"; // windows系统
    } else if (testUa(/macintosh|macintel/g)) {
        system = "macos"; // macos系统
    } else if (testUa(/x11/g)) {
        system = "linux"; // linux系统
    } else if (testUa(/android|adr/g)) {
        system = "android"; // android系统
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
        system = "ios"; // ios系统
    }
    return system;
}

function getPlateForm() : string{
    let platform = "unknow";
    const system = getSystem();
    if (system === "windows" || system === "macos" || system === "linux") {
        platform = "desktop"; // 桌面端
    } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
        platform = "mobile"; // 移动端
    }
    return platform;
}

function h5OrWeb():string{
    if(/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) return "h5";
    else return "web"
}

function judgeBrand() :string {
    const sUserAgent = navigator.userAgent.toLowerCase() as string;
    var isIphone = !!sUserAgent.match(/iphone/i)
    var isHuawei = !!sUserAgent.match(/huawei/i)
    var isHonor = !!sUserAgent.match(/honor/i)
    var isOppo = !!sUserAgent.match(/oppo/i)
    var isOppoR15 = !!sUserAgent.match(/pacm00/i)
    var isVivo = !!sUserAgent.match(/vivo/i)
    var isXiaomi = !!sUserAgent.match(/mi\s/i)
    var isXiaomi2s = !!sUserAgent.match(/mix\s/i)
    var isRedmi = !!sUserAgent.match(/redmi/i)
    var isSamsung = !!sUserAgent.match(/sm-/i)

    if (isIphone) {
        return 'iphone';
    } else if (isHuawei || isHonor) {
        return 'huawei';
    } else if (isOppo || isOppoR15) {
        return 'oppo';
    } else if (isVivo) {
        return 'vivo';
    } else if (isXiaomi || isRedmi || isXiaomi2s) {
        return 'xiaomi';
    } else if (isSamsung) {
        return 'samsung';
    } else {
        return 'default';
    }
}




export {
    getVid,
    getSystem,
    getPlateForm,
    judgeBrand,
    h5OrWeb
};