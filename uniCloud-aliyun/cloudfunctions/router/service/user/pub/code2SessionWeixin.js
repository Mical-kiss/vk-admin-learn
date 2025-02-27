module.exports = {
	/**
	 * 获取微信openid
	 * @url user/pub/code2SessionWeixin 前端调用的url参数地址
	 * @description 支持APP、微信小程序、微信公众号
	 * data 请求参数 说明
	 * @param {String} code 微信登录返回的code
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 * @param {String} openid 用户openid
	 * @param {String} unionid 用户unionid，可以取到此值时返回
	 * @param {String} sessionKey 客户端为微信小程序时返回
	 * @param {String} accessToken 客户端为APP时返回
	 * @param {String} expiresIn 客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）
	 * @param {String} refreshToken 客户端为APP时返回，用于刷新accessToken
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, vk } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			code,
			appid,
			needCache
		} = data;
		res = await vk.openapi.weixin.auth.code2Session({
			context: originalParam.context,
			appid,
			code,
			needKey: false, // 是否需要返回明文的sessionKey或accessToken（为了安全期间，建议设置false）
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}