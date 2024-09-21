import './edit.css'
function EditPlatformPage() {
  return (
    <form className='edit' method='post'>
      <div className="area">
        <label htmlFor="leetcode" className='label'>LeetCode : </label>
        <input type="text" name='leetcodeUname' id='leetcode' placeholder='username(eg. user_12)' />
      </div>
      <div className="area">
        <label htmlFor="codechef" className='label'>CodeChef : </label>
        <input type="text" name='codechefUname' id='codechef' placeholder='username(eg. user_12)' />
      </div>
      <div className="area">
        <label htmlFor="geeksforgeeks" className='label'>GeeksForGeeks : </label>
        <input type="text" name='gfgUname' id='geeksforgeeks' placeholder='username(eg. user_12)' />
      </div>
      <input type="submit" value='Save' className='save' />
      
    </form>
  )
}

export default EditPlatformPage;
