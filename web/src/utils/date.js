export function formatDate(date, format = 'yyyy-MM-dd hh:mm:ss') {
    const map = {
        "M": date.getMonth() + 1, // 月份 
        "d": date.getDate(), // 日 
        "h": date.getHours(), // 小时 
        "m": date.getMinutes(), // 分 
        "s": date.getSeconds(), // 秒 
        "q": Math.floor((date.getMonth() + 3) / 3), // 季度 
        "S": date.getMilliseconds() // 毫秒 
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        let v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}
