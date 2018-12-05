/***
 * 
 *    Title: UI框架项目
 *           主题： 节点辅助工具类  
 *    Description: 
 *           功能： 提供程序用户一些常用的功能方法实现，方便程序员快速开发。
 *          
 *         
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 *   
 */

import UIMaskMgr from './UIMaskMgr';
const { ccclass, property } = cc._decorator;

@ccclass
export default class CCCompentHelper extends cc.Component {

    /**
     * 获取父类下任意子孙节点
     * @param parentNode 父节点名称
     * @param childName 子孙节点名称
     */
    public static FindChildNode(parentNode: cc.Node, childName: string): cc.Node {
        var self = this;
        let chaildNodes: cc.Component[] = null;
        var childNode: cc.Node = null;
        chaildNodes = parentNode.getComponentsInChildren(cc.Component);
        for (var i = 0; i < chaildNodes.length; i++) {
            var element = chaildNodes[i];
            var curNodeName = element.name;
            var index = curNodeName.indexOf('<');
            if (index >= 0) {
                curNodeName = curNodeName.substr(0, index);
            }
            if (curNodeName == childName) {
                childNode = element.node;
                break;
            }
        }
        return childNode;
    }


    /**
     * 重新设置任意节点的父对象
     * @param newParent 新父节点
     * @param childName 子节点名称
     * @param oldParent 旧父节点,可选,不填从Canvas查找,耗!
     */
    public static SetNodeParent(newParent: cc.Node, childName: string, oldParent?: cc.Node) {
        if (oldParent == null) {
            oldParent = cc.find("Canvas") || cc.find("Root");
        }
        let chaildNode: cc.Node = this.FindChildNode(oldParent, childName);
        chaildNode.parent = newParent;
    }
}
