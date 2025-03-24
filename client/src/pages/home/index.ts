const isUserAvailable = false;
setInterval(()=>{
    if(!isUserAvailable){
        window.location.href = '/auth';
    }
},1000);