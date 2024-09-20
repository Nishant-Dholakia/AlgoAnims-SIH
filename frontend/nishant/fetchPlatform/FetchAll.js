import FetchCodechef from "./FetchCodechef";
import FetchGeeks from "./FetchGeeks";
import FetchLeetcode from "./FetchLeetcode"

async function Leetcode({username})
{
    const leetdata = await FetchLeetcode(username);
    return leetdata;
}
async function Codechef({username})
{
    const codedata = await FetchCodechef(username);
    
    return codedata;
}

async function Geeks({username})
{
    const geeks = await FetchGeeks(username);
    return geeks;
}

function FetchAll({username})
{
    let leetcode = Leetcode(username);
    let codechef = Codechef(username);

    let object = {
        totalSolved : leetcode.totalSolved,
        leetcode : leetcode,
        codechef : codechef
    }
}

export default FetchAll;