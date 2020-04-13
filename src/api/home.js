/**
 * 引入POST、BASE_URL
 * @param params
 * @returns {*}
 */
export const urls="http://47.104.173.17:9002/evaluate"
import { POST, BASE_URL, } from '../api/index'
//资源统计-学校资源统计
export function ResStatSlist(params) {
	return POST(urls+'/res/stat/s-list', params, 'get', '')
}
//资源统计-学校资源统计
export function ResStatTlist(params) {
	return POST(urls+'/res/stat/t-list', params, 'get', '')
}
//获取登陆用户信息
export function UsercenterGetInfo() {
	return POST(urls+'/usercenter/get-info', '', 'get', '')
}
//登陆用户:查询自己全部角色权限菜单
export function MenuTreeByUser(params) {
	return POST(urls+'/menu/tree-by-user', params, 'get', '')
}
//退出登录
export function UserLogout() {
	return POST(urls+'/user/logout', '', 'post', '')
}
//教材-获取学科列表
export function CourSesubjectList(params) {
	return POST(urls+'/course/subject/list', params, 'get', '')
}
//教材-获取教材版本列表
export function CourVersionList(params) {
	return POST(urls+'/course/version/list', params, 'get', '')
}
//教材-获取（年级）册别列表
export function CourVolumeList(params) {
	return POST(urls+'/course/volume/list', params, 'get', '')
}
//根据学科id、版本id、（年级）册别id获取教材章节树
export function BookGetChaptertreeVo(params) {
	return POST(urls+'/book/get-chaptertree-vo', params, 'get', '')
}
//获取一本教材树(含章节)
export function BookGetbooktree(params) {
	return POST(urls+'/book/getbooktree', params, 'get', '')
}
//资源-获取资源列表
export function ResList(params) {
	return POST(urls+'/res/list', params, 'get', '')
}
//资源类型-获取上传资源类型列表
export function ResTypesList(params) {
	return POST(urls+'/res/types/list', params, 'get', '')
}
//资源-下载次数+1
export function ResSetDown(params) {
	return POST(urls+'/res/set-down', params, 'post', '',2)
}
//资源-浏览量+1
export function ResSetView(params) {
	return POST(urls+'/res/set-view', params, 'post', '',2)
}
//云备课-获取上传资源类型（带上传统计）
export function PrepareLessonRestypeList(params) {
	return POST(urls+'/prepare/lesson/restype-list', params, 'get', '')
}
//云备课-新增教材
export function PrepareBook(params) {
	return POST(urls+'/prepare/book', params, 'post', '')
}
//云备课-获取教师所选教材
export function PrepareBookList(params) {
	return POST(urls+'/prepare/book/list', params, 'get', '')
}
//云备课-获取课时列表
export function PrepareLessonList(params) {
	return POST(urls+'/prepare/lesson/list', params, 'get', '')
}
//云备课-添加课时
export function PrepareLesson(params) {
	return POST(urls+'/prepare/lesson', params, 'post', '')
}
//阿里云oss文件上传
export function FileOssUpload(params) {
	return POST(urls+'/file/oss-upload', params, 'post', '')
}
//云备课-上传资源
export function Prepare(params) {
	return POST(urls+'/prepare', params, 'post', '')
}
//云备课-获取课时下我的资源列表
export function PrepareList(params) {
	return POST(urls+'/prepare/list', params, 'get', '')
}
//云备课-删除课时
export function PrepareLessonK(k) {
	return POST(urls+'/prepare/lesson/'+k, '', 'delete', '')
}
//云备课-删除资源
export function PrepareK(k) {
	return POST(urls+'/prepare/'+k, '', 'delete', '')
}
//资源-获取资源详情
export function ResK(k) {
	return POST(urls+'/res/'+k, '', 'get', '')
}
//资源-审核通过
export function ResBatchReview(params) {
	return POST(urls+'/res/batch-review', params, 'post', '')
}