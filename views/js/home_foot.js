$(document).ready(()=>{
    $.post('/api/user/getAuthUser',{}).done(out=>{
        const res = JSON.parse(out)
        if(res && res.status === `SUCCESS`){
            $('#prfllnk').removeClass('hide')
            
            $('#log_container').html('<a href="#" class="btn btn-lg btn-primary" id="logout-btn">Logout</a>')
            $('#logout-btn').click(()=>{
                $.post('/api/logout',{}).done((data)=>{
                    if(data && data.status==='SUCCESS'){
                        window.location.href = '/signin'
                    }
                    window.location.href = '/'
                })
            })
        }else{
			$('#signupngo').removeClass('hide')
			$('#sign-up-btn').removeClass('hide')
            $('#log_container').html('<a href="/signin" class="btn btn-lg btn-primary" id="login-btn">Login</a>')
            $('#signup-btn').removeClass('hide')
        }
        
    })
})