import  {request} from  "./network"  //导入axios实例进行使用。

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
export function getHomeGoods(type,page){
  return request({
    url: '/home/data',
    params:{
      type,
      page
    }
  })

}