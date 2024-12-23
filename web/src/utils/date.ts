export function formatDate(date:Date, format:string = 'yyyy-MM-dd hh:mm:ss') {
    const map:Record<string,number> = {
        "M": date.getMonth() + 1, // 月份 
        "d": date.getDate(), // 日 
        "h": date.getHours(), // 小时 
        "m": date.getMinutes(), // 分 
        "s": date.getSeconds(), // 秒 
        "q": Math.floor((date.getMonth() + 3) / 3), // 季度 
        "S": date.getMilliseconds() // 毫秒 
    };
    format = format.replace(/([yMdhmsqS])+/g, function (all, t): string {
        let v: string | number = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.slice(-2);
            }
            return v.toString();
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}
