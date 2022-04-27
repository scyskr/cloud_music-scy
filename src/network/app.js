import request from "./request";
export const api=(params)=>request.get('/top/playlist',{params});

export const app=(params)=>request.get('/top/song',{params});

export const banner=(params)=>request.get('/banner',{params});
//登陆接口
export const loginskr=(params)=>request.get('/login/cellphone',{params});

export const logInSuccessfully=(params)=>request.get('/user/subcount',{params});

export const exclusive=(params)=>request.get('/top/playlist/highquality',{params}); 
//歌单分类接口
export const songSingleClassification=(params)=>request.get('/playlist/catlist',{params});
//热门歌单分类
export const playlisthot=(params)=>request.get('/playlist/hot',{params});
//获取精品歌单
export const boutiquePlaylist=(params)=>request.get('/top/playlist/highquality',{params});  
//获取排行榜
export const toplist=(params)=>request.get('/top/list',{params});  
//登录状态
export const loginstatus=(params)=>request.get('/login/status',{params});
//退出登录
export const logout=(params)=>request.get('/logout',{params}); 
//获取全部排行榜
export const toplistall=(params)=>request.get('/toplist',{params});  
//获取全部排行榜内容摘要
export const toplistallcontent=(params)=>request.get('/toplist/detail',{params});
//获取歌单id获得相关歌单
export const thePlaylist=(params)=>request.get('/playlist/detail',{params});   
//获取传入trackIds 得到完整歌单
export const thePlaylistall=(params)=>request.get('/playlist/track/all',{params});