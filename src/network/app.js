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
export const thePlaylist=(params)=>request.get('playlist/detail',{params});   
//获取传入trackIds 得到完整歌单
export const thePlaylistall=(params)=>request.get('/playlist/track/all',{params});
//获取音乐 url
export const musicUrl=(params)=>request.get('song/url',{params});
//获取用户歌单
export const userPlaylist=(params)=>request.get('/user/playlist',{params});
//推荐歌单
export const personalized=(params)=>request.get('/personalized',{params});
//热门电台
export const djhot=(params)=>request.get('/dj/hot',{params});
//查看歌手
export const singer=(params)=>request.get('/artist/list',{params});
//排行榜hot
export const toplisthot=(params)=>request.get('/toplist/detail',{params});
//排行榜音乐详情 
export const playlist=(params)=>request.get('/playlist/detail',{params});
//排行榜音乐详情 
export const top50=(params)=>request.get('/artist/top/song',{params});
//获取歌手专辑 
export const singerAlbum=(params)=>request.get('/artist/album',{params}); 
//获取专辑 内容
export const album=(params)=>request.get('/album',{params});
//获取热搜
export const searchhot=(params)=>request.get('/search/hot/detail',{params});
//获取搜索建议
export const suggest=(params)=>request.get('/search/suggest',{params});
//搜索
export const cloudsearch=(params)=>request.get('/cloudsearch',{params});
//搜索歌手
export const searchcloudsearch=(params)=>request.get('/search/multimatch',{params});
//获取歌曲详情
export const detail=(params)=>request.get('/song/detail',{params});
//获取专辑评论
export const commentalbum=(params)=>request.get('/comment/album',{params});
//获取歌词
export const lyric=(params)=>request.get('/lyric',{params});  
//获取歌曲热评
export const commenhot=(params)=>request.get('/comment/hot',{params});
//获取歌曲评论
export const commenmusic=(params)=>request.get('/comment/music',{params});
//获取歌曲mv
export const singermv=(params)=>request.get('/artist/mv',{params});
//获取歌曲评论
export const singerdetail=(params)=>request.get('/artist/detail',{params});
//获取视频分类
export const videocategory=(params)=>request.get('/video/group/list',{params}); 
//获取视频标签/分类下的视频
export const videogroup=(params)=>request.get('/video/group',{params});
//获取视频分类标签
export const videocategorylist=(params)=>request.get('/video/category/list',{params});
//获取视频详情
export const videodetail=(params)=>request.get('/video/detail',{params});
//获取视频url
export const videourl=(params)=>request.get('/video/url',{params});
//获取视频url
export const videocomment=(params)=>request.get('/comment/video',{params});
//获取相关视频
export const allvideo=(params)=>request.get('/related/allvideo',{params});
//获取全部mv
export const mvall=(params)=>request.get('/mv/all',{params});
//获取相关mv详情
export const mvdetail=(params)=>request.get('/mv/detail',{params});
//获取mvurl
export const mvurl=(params)=>request.get('/mv/url',{params});
//获取mv评论
export const commentmv=(params)=>request.get('/comment/mv',{params});
//获取账号信息
export const useraccount=(params)=>request.get('/user/account',{params});
//获取收藏的专辑
export const albumsub=(params)=>request.get('/album/sublist',{params});
//获取收藏的歌手列表
export const singersublist=(params)=>request.get('/artist/sublist',{params});
//获取收藏的mv
export const mvsublist=(params)=>request.get('/mv/sublist',{params});
//获取每日推荐歌曲
export const onesongs=(params)=>request.get('/recommend/songs',{params});