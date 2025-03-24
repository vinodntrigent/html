/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHiddenPass = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
      if(input.type === 'password'){
         // Switch to text
         input.type = 'text'

         // Icon change
         iconEye.classList.add('bi-eye')
         iconEye.classList.remove('bi-eye-slash')
      } else{
         // Change to password
         input.type = 'password'

         // Icon change
         iconEye.classList.remove('bi-eye')
         iconEye.classList.add('bi-eye-slash')
      }
   })
}

showHiddenPass('login-pass','login-eye')