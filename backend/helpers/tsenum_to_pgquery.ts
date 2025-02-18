export const enumToQuery = (tsenum: Record<string, string>) => {
    const result =  Object.values(tsenum).map((ele) => `'${ele}'`).join(', ').trim()
    return result;
}
