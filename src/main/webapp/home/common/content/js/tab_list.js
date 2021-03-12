// 페이지내의 탭메뉴 JS
function extend( ns_string ) {
    var parts = ns_string.split('.');
    var parent;
    
    if(!this[parts[0]]) this[parts[0]] = {};
    
    parent = this[parts[0]];
    
    for(var i=1; i<parts.length; i++){
        
        if (!parent[parts[i]]) {
            parent[parts[i]] = {};  
        }
        parent = parent[parts[i]];
    }
    
    return parent;
}


(function(){
	/* tabmenu */
	var tabmenu = function($obj){
		
		var $tab = $obj
		var c_idx=0;
		var p_idx =0;	//prev idx
		
		$(function(){
			init();
			events();
		});

		var init =function(){
			$tab.find("dl>dt:eq(0)>a").addClass("over");
			$tab.find("dl>dd:eq(0)").css("display","block");

		}

		var events = function(){
			$tab.find("dl>dt").click(function(e){
				e.preventDefault();
				
				if($(this).index() != p_idx){
					$tab.find("dl>dd:eq("+ p_idx/2 +")").css("display","none");
					$(this).next("dd").css("display","block");
					$tab.find("dl>dt:eq("+ p_idx/2 +")>a").removeClass("over");
					$(this).find("a").addClass("over");
					c_idx = $(this).index();
					p_idx = $(this).index();
				}
			});

			$tab.find("dl>dt").bind("mouseover",function(){
				onTabOver($(this).index());				
			});
			$tab.find("dl>dt").bind("mouseout",function(){
				onTabOut($(this).index());
			});

			$tab.find("dl>dt").find(">a").focus(function(){	
				c_idx = $(this).parents("dt").index();	
				
				$tab.find("dl>dd").each(function(i){
					if(c_idx/2 == i) $(this).css("display","block");
					else $(this).css("display","none");
				});
				$tab.find("dl>dt").each(function(i){
				
					if($(this).index() == c_idx) $(this).find("a").addClass("over");				
					else  $(this).find("a").removeClass("over");
				});
				p_idx = $(this).parents("dt").index();	
			});
	
		}
		var onTabOver = function(idx){
			$tab.find("dl>dt:eq("+ idx/2 +")>a").addClass("over");
		}
		var onTabOut = function(idx){
			if(idx!=c_idx)	$tab.find("dl>dt:eq("+ idx/2 +")>a").removeClass("over");			
		}
	}
	
	var ns = extend('display');
	ns.TabMenu = tabmenu;
	

	var tablist = function($obj){
		
		var $tab = $obj
		var $lists;
		var $cont;	//prev idx
		var c_idx=0;
		var p_idx =0;


		var info = {
			_obj:$obj.menu,		//list
			_cont : $obj.cont,
			init : init
			
		}
		return info;
	}
})(jQuery);


if($(".tabmenu").size()>0){
	$(".tabmenu").each(function(){
		var tab = new display.TabMenu($(this));
	});
}