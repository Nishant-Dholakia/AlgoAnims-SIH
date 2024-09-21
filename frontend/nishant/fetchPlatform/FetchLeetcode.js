
const FetchLeetcode = async (username)=>
{
    let api = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
    let data = await api.json();
    return data;
}

export default FetchLeetcode;

