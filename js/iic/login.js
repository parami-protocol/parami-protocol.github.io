function switchLang4Login(e){switchLang(e),$("input[name=username]").attr("placeholder",$.i18n("user_name_warning")),$("input[name=password]").attr("placeholder",$.i18n("pwd_warning"))}$(document).ready(function(){$.i18n({locale:"en"}).load({en:"/i18n/en.json",zh:"/i18n/zh.json"}).then(function(){switchLang4Login(2)}),$("input[name=username]").blur(checkUser),$("input[name=password]").blur(checkPwd);var e=$("form");e.on("submit",function(n){checkUser()&&checkPwd()&&!n.isDefaultPrevented()&&$.ajax({url:LOGIN_URL,method:"POST",data:JSON.stringify(e.serializeJSON()),contentType:"application/json"}).done(function(e,n,t){e.success||e.message&&$(".page-error").text(e.message),Cookies.set("token",e.id_token,{expires:3})}).fail(function(e,n,t){$(".page-error").html($.i18n("login_error"))}).then(function(e){if(e.id_token)return $.ajax({url:KYC_STATUS_URL,headers:{Authorization:"Bearer "+e.id_token}})}).done(function(e,n,t){null===e.data||null!==e.data.kycStatus?window.location.href=IIC_KYC_STATUS_PAGE:getUrlParams("redirect")?window.location.href=getUrlParams("redirect"):window.location.href=HOME_PAGE}),n.preventDefault()})});