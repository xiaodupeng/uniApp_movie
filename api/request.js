// uni-app请求封装
export default class Request {
    http (router,data={},method) {
        // 基础地址
        let path = 'https://www.imovietrailer.com/superhero';
        // 返回promise
        return new Promise((resolve,reject) => {
            // 请求
            uni.request({
                url: `${path}${router}`,
                data: data,
				header:{
				'content-type':'application/x-www-form-urlencoded'
				},
                method:method,
                success: (res) => {
                    // 将结果抛出
                    resolve(res.data)
                }
            })
        })    
    }
}