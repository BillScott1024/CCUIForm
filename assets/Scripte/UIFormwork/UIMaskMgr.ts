import { Node, Transition, Vec2, Canvas } from './../../../creator.d';
/***
 * 
 *    Title: UI框架项目
 *           主题：   UI遮罩管理器  
 *    Description: 
 *           功能： 负责“弹出窗体”模态显示实现
 *                  
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 *   
 */

import Constant from './Constant';
import CCCompentHelper from './CCCompentHelper';
const { ccclass, property } = cc._decorator;
import { UIFormType, UIFormShowMode, AnimType, UIFormLucenyType } from './E_UIForm';

@ccclass
export default class UIMaskMgr extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    public text: string = 'hello';
    //根节点Canvas
    mCanvas: cc.Node = null;
    //该脚本父节点
    public mScriptsParentNode: cc.Node = null;
    //遮罩节点
    public mMaskPanel: cc.Node = null;
    mMaskColor: cc.Color = null;
    private static mInstance = null;

    mMaskStarZinde = 50;
    mOldMaskZinde: number = 0;
    public static instance(): UIMaskMgr {
        if (this.mInstance == null) {
            let root = cc.find("Canvas");
            let maskManagerNode = new cc.Node("_UIMaskMgr");
            this.mInstance = maskManagerNode.addComponent<UIMaskMgr>(UIMaskMgr);
            root.getChildByName(Constant.mScriptMgr).addChild(maskManagerNode);
            maskManagerNode.setPosition(0, 0);
        }
        return this.mInstance;
    }

    onLoad() {
        this.mScriptsParentNode = this.node.parent;
        this.mCanvas = cc.find("Canvas");
        let popNode = this.mCanvas.getChildByName(Constant.mPopUp);
        this.mMaskPanel = CCCompentHelper.FindChildNode(popNode, Constant.m_UIMaskPanel);
        this.mOldMaskZinde = this.mMaskPanel.zIndex;
    }



    /**
     * 设置遮罩透明样式
     * @param goDisplayUIForms 
     * @param lucenyType 
     */
    public SetMaskNode(goDisplayUIForms: cc.Node, lucenyType: UIFormLucenyType) {
        switch (lucenyType) {
            case UIFormLucenyType.Lucency:
                this.mMaskPanel.active = true;
                this.mMaskPanel.opacity = 0;
                break;
            case UIFormLucenyType.Translucence:
                this.mMaskPanel.active = true;
                this.mMaskPanel.opacity = 125;
                break;
            case UIFormLucenyType.ImPenetrable:
                this.mMaskPanel.active = true;
                this.mMaskPanel.opacity = 90;
                break;
            case UIFormLucenyType.Pentrate:
                if (this.mMaskPanel.active) {
                    this.mMaskPanel.active = false;
                }
                break;
            case UIFormLucenyType.NoLucency:
                this.mMaskPanel.opacity = 255;
                break;

        }
        this.mMaskPanel.zIndex = this.mMaskStarZinde;
        this.mMaskStarZinde += 1;
        goDisplayUIForms.zIndex = this.mMaskStarZinde;
    }



    /**
     * 关闭遮罩
     */
    public CancelMaskNode() {
        if (this.mMaskPanel.active) {
            this.mMaskStarZinde = 50;
            this.mMaskPanel.zIndex = this.mOldMaskZinde;
            this.mMaskPanel.active = false;
        }
    }

}
