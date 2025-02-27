module.exports = {
	/**
	 * QQ授权登录
	 * @url user/pub/loginByQQ 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} code QQ小程序登录返回的code
	 * @param {String} accessToken QQ APP登录返回的access_token
	 * @param {String} type login:登录 register:注册
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 * @param {String} token 登录成功之后返回的token信息
	 * @param {String} tokenExpired token过期时间
	 */
	main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = {};
		// 业务逻辑开始-----------------------------------------------------------
		let {
			code,
			accessToken,
			type,
			needPermission
		} = data;
		res = await uniID.loginByQQ({
			code,
			accessToken,
			type,
			needPermission
		});
		if (res.token) {
			if (!res.msg) {
				res.msg = res.type === "register" ? "注册成功" : "登录成功";
			}
			let encrypted = vk.crypto.aes.encrypt({
				data: res
			});
			delete res.sessionKey; // 删除明文sessionKey
			delete res.accessToken; // 删除明文accessToken
			delete res.refreshToken; // 删除明文refreshToken
			res.encryptedKey = encrypted; // 返回前端加密内容
			// 日志服务
			const loginLogService = vk.require("service/user/util/loginLog");
			await loginLogService.add({
				type: "login",
				login_type: "qq",
				user_id: res.uid,
				context: originalParam.context
			}, util);
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}