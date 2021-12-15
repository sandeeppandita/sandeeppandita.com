// Media query events
var mqMobile = window.matchMedia('(max-width: 992px)');



// Page load events
$('document').ready(function(e){
    
    // Loading page preloader handler
    setTimeout(HandlePreloader,200);
    
    // Handle Navigation Menu 
    HandleNavigationMenu(); 

    // Set nav menu state based on url hash
    SetNavigationMenuState();

    // Index page navigation menu hover 
    $('.nav-menu li').on('click',ToggleMenuStatus);
    
    // Mobile navigation toggle click
    $('.nav-toggle').on('click', ShowSideMenu);

});



// Media query change events
mqMobile.addEventListener('change', HandleNavigationMenuOnChange); 
mqMobile.addEventListener('change', SetupInitialSceneOnChange);



//custom functions
function HandlePreloader(){
    $('#loading_page').delay(300).fadeOut(500, function(){
        SetupInitialScene();
    });
    $('#loading_loader').addClass('animate');
    $('#loading_name').addClass('animate');
    $('#loading_desig').addClass('animate');
}

function SetupInitialScene(){

    if (mqMobile.matches) {
        $('.nav-home').addClass('animate');
        $('.scroll-area').addClass('animate');
        
        setTimeout(function(){
            $('.nav-home').removeClass('animate');
        },1200);

        setTimeout(function(){
            $('.nav-toggle').addClass('animate');
        },2000);

    }else{
        $('.nav-home').addClass('animate');
        $('.scroll-area').addClass('animate');

        setTimeout(function(){
            $('.nav-toggle').removeClass('animate');
        },1000);

    }
}   

function SetupInitialSceneOnChange(event){
    if (event.matches) {
        $('.nav-home').addClass('animate');
        $('.scroll-area').addClass('animate');
        
        setTimeout(function(){
            $('.nav-home').removeClass('animate');
        },1200);

        setTimeout(function(){
            $('.nav-toggle').addClass('animate');
        },2000);

    }else{
        $('.nav-toggle').removeClass('animate');
        $('.scroll-area').addClass('animate');

        setTimeout(function(){
            $('.nav-home').addClass('animate');
        },1000);
    }
}

function SetNavigationMenuState(){
    var target = location.hash.replace(/^#+/i, '');
    if(target != ""){
        $('.nav-menu li').removeClass('active');
        $('li[data-menu-key="'+target+'"]').addClass("active");
    }
} 

function ShowSideMenu(){
    $('.nav-toggle').removeClass('animate');

    setTimeout(function(){
        $('.nav-home').addClass('animate');
    },1000);
}

function HandleNavigationMenu(event){

    $('.nav-menu li a[href^="#"]').off();

    if (mqMobile.matches) {

        // attach mobile click event
        $('.nav-menu li a[href^="#"]').on('click',NavigationMobileClickHandler);

    } else { 

        // attach desktop click event
        $('.nav-menu li a[href^="#"]').on('click',NavigationDesktopClickHandler);
    }
}

function HandleNavigationMenuOnChange(event){ 

    $('.nav-menu li a[href^="#"]').off(); 

    if (event.matches) {

        // attach mobile click event
        $('.nav-menu li a[href^="#"]').on('click',NavigationMobileClickHandler);

    } else {    

        // attach desktop click event 
        $('.nav-menu li a[href^="#"]').on('click',NavigationDesktopClickHandler);
    } 
} 

function NavigationDesktopClickHandler(event){
    console.log("Click event on desktop");
    event.preventDefault();

    ScrollNavigationMenu(this);
}   

function NavigationMobileClickHandler(){
    console.log("Click event on mobile");

    ScrollNavigationMenu(this); 

    $('.nav-home').removeClass('animate');

    setTimeout(function(){
        $('.nav-toggle').addClass('animate');
    },1000); 
}

function ScrollNavigationMenu(_this){
    
    var target = $.attr(_this, 'href');
    ScrollTo(target);
}

function ScrollTo(target){
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 500, function () {
        window.location.hash = target;
    });
}

function ToggleMenuStatus(){
    $('.nav-menu li').removeClass('active');
    $(this).addClass("active");
}





