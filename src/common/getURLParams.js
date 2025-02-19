
const fecthURLParams = (paramter) => {
    const URLparams = new URLSearchParams(window.location.search)
    const param = URLparams.get(paramter)
    return param;
}

export default fecthURLParams;