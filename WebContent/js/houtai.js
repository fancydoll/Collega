$(function(){
	$(".newsli").click(function(){
		if($(".news").css("display")=="none"){
		$(".news").show();
		}else{
		$(".news").hide();
		}
	});
	$(".courseli").click(function(){
		if($(".course").css("display")=="none"){
		$(".course").show();
		}else{
		$(".course").hide();
		}
	});
	
	/*添加新闻*/
	var item;
	function getJSON(type,title){
    	$.ajax({
    		   type: "POST",
    		   url: "news",
    		   async: false,
    		   data: "type="+type+"&title="+title, 
    		   success: function(msg){
    			   item = msg;
    		   }
    		});
    }
	
	$(".submit").click(function(){
		var type = $(".type").val();
		var title = $(".title").val();
		getJSON(type,title);
		if(item == 1){
			alert("添加成功");
		}
		else{
			alert("添加失败");
		}
	});
	
//	删除新闻要点
	var ipage = 1;
	var items;
	var typeid = 1;
	var flag = 1;
	function getHot(typeid,ipage){
		$.ajax({
			   type: "POST",
			   url: "hotnews",
			   async: false,
			   data: "typeid="+typeid+"&ipage="+ipage, 
			   success: function(msg){   
			     items = eval("("+msg+")");
			   }
			});
	}
	
	getHot(1,ipage);
	
	var hot = new Vue({
	    el: '#hotTable',
	    data:{
			   news:items
		   }
	});
	
	$(".newstext li").click(function(){
		flag = 1;
		ipage = 1;
		var h1 = $(this).attr("type");
		$(".biaoti").find(".hot").remove();
		$(".fenlei").after('<span class="hot">' + h1 +'管理</span>');
		typeid = $(this).attr("typeid");
		getHot(typeid,ipage);
		hot.$set(hot.$data,"news",items);
	});
	
//	下一页上一页按钮
	$(".nextNew").click(function(){
		  ipage++;
//		    显示加载动画
		  getHot(typeid,ipage);
		  if(items == ""){
				flag = 0;
			}
		  if(flag == 0){
				$(".nextNew").hide();
			}
		  $(".out-body").show();
		  $(".for").hide();
		  setTimeout(news,1000);
		  hot.$set(hot.$data,"news",items);
	});
	$(".topNew").click(function(){
		ipage = 1;
		$(".nextNew").show();
	    getHot(typeid,ipage);
	    $(".out-body").show();
		$(".for").hide();
		setTimeout(news,1000);
		hot.$set(hot.$data,"news",items);
	});
	function news(){
		$(".for").show();
		$(".out-body").hide();
	}
	
//	删除新闻
	var item3
	function deleteNew(id){
		$.ajax({
			   type: "POST",
			   url: "deletenew",
			   async: false,
			   data: "id="+id, 
			   success: function(msg){   
			     item3 = msg
			   }
			});
	}
	$(".deleteNew").click(function(){
		var id = $(this).parents("tr").find("td").eq(1).text();
		deleteNew(id);
		if(item3 == 1){
			alert("成功删除");
		}
		else{
			alert("删除失败");
		}
	});
	
//	新闻导航条被点击样式
	$(".newstyle li").click(function(){
		$(".newstyle li.selected").removeClass("selected");
		$(this).addClass("selected");
	});
	
//	查询学生信息
	var ipage2 = 1;
	var item4;
	function findStudent(ipage){
		$.ajax({
			   type: "POST",
			   url: "findStudent",
			   async: false,
			   data: "ipage="+ipage, 
			   success: function(msg){   
			     item4 = eval("("+msg+")");
			   }
			});
	}
	
	findStudent(ipage2);
	var s = new Vue({
	    el: '#student',
	    data:{
			   students:item4
		   }
	});
	
//	学生信息下一页按钮
	$(".nextStudent").click(function(){
		  ipage2++;
//		    显示加载动画
		  findStudent(ipage2);
		  if(item4 == ""){
				flag = 0;
			}
		  if(flag == 0){
				$(".nextStudent").hide();
			}
		  $(".out-body").show();
		  $(".student1").hide();
		  setTimeout(student,1000);
		  s.$set(s.$data,"students",item4);
	});
	$(".topStudent").click(function(){
		ipage2 = 1;
		$(".nextStudent").show();
		findStudent(ipage2);
		$(".out-body").show();
		$(".student1").hide();
		setTimeout(student,1000);
		s.$set(s.$data,"students",item4);
	});
	function student(){
		$(".student1").show();
		$(".out-body").hide();
	}
	
//	删除学生
	var item5 = 0;
	function deleteStudent(name){
		$.ajax({
			   type: "POST",
			   url: "deleteStudent",
			   async: false,
			   data: "name="+name, 
			   success: function(msg){   
			     item5 = msg;
			   }
			});
	}
	$(".deleteStudent").click(function(){
		var name = $(this).parents("tr").find("td").eq(0).text();
		deleteStudent(name);
		if(item5 == 1){
			alert("成功删除");
		}
		else{
			alert("删除失败");
		}
	});
	
//	学院显示
	var item6;
	function findXueyuan(){
		$.ajax({
			   type: "POST",
			   url: "findXueyuan",
			   async: false,
			   success: function(msg){   
			     item6 = eval("("+msg+")");
			   }
			});
	}
	findXueyuan();
	var x = new Vue({
	    el: '#major',
	    data:{
			   xueyuan:item6
		   }
	});
	
//	添加专业
	var item7;
	function setMajor(name, img, desc, xname){
		$.ajax({
			   type: "POST",
			   url: "setMajor",
			   async: false,
			   data: "name="+name+"&img="+img+"&desc="+desc+"&xname="+xname, 
			   success: function(msg){   
			     item7 = msg;
			   }
			});
	}
	$(".addMajor").click(function(){
		var xname = $(".xname").val();
		var name = $(".majorName").val();
		var img1 = $(".majorImg").val();
		var img2 = img1.split('\\');
		var img3 = img2[img2.length-1];
		var img = "img/"+img3;
		var desc = $(".majorDesc").val();
		setMajor(name, img, desc, xname);
		if(item7 == 1){
			alert("添加成功");
		}
		else{
			alert("添加失败");
		}
	});
	
//	查询专业信息
	var ipage8 = 1;
	var item8;
	var flag8 = 1;
	function getMajor(ipage){
		$.ajax({
			   type: "POST",
			   url: "getMajor",
			   async: false,
			   data: "ipage="+ipage, 
			   success: function(msg){   
			     item8 = eval("("+msg+")");
			   }
			});
	}
	
	getMajor(ipage8);
	
	var major = new Vue({
	    el: '#managerMajor',
	    data:{
			   major:item8
		   }
	});
//	下一页首页
	$(".nextMajor").click(function(){
		  ipage8++;
//		    显示加载动画
		  getMajor(ipage8);
		  if(item8 == ""){
				flag8 = 0;
			}
		  if(flag8 == 0){
				$(".nextMajor").hide();
			}
		  $(".out-body").show();
		  $(".majorTable2").hide();
		  setTimeout(major2,1000);
		  major.$set(major.$data,"major",item8);
	});
	$(".topMajor").click(function(){
		ipage8 = 1;
		$(".nextMajor").show();
		$(".out-body").show();
		getMajor(ipage8);
		$(".majorTable2").hide();
		setTimeout(major2,1000);
		major.$set(major.$data,"major",item8);
	});
	function major2(){
		$(".majorTable2").show();
		$(".out-body").hide();
	}
	
	//删除专业
	var item9 = 0;
	function deleteMajor(name){
		$.ajax({
			   type: "POST",
			   url: "deleteMajor",
			   async: false,
			   data: "name="+name, 
			   success: function(msg){   
			     item9 = msg;
			   }
			});
	}
	$(".deleteMajor").click(function(){
		var name = $(this).parents("tr").find("td").eq(0).text();
		alert(name);
		deleteMajor(name);
		if(item9 == 1){
			alert("成功删除");
		}
		else{
			alert("删除失败");
		}
	});
});



