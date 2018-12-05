/***
 * 
 *    Title: UI框架项目
 *           主题： UI管理器  
 *    Description: 
 *           功能： 是整个UI框架的核心，用户程序通过本脚本，来实现框架绝大多数的功能实现。
 *                  
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 * 
 *    软件开发原则：
 *    1： “高内聚，低耦合”。
 *    2： 方法的“单一职责”
 *     
 */
import UIType from './UIType';
import Constant from './Constant';
import UIMaskMgr from './UIMaskMgr';
import BaseUIForm from './BaseUIForm';
const { ccclass, property } = cc._decorator;
import ResourcesMar from './ResourcesMar';
import CCCompentHelper from './CCCompentHelper';
import { UIFormType, UIFormShowMode, AnimType, UIFormLucenyType } from './E_UIForm';
import { array, Node, loader, Prefab, Canvas, String, KEY } from './../../../creator.d';

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Label)
    mDebugLabel: cc.Label = null;

    public testLabel: string = "1111";

    private static mInstance = null;
    //unshift加入,[..]出是堆栈
    //push加入,[..]出是队列
    //-unshift加入 pop返回并删除/队列
    //所有窗体缓存集合
    public mAllUIFormMap: Map<string, cc.Node> = new Map();
    //当前堆栈显示的窗体集合-push加入  pop返回并删除/堆栈
    mCurStackShowUIFormArry = new Array();
    //已经加载过的窗体-判断是否设置过父节点
    mAlreadyOpenUIFormArry = new Array();
    //当前显示的集合(不包括堆栈中的集合)
    mCurShowUIFromMap: Map<string, Node> = new Map();

    mGameCanvas: cc.Node = null;
    //全屏幕显示的节点
    private mNormalNode: cc.Node = null;
    //固定显示的节点
    private mFixedNode: cc.Node = null;
    //弹出节点
    private mPopUpNode: cc.Node = null;

    public isLoadAsses: boolean = true;

    public static instance(): UIManager {
        if (this.mInstance == null) {
            let root = cc.find("root");
            let uiManagerNode = new cc.Node("_UIManager");
            this.mInstance = uiManagerNode.addComponent<UIManager>(UIManager);
            root.addChild(uiManagerNode);
            uiManagerNode.setPosition(0, 0);
        }
        return this.mInstance;
    }

    onLoad() {
    }


    /**
     * 实例化框架
     */
    public InitUIRoot() {
        if (this.mGameCanvas != null) {
            return;
        }
        var self = this;
        var canvas = null;
        this.mGameCanvas = this.mAllUIFormMap.get("Canvas");
        cc.director.getScene().addChild(self.mGameCanvas);
        self.mGameCanvas.setPosition(480, 320);
        self.node.parent = null;
        self.mGameCanvas.getChildByName(Constant.mScriptMgr).addChild(self.node);
        self.node.setPosition(0, 0);
        self.testLabel = self.node.name;
        self.mNormalNode = self.mGameCanvas.getChildByName(Constant.mNomal);
        self.mFixedNode = self.mGameCanvas.getChildByName(Constant.mFixed);
        self.mPopUpNode = self.mGameCanvas.getChildByName(Constant.mPopUp);
        self.mDebugLabel = self.mGameCanvas.getComponentInChildren(cc.Label);
    }


    /**
     * 打开窗体
     * @param uiFormName 窗体名称
     */
    ShowUIForms(uiFormName: string) {
        var thisUIForm: BaseUIForm = null;
        thisUIForm = this.LoadFormsToAllUIFormsCatch(uiFormName);
        if (thisUIForm == null) {
            cc.log("没有将[" + uiFormName + "]加入到集合");
            return null;
        }

        //是否清空“栈集合”中得数据
        if (thisUIForm.GetUIType.IsClearStack) {
            this.ClearStackArray();
        }

        //根据窗体类型做处理
        switch (thisUIForm.GetUIType.UIForms_ShowMode) {
            case UIFormShowMode.Normal:
                this.PushUIToCurrentCache(uiFormName);
                break;
            case UIFormShowMode.ReverseChange:
                this.PushUIFormToStack(uiFormName);
                break;
            case UIFormShowMode.HideOther:
                this.PushUIFormsAndHideOther(uiFormName);
                break;
        }

        //TODO-打开窗体动画事件
        switch (thisUIForm.GetUIType.UIForm_AnimType) {
            case AnimType.TopToBottom:
                //TODO此处做窗体动画,并active
                break;
            case AnimType.SmallToBig:
                thisUIForm.node.runAction(cc.scaleTo(0.2,1,1))
                //TODO此处做窗体动画,并active
                break;
                //.....
        }
    }


     /**
     * 关闭窗体
     * @param uiFormName 窗体名称
     */
    CloseUIForms(uiFormName: string) {
        var thisCloseUIForm: BaseUIForm = null;
        thisCloseUIForm = this.LoadFormsToAllUIFormsCatch(uiFormName);
        if (thisCloseUIForm == null) {
            cc.log("没有将[" + uiFormName + "]加入到集合");
            return null;
        }
        //根据窗体类型做处理
        switch (thisCloseUIForm.GetUIType.UIForms_ShowMode) {
            case UIFormShowMode.Normal:
                this.CloseNomalUIForm(uiFormName);
                break;
            case UIFormShowMode.ReverseChange:
                this.ClosePopUIFrom(uiFormName);
                break;
            case UIFormShowMode.HideOther:
                this.CloseAndDisplayOtherUIForms(uiFormName);
                break;
        }

        //TODO-关闭窗体动画事件
        switch (thisCloseUIForm.GetUIType.UIForm_AnimType) {
            case AnimType.TopToBottom:
                //TODO此处做窗体动画,并UnActive
                break;
            case AnimType.SmallToBig:
                thisCloseUIForm.node.runAction(cc.scaleTo(0.2,0,0))
                //TODO此处做窗体动画,并UnActive
                break;
                //.....
        }
    }


     /**
     * 从所有缓存中获取窗体
     * @param uiFormName 窗体名称
     */
    LoadFormsToAllUIFormsCatch(uiFormName: string): BaseUIForm {
        var thisUIForm: BaseUIForm = null;
        var thisUIFormNode: cc.Node = this.mAllUIFormMap.get(uiFormName);
        if (thisUIFormNode == null) {
            cc.log("没有将[" + uiFormName + "]加入到集合");
            return null;
        }
        thisUIForm = thisUIFormNode.getComponent<BaseUIForm>(BaseUIForm);
        for (var index = 0; index < this.mAlreadyOpenUIFormArry.length; index++) {
            var element = this.mAlreadyOpenUIFormArry[index];
            if (element == thisUIFormNode.name) {
                return thisUIForm;
            }
        }
        this.mAlreadyOpenUIFormArry.push(thisUIFormNode.name);
        this.mGameCanvas.addChild(thisUIFormNode);
        thisUIFormNode.parent = null;
        switch (thisUIForm.GetUIType.UIForms_Type) {
            case UIFormType.Normal:
                this.mNormalNode.addChild(thisUIFormNode);
                break;
            case UIFormType.Fixed:
                this.mFixedNode.addChild(thisUIFormNode);
                break;
            case UIFormType.PopUp:
                this.mPopUpNode.addChild(thisUIFormNode);
                break;
        }
        thisUIFormNode.setPosition(0, 0);
        return thisUIForm;
    }


    /*废弃
    LoadUIForm(uiFormName: string): BaseUIForm {
        var inCount: number = 0;
        var thisUIForm: BaseUIForm = null;
        var thisUIFormNode: cc.Node = null;
        var newNode: cc.Prefab = null;
        newNode = ResourcesMar.LoadUIForm<cc.Prefab>("UIForm", uiFormName);
        return thisUIForm;
    }*/


    /**
     * 加载窗体到mCurShowUIFromMap
     * @param uiFormName 窗体名称
     */
    PushUIToCurrentCache(uiFormName: string) {
        if (!this.mCurShowUIFromMap.has(uiFormName)) {
            let curShowUIFromNode = this.mAllUIFormMap.get(uiFormName);
            let curShowUIFrom: BaseUIForm = curShowUIFromNode.getComponent<BaseUIForm>(BaseUIForm);
            this.mCurShowUIFromMap.set(uiFormName, curShowUIFrom);
            curShowUIFrom.ActiveUIForm();
        }
    }


    /**
     * 加载窗体到mCurStackShowUIFormArry
     * @param uiFormName 
     */
    PushUIFormToStack(uiFormName: string) {
        var curShowUIFrom: BaseUIForm = null;
        for (var index = 0; index < this.mCurStackShowUIFormArry.length; index++) {
            curShowUIFrom = this.mCurStackShowUIFormArry[index];
            if (curShowUIFrom.node.name == uiFormName) {
                return;
            }
        }
        if (this.mCurStackShowUIFormArry.length > 0) {
            let topShowUIForm: BaseUIForm = this.mCurStackShowUIFormArry.pop();
            topShowUIForm.Freeze();
            this.mCurStackShowUIFormArry.push(topShowUIForm);
        }
        let curShowUIFromNode = this.mAllUIFormMap.get(uiFormName);
        curShowUIFrom = curShowUIFromNode.getComponent<BaseUIForm>(BaseUIForm);
        if (curShowUIFrom != null) {
            //当前窗口显示状态
            curShowUIFrom.ActiveUIForm();
            //把指定的UI窗体，入栈操作。
            this.mCurStackShowUIFormArry.push(curShowUIFrom);
        }
    }


    /**
     * 打开隐藏其他窗体类型
     * @param uiFormName 
     */
    PushUIFormsAndHideOther(uiFormName: string) {
        this.mCurStackShowUIFormArry.forEach(function (v, k) {
            let curShowUIFromMap: BaseUIForm = v;
            curShowUIFromMap.UnActiveUIForm();
            curShowUIFromMap.node.active=false;
        })

        this.mCurShowUIFromMap.forEach(function (v, k) {
            let curUIFormNode: cc.Node = v;
            curUIFormNode.getComponent<BaseUIForm>(BaseUIForm).UnActiveUIForm();
        })
        this.PushUIToCurrentCache(uiFormName);
    }

    /**
     * 普通窗体关闭
     * @param uiFormName 
     */
    CloseNomalUIForm(uiFormName: string) {
        var thisCloseUIForm: cc.Node = this.mCurShowUIFromMap.get(uiFormName);
        if (!thisCloseUIForm) {
            return;
        }
        thisCloseUIForm.getComponent<BaseUIForm>(BaseUIForm).UnActiveUIForm();
        this.mCurShowUIFromMap.delete(uiFormName);
    }

    /**
     * 弹出窗体关闭
     * @param uiFormName 
     */
    ClosePopUIFrom(uiFormName: string) {
        var thisCloseUIForm: BaseUIForm = null;
        if (this.mCurStackShowUIFormArry.length >= 2) {
            thisCloseUIForm = this.mCurStackShowUIFormArry.pop();
            thisCloseUIForm.UnActiveUIForm();
            thisCloseUIForm = this.mCurStackShowUIFormArry.pop();
            thisCloseUIForm.Redisplay();
            this.mCurStackShowUIFormArry.push(thisCloseUIForm);
        }
        if (this.mCurStackShowUIFormArry.length == 1) {
            thisCloseUIForm = this.mCurStackShowUIFormArry.pop();
            thisCloseUIForm.UnActiveUIForm();
        }
    }


    /**
     * 隐藏其它窗体关闭
     * @param uiFormName 
     */
    CloseAndDisplayOtherUIForms(uiFormName: string) {
        this.CloseNomalUIForm(uiFormName);
        this.mCurStackShowUIFormArry.forEach(function (v, k) {
            let curShowUIFromMap: BaseUIForm = v;
            curShowUIFromMap.Redisplay();
        })

        this.mCurShowUIFromMap.forEach(function (v, k) {
            let curUIFormNode: cc.Node = v;
            curUIFormNode.getComponent<BaseUIForm>(BaseUIForm).Redisplay();
        })
    }


    /**
     * 清空栈集合,并隐藏栈中所有窗体
     */
    ClearStackArray() {
        if (this.mCurStackShowUIFormArry.length > 0) {
            this.mCurStackShowUIFormArry.forEach(function (v, k) {
                let curShowUIFromMap: BaseUIForm = v;
                curShowUIFromMap.UnActiveUIForm();
            })
            this.mCurStackShowUIFormArry.length = 0;
        }
    }
}