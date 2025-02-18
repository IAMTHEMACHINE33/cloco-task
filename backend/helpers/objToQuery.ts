export const objToQuery = (obj: Record<string, any>) => {
    const result =  Object.values(obj).map((ele) => `'${ele}'`).join(', ')
    return result;
}

export const objToKeyQuery = (obj: Record<string, any>) => {
    const result =  Object.keys(obj).map((ele) => `"${ele}"`).join(', ')
    return result;
}

export const objToWhereQuery = (obj: Record<string, any>) => {
    const result = Object.entries(obj).map((ele) => `"${ele[0]}" = '${ele[1]}'`).join(' AND ')
    console.log('result',result)
    return result;
}
