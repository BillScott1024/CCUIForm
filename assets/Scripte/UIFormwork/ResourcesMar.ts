/**
 *    Title: UI框架项目
 *           主题: 资源管理器
 *    Description: 
 *           功能：资源加载辅助工具类。
 *         
 *          
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResourcesMar extends cc.Component {


    /**
     * 窗体加载 -暂时没用
     * @param packetPath 
     * @param resName 
     */
    public static LoadUIForm<T>(packetPath:string,resName: string): T {
        cc.loader.loadRes(packetPath+"/" + resName, function (err, prefab) {
            return cc.instantiate(prefab) as T;
        });
        return null;
    }
}
