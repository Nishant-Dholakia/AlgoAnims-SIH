import './edit.css'
function EditAccountsPage() {
  return (
    <form className='edit' method='post'>
      <div className="area">
        <label htmlFor="linkedin" className='label'>Linkedin : </label>
        <input type="text" name='linkedin' id='linkedin' placeholder='username(eg. user_12)' />
      </div>
      <div className="area">
        <label htmlFor="github" className='label'>Github : </label>
        <input type="text" name='codechefUname' id='codechef' placeholder='username(eg. user_12)' />
      </div>
      <div className="area">
        <label htmlFor="discord" className='label'>Discord : </label>
        <input type="text" name='discord' id='discord' placeholder='username(eg. user_12)' />
      </div>
      <input type="submit" value='Save' className='save' />
      
    </form>
  )
}

export default EditAccountsPage;
 