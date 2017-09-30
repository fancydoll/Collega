$(function(){
//	在必填标签后加上*号
	var result1 = false;
	var result2 = false;
	var result3 = false;
	var result4 = false;
	var result5 = false;
	$('.xinxi').each(function(){
		var $required = $("<strong class='high'> *</strong>"); 
        $(this).after($required);
        
	});
//	姓名验证
	$('.name').blur(function(){
        result1 = validateEl($(this));
	});
	$('.age').blur(function(){
    	result2 = validateEl($(this));
	});
	$('.School').blur(function(){
    	result3 = validateEl($(this));
	});
	$('.address').blur(function(){
    	result4 = validateEl($(this));
	});
	$('.tell').blur(function(){
    	result5 = validateEl($(this));
	});
	var validateEl = function(el) {
        var result = validateField(el);
        var controlGroup = el.parents('td');
        if(result.result) {
        	controlGroup.find(".help-block").remove();
//          el.after('<span class="help-block">正确</span>');
        } else { 
            controlGroup.find(".help-block").remove();
            el.after('<span class="help-block">' + result.errorMsg +'</span>');
        }
        return result.result;
    }
    
    var validateField = function(field){
          var el = $(field);
          //验证非空表单
          var required = el.attr("required");
          if(required && required == "required") {
              var requiredMsg = el.attr("required-msg");
              requiredMsg = requiredMsg ? requiredMsg : "该项不能为空";
              var value = el.val();
              if(value == null || $.trim(value) == "") {
                  return {result:false, errorMsg:requiredMsg};
              }
          }
          var checkType = el.attr("check-type");
          if(checkType){
              var value = el.val();
              var checkTypeMsg = el.attr("check-type-msg");
              checkTypeMsg = checkTypeMsg ? checkTypeMsg : "请填写正确的数据格式";
              if(checkType == "number") {
                  if(validRules.checkNumber(value)) {
                      return {result:false, errorMsg:checkTypeMsg};
                  }
              } else if(checkType == "int") {
                  if(validRules.checkInt(value)) {
                      return {result:false, errorMsg:checkTypeMsg};
                  }
              } else if(checkType == "url") {
                  if(validRules.checkUrl(value)) {
                      return {result:false, errorMsg:checkTypeMsg};
                  }
              } else if(checkType == "email") {
                  if(validRules.checkEmail(value)) {
                      return {result:false, errorMsg:checkTypeMsg};
                  }
              } else if(checkType == "mobile") {
                  if(validRules.checkMobile(value)) {
                      return {result:false, errorMsg:checkTypeMsg};
                  }
              }     
          }
           
          //验证字符串长度
          var minLength = el.attr("minLength");
          var minLengthMsg = el.attr("minLengthMsg");
          minLengthMsg = minLengthMsg ? minLengthMsg : "请输入正确的字符长度";
          if(minLength) {
              var value = el.val();
              if(value.length <= minLength) {
                  return {result:false, errorMsg:minLengthMsg};
              }
          }
          var maxLength = el.attr("maxLength");
          if(maxLength) {
             var maxLengthMsg = el.attr("maxLengthMsg");
             maxLengthMsg = maxLengthMsg ? maxLengthMsg : "请输入正确的字符长度";
             if(value.length > maxLength) {
                 return {result:false, errorMsg:minLengthMsg};
             } 
          }
           
          //验证数值大小
          var min = el.attr("min");
          if(min && !isNaN(min)) {
              var value = el.val();
              var minMsg = el.attr("min-msg");
              minMsg = minMsg ? minMsg : "请输出正确的数值";
              if(isNaN(value) || value <= min) {
                  return {result:false, errorMsg:minMsg};
              }
          }
          var max = el.attr("max");
          if(max && !isNaN(max)) {
              var value = el.val();
              var maxMsg = el.attr("max-msg");
              maxMsg = maxMsg ? maxMsg : "请输入正确数值";
              if(isNaN(value) || value > max) {
                  return {result:false, errorMsg:maxMsg};
              }
          }
          return {result:true};
      }
    var validRules = {
          checkInt:function(value) {
              return (!/^[0-9]\d*$/.test(value));
          },
          checkNumber:function(value) {
              return (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value));
          },
          checkEmail:function(value) {
              return (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value));
          },
          checkUrl:function(value) {
              !/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
          },
          checkMobile:function(value) {
              return (!/^0?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value));
          }          
     }
    
//    插入学生信息
    var item = 2;
    function getJSON(name,sex,age,School,address,tell,course,beizhu){
    	$.ajax({
    		   type: "POST",
    		   url: "student",
    		   async: false,
    		   data: "name="+name+"&sex="+sex+"&age="+age+"&School="+School+"&address="+address
    		   +"&tell="+tell+"&course="+course+"&beizhu="+beizhu, 
    		   success: function(msg){
    			   item = msg;
    		   }
    		});
    }
//    getJSON("22", "男", "16", "一中", "湖南", "15116017564", "java", "无");
    
//    点击提交
    $(".submit").click(function(){
    	 var course = $(".course").val();
    	 var name = $(".name").val();
    	 var sex = $(".sex").val();
    	 var age = $(".age").val();
    	 var School = $(".School").val();
    	 var address = $(".address").val();
    	 var tell = $(".tell").val();
    	 var beizhu = $(".textarea").val();
    	 if(result1&&result2&&result3&&result4&&result5){
    		 getJSON(name, sex, age, School, address, tell, course, beizhu);
    		 if(item == 1){
    			 alert("您已报名成功，请等待消息");
    		 }
    		 else{
    			 alert("您已经报名");
    		 }
    	 }
    	 else{
    		 alert("填写出错");
    	 }
    });

});
