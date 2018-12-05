/**
 * 弹出窗体演示
 * 
 */

import BaseUIForm from './UIFormwork/BaseUIForm';
import UIMaskMgr from './UIFormwork/UIMaskMgr';
const { ccclass, property } = cc._decorator;
import { UIFormType, UIFormShowMode, AnimType, UIFormLucenyType } from './UIFormwork/E_UIForm';

@ccclass
export default class PopUpUIForm extends BaseUIForm {


    onLoad() {
        this.GetUIType.UIForms_ShowMode = UIFormShowMode.ReverseChange;
        this.GetUIType.UIForm_AnimType = AnimType.SmallToBig;
        this.GetUIType.UIForm_LucencyType = UIFormLucenyType.ImPenetrable;
        this.GetUIType.UIForms_Type = UIFormType.PopUp;
        //只要使用父类的RigisterButtonObjectEvent注册按钮事件,必须带有一个参数
        //参考下方:OpenOther/CloseSelfUIForm
        this.RigisterButtonObjectEvent(this.node, "OpenHideOther", this.OpenOther.bind(this));
        this.RigisterButtonObjectEvent(this.node, "Close", this.CloseSelfUIForm.bind(this));
        this.RigisterButtonObjectEvent(UIMaskMgr.instance().mMaskPanel, "_UIMaskPanel", this.CloseSelfUIForm.bind(this));
    }

    start() {
        cc.log(this.node.parent.name);
    }

    /**
    * 此事件为本节点下的按钮节点注册事件,参数与方法体的指向必须使用self,
    * 此self为上层注册事件时this的代指
    * @param self 
    */
    OpenOther() {
        this.OpenUIForm("HideOtherUIForm");
    }

    /**
    * 此事件为本节点下的按钮节点注册事件,参数与方法体的指向必须使用self,
    * 此self为上层注册事件时this的代指
    * @param self 
    */
    CloseSelfUIForm() {
        cc.log(this.node.name);
        this.CloseUIForm(this.node.name);
    }
}
