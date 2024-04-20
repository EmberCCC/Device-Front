export function getField(authObj, fieldObj) {
    let endList = [];
    Object.keys(authObj).map((key) => {
        if (authObj[key].indexOf('look') > -1 && fieldObj.hasOwnProperty(key)) {
            let iObj = { ...fieldObj[key] }
            if (iObj.hasOwnProperty('title_vis') && iObj['title_vis'] == false) {
                iObj['title'] = ""
            }
            if (authObj[key].indexOf('edit') <= -1 || iObj.hasOwnProperty('disabled') && iObj['disabled'] == false) {
                iObj['disabled'] = true
            }
            endList.push(iObj)
        }
    })
    return endList;
}