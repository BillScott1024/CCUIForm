/**
 *    Title: UI框架项目
 *           主题: 窗体类型      
 * 
 *           
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */

import { UIFormType, UIFormShowMode, AnimType, UIFormLucenyType } from './E_UIForm';

export default class UIType  {

    /**
     * 是否清空“栈集合”
     */
    public IsClearStack: boolean = false;
    /**
     * UI窗体（位置）类型
     */
    public UIForms_Type: UIFormType = UIFormType.Normal;
    /**
     * UI窗体显示类型
     */
    public UIForms_ShowMode: UIFormShowMode = UIFormShowMode.Normal;
    /**
     * UI窗体弹出动画类型
     */
    public UIForm_AnimType: AnimType = AnimType.Normal;
    /**
     * UI窗体透明度类型
     */
    public UIForm_LucencyType: UIFormLucenyType = UIFormLucenyType.Lucency;
}

export { UIType };
