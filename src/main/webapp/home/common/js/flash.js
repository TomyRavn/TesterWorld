function FlashFunc(url,imgurl,w,h,id,wmod,alt_cont){ 
    document.writeln( "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' id='"+id+"' width='"+w+"' height='"+h+"'>");   
    document.writeln( "<param name='movie' value='"+url+"' />" );   
    document.writeln( "<param value='high' name='quality'/>" );   
    document.writeln( "<param name='wmode' value='"+wmod+"' />" );  
    document.writeln( "<!--[if !IE]> <-->" );   
    document.writeln( "<object type='application/x-shockwave-flash' data='"+url+"'  width='"+w+"' height='"+h+"'>" );   
    document.writeln( "<param value='high' name='quality'/>" );   
    document.writeln( "<param name='wmode' value='"+wmod+"' />" );  
    document.writeln( "<!--> <![endif]-->" );  	
    document.writeln("<p class='no_mar'><img src='"+imgurl+"' alt='"+alt_cont+"' /></p>" ); 
    document.writeln( "<!--[if !IE]> <-->" );     
    document.writeln( "</object>" );   
    document.writeln( "<!--> <![endif]-->" );   
    document.writeln( "</object>" );
}  