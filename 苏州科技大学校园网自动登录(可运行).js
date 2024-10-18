// ==UserScript==
// @name         苏州科技大学校园网自动登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  可用于苏州科技大学校园网快速登录
// @author       You
// @match        http://10.160.63.9
// @grant        none
// @license MIT --
// @downloadURL --
// ==/UserScript==
//把运营，学号和密码改成你们自己的！


// user_account、user_password 分别是账号和密码
var user_account='学号';
var user_password='密码';
// 运营商，1 校园网、2 中国移动、3 中国联通、4 中国电信
var lsp=4;//将4改为对应的运营商数字

// 各个控件的 selector
var boxOfLogin='#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input:nth-child(1)';
var inputOfAccount='#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input:nth-child(2)';//账号
var inputOfPassword='#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input:nth-child(3)';//密码
var buttonOfLSP="#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > select";//运营商的选择
var buttonOfLogin='#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input:nth-child(1)';//登录按钮
var buttonOfBack='body > div.c-pop.c-confirm.boxy-wrapper.fixed > div > div.bd.boxy-content > form > input';//出错确认（返回）按钮
var buttonOfLogout='#edit_body > div:nth-child(1) > div.edit_loginBox.ui-resizable-autohide > form > input';//注销按钮

// 登录函数
function login()
{
    
    document.querySelector(inputOfAccount).value = user_account;// 自动填写账号
    document.querySelector(inputOfPassword).value = user_password;//自动填写密码
    document.querySelector(buttonOfLSP).selectedIndex = lsp;// 自动选择运营商
    window.setTimeout(function(){document.querySelector(buttonOfLogin).click()},200);// 自动点击登录按钮
}

(function()
{
    window.setTimeout(function()
    {
        if( $(boxOfLogin).length > 0 )//判断输入框是否存在
        {
                console.log("登录框存在");
                login();
                window.setTimeout(function()
                {
                    if(document.querySelector(buttonOfBack).value=="返回")//有返回按钮存在
                    {
                        document.querySelector(buttonOfBack).click()
                        console.log("存在返回按钮，立即返回，并执行登录操作")
                        login();
                    };
                    console.log("登录成功")
                    let res=confirm("登录成功")
                    console.log(res)
                }, 1000);
        }
        else
        {
            window.setTimeout(function()//输入框不存在
            {
                console.log("登录框不存在");
                if(document.querySelector(buttonOfLogout).value=="注销")//判断注销按钮是否存在
                {
                    console.log("注销按钮存在")
                    window.setTimeout(function(){alert("似乎已经登录过了，不需要再进行登录哦")})
                }else
                {
                    var choose=confirm("登录框似乎不存在，是否刷新页面重试？");
                    window.setTimeout(function()
                    {
                        if (choose)
                        {
                            console.log("刷新页面")
                            window.setTimeout(function()
                            {
                                location.reload();
                            },1000)
                        }
                        else
                        {
                            console.log("用户取消了刷新")
                        };
                    },3000);
                    console.log(choose);
                };
            },1000)
        };
    },300)
})();

