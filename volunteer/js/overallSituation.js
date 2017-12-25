function antiShake(lastTime) {
	var currentTime = Date.parse(new Date());

	if(lastTime != "") {
		if(currentTime - lastTime < 2000) {
			return false;
		}
	}
	return true;
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

function villageLoad() {
	var villageId = "";
	var userCustom = null;
	if(typeof(window.sessionStorage.adminUser) == "undefined") {
		userCustom = JSON.parse(window.sessionStorage.estateUser);
	} else {
		userCustom = JSON.parse(window.sessionStorage.adminUser);
	}

	var role = userCustom.roles[0];
	//物业用户
	if(role.type == 2) {
		villageId = userCustom.villageId;
		$("#villageName").val(userCustom.villageName);
		$.myloading("hide");
	}
	//管理员用户
	if(role.type == 1) {
		villageId = $.cookie("villageId");
		//通过小区id查找小区名称，并赋值到页面上 start
		$.ajax({
			"url": "/jiajianiu/web/village/getById",
			"data": {
				villageId: villageId
			},
			"type": 'post',
			"dataType": 'json',
			"success": function(res) {
				if(res.code == "101") {
					layer.alert("鉴权已过期，请重新登录");
					parent.location = "/jiajianiuUI/login.html";
				} else if(res.code == "200") {
					$("#villageName").val(res.data.name);
				}
				$.myloading("hide");
			},
			"error": function(data) {
				console.log(data.responseText);
				$.myloading("hide");
			}
		});
		//通过小区id查找小区名称，并赋值到页面上 end

	}
	
	return villageId;
	
}

function villageIdLoad(){
	var villageId = "";
	var userCustom = null; 
	if(typeof(window.sessionStorage.adminUser) == "undefined"){
		userCustom = JSON.parse(window.sessionStorage.estateUser);
	}else{
		userCustom = JSON.parse(window.sessionStorage.adminUser);
	}
	var role = userCustom.roles[0];
	//物业用户
	if(role.type == 2){
		villageId = userCustom.villageId;
	}
	//管理员用户
	if(role.type == 1){
		villageId = $.cookie("villageId");
	}
	
	return villageId;
			
}
