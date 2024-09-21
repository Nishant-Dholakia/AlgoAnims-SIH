
const FetchCodechef = async (username)=>
    {
        let api = await fetch(`https://codechef-api.vercel.app/handle/${username}`)
        let data = await api.json();
        return data;
    }
    
    export default FetchCodechef;
    
    