/**
 *    Title: UI框架项目
 *           主题: UI窗体的父类
 *    Description: 
 *           功能：定义所有UI窗体的父类。
 *           定义四个生命周期
 *           
 *           1：Display 显示状态。
 *           2：Hiding 隐藏状态
 *           3：ReDisplay 再显示状态。
 *           4：Freeze 冻结状态。
 *                         
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
import UIType from './UIType';
import Constant from './Constant';
import UIMaskMgr from './UIMaskMgr';
import UIManager from './UIManager';
const { ccclass, property } = cc._decorator;
import CCCompentHelper from './CCCompentHelper';
import { EventListener, Color } from './../../../creator.d';
import { UIFormType, UIFormShowMode, AnimType, UIFormLucenyType } from './E_UIForm';

@ccclass
export default class BaseUIForm extends cc.Component {

    //窗体类型
    private uiType = new UIType();

    public get GetUIType() {
        return this.uiType;
    }
    public set SetUIType(e_type: UIType) {
        this.uiType = e_type;
    }

    @property(cc.Label)
    label: cc.Label = null;


    onLoad() {

    }




    /**
     * 当前窗体显示
     */
    public ActiveUIForm() {
        //当前无动画直接显示,有动画,在动画中显示
        if (this.GetUIType.UIForm_AnimType == AnimType.Normal) {
            this.node.active = true;
        }
        //设置模态窗体调用(必须是弹出窗体)
        if (this.GetUIType.UIForms_Type == UIFormType.PopUp) {
            //UIMaskMgr.GetInstance().SetMaskWindow(this.gameObject, _CurrentUIType.UIForm_LucencyType);
            UIMaskMgr.instance().SetMaskNode(this.node, this.uiType.UIForm_LucencyType);
        }
    }


    /**
     * 当前窗体隐藏
     */
    public UnActiveUIForm() {
        //当前无动画直接显示,有动画,在动画中显示
        if (this.uiType.UIForm_AnimType == AnimType.Normal) {
            this.node.active = false;
        }
        //取消模态窗体调用
        if (this.uiType.UIForms_Type == UIFormType.PopUp) {
            UIMaskMgr.instance().CancelMaskNode();
        }
    }


    /**
     * 重新显示当前窗体
     */
    public Redisplay() {
        this.node.active = true;
        //设置模态窗体调用(必须是弹出窗体)
        if (this.uiType.UIForms_Type == UIFormType.PopUp) {
            UIMaskMgr.instance().SetMaskNode(this.node, this.uiType.UIForm_LucencyType);
        }
    }

    //冻结当前窗体
    public Freeze() {
        this.node.active = true;
    }


    /**
     * 注册按钮事件-子类直接调用
     * @param parent 按钮父根节点
     * @param btnName 按钮名称
     * @param callBack 回调
     */
    public RigisterButtonObjectEvent(parent: cc.Node, btnName: string, callBack: Function) {
        var btnNode: cc.Node = CCCompentHelper.FindChildNode(parent, btnName);
        btnNode.on(cc.Node.EventType.TOUCH_START, function () {
            //btnNode.runAction(cc.scaleTo(0.9, 0.9));
        });
        btnNode.on(cc.Node.EventType.TOUCH_END, function () {
            callBack();
            //btnNode.runAction(cc.scaleTo(0.1,1.1, 1.1));
            //btnNode.runAction(cc.scaleTo(0.2,1, 1));
        });
    }

    /**
     * 打开窗体
     * @param uiFormName 
     */
    public OpenUIForm(uiFormName: string) {
        UIManager.instance().ShowUIForms(uiFormName);

    }

    /**
     * 关闭当前窗体
     * @param uiFormName 
     */
    public CloseUIForm(uiFormName: string) {
        UIManager.instance().CloseUIForms(uiFormName);
    }

}
