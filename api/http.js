import Request from '../api/request.js';
let request = new Request().http
let qq = 'lee82577299'

// 轮播图
export const swiper = () =>{
	 return request('/index/carousel/list',{qq:qq},'POST')
}

// 热门
export const hot = () =>{
	 return request('/index/movie/hot',{qq:qq,type: 'superhero'},'POST')
}

//预告
export const notice = () =>{
	 return request('/index/movie/hot',{qq:qq,type: 'trailer'},'POST')
}

//喜欢
export const like = () =>{
	 return request('/index/guessULike',{qq:qq},'POST')
}