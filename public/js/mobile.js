__MOBILE_BOOL = false;
__DESKTOP_BOOL = false;
__MOBILE_WIDTH = 768;

function checkSize(mobile,desktop){
  width = window.innerWidth;
  if(width <= __MOBILE_WIDTH && !__MOBILE_BOOL){
    __MOBILE_BOOL = true;
    __DESKTOP_BOOL = false;
    mobile();
  }
  else if(width > __MOBILE_WIDTH && !__DESKTOP_BOOL){
    __MOBILE_BOOL = false;
    __DESKTOP_BOOL = true;
    desktop();
  }
}

window.addEventListener('resize',function(){
  checkSize(__load_mobile,__load_desktop);
});

$(window).ready(function(){
  checkSize(__load_mobile,__load_desktop);
});

function __load_desktop(){
  console.log('Loading Desktop version...');
  //Add init code here
  createRouting();
}

function __load_mobile(){
  console.log('Loading Mobile version...');
  //Add init code here
  createMobileRouting();
}
