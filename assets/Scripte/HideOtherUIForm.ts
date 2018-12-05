/**
 * 隐藏所有窗体演示
 * 
 */

import BaseUIForm from './UIFormwork/BaseUIForm';
const { ccclass, property } = cc._decorator;
import { UIFormType, UIFormShowMode, AnimType, UIFormLucenyType } from './UIFormwork/E_UIForm';

@ccclass
export default class HideOtherUIForm extends BaseUIForm {


    onLoad() {
        this.GetUIType.UIForms_ShowMode = UIFormShowMode.HideOther;
        this.GetUIType.UIForm_AnimType = AnimType.Normal;
        this.GetUIType.UIForm_LucencyType = UIFormLucenyType.NoLucency;
        this.GetUIType.UIForms_Type = UIFormType.Normal;

        //只要使用父类的RigisterButtonObjectEvent注册按钮事件,必须带有一个参数
        //参考下方:CloseSelfUIForm
        this.RigisterButtonObjectEvent(this.node, "Close", this.CloseSelfUIForm.bind(this));
    }

    start() {
        cc.log(this.node.parent.name);
    }

   /**
    * 此事件为本节点下的按钮节点注册事件,参数与方法体的指向必须使用self,
    * 此self为上层注册事件时this的代指
    * @param self 
    */
    CloseSelfUIForm() {
        this.CloseUIForm(this.node.name);
    }
}
