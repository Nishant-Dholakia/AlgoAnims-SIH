const FetchGeeks = async (username)=>
    {
        let api = await fetch(`https://geeks-for-geeks-api.vercel.app/${username}`)
        let data = await api.json();
        return data;
    }
    
    export default FetchGeeks;