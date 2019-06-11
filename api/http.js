import Request from '../api/request.js';
let request = new Request().http
let qq = 'lee17076261'

// 轮播图
export const swiper = () =>{
	 return request(`/index/carousel/list?qq=${qq}`,{},'POST')
}

// 热门
export const hot = () =>{
	 return request(`/index/movie/hot?type=superhero&qq=${qq}`,{},'POST')
}

//预告
export const notice = () =>{
	 return request(`/index/movie/hot?type=trailer&qq=${qq}`,{},'POST')
}

//喜欢
export const like = () =>{
	 return request(`/index/guessULike?qq=${qq}`,{},'POST')
}

//搜索
export const search = (keywords,page,pageSize) =>{
	 return request(`/search/list?keywords=${keywords}&page=${page}&pageSize=${pageSize}&qq=${qq}`,{},'POST')
}

//电影详情
export const details = (trailerId) =>{
	 return request(`/search/trailer/${trailerId}?qq=${qq}`,{},'POST')
}

//导演和演员
export const directorActor = (trailerId,num) =>{
	 return request(`/search/staff/${trailerId}/${num}?qq=${qq}`,{},'POST')
}


//登录
export const registLogin = (username,password) =>{
	 return request(`/user/registOrLogin?qq=${qq}`,{"username":username,"password":password},'POST')
}

//退出登录
export const logout = (id) =>{
	 return request(`/user/logout?userId=${id}&qq=${qq}`,{},'POST')
}



