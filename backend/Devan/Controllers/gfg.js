async function getGFGdata(uname) {
    try {
        const api = await fetch(`https://geeks-for-geeks-api.vercel.app/${uname}`)
        const data = await api.json()

        return data;
    } catch (error) {
        return "error in gfg"
    }
}

module.exports = getGFGdata;