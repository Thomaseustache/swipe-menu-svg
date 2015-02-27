/*Swipe Menu SVG - by  @eustachethomas*/
var wH, wW, startX, mouseX, mouseY, decX, decY;
$(document).ready(function(){
    var s = Snap( '.menu svg' );
        pathEl = s.select( 'path' );
    pathOrigin = $('.bg path').attr('d');
    isDragging = false;

    wH = $(window).height();
    wW = $(window).width();
    startX = 0;
    
    $(window).resize(function(event){
        wH = $(window).height();
        wW = $(window).width();
    });
    
    $(window).mousemove(function(event){
        if(isDragging){
            mouseX = event.pageX - startX;
            mouseY = event.pageY;
            decX = parseInt( mouseX/ wW *100 );
            decY = parseInt( mouseY/ wH *100 );
        }else{
            decX = decY = 0; 
        }
        transform();
    });
    
    $(window).mousedown(function(event){
        isDragging = true;
        startX = event.clientX;
    });
    $(window).mouseup(function(){
        isDragging = false;
        if(decX<50){
            newPath = pathOrigin;
            pathEl.stop().animate( { 'path' : newPath }, 800, mina.elastic );
            $('.menu').removeClass('open');
        }
    });
	
});


function transform(){
    
    if( !$('.menu').hasClass('open') ){
        if(isDragging){
            // newPath = 'M 0 0, L 0 100, L 0 100, C '+decX+' '+(decY-20)+' '+decX+' '+(decY+20)+' 0 0, Z';
            newPath = 'M0,0C0,0,0,100,0,100C0,100,0,100,0,100C'+decX+','+(decY-20)+','+decX+','+(decY+20)+',0 0C0,0,0,0,0,0C0,0,0,0,0,0';
            $('.bg path').attr('d', newPath);
            if(decX>50){
                newPath = 'M 0 0, L 0 100, L 40 100, L 40 0, Z';
                pathEl.stop().animate( { 'path' : newPath }, 800, mina.elastic );
                $('.menu').addClass('open');
            }
            
        }else{
            newPath = pathOrigin;
            $('.bg path').attr('d', newPath);
        }
        
        
    }
}