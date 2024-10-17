async function getCodechecfData(uname){
   try{
    const api = await fetch(`https://codechef-api.vercel.app/handle/${uname}`);
    const data = await  api.json();

    return data;
   }catch(err){
    return "nothing"
   }
}

module.exports = getCodechecfData