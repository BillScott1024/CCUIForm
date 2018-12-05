/**
 *    Title: UI框架项目
 *           主题: 窗体枚举    
 * 
 *             
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */

/**
 * 窗体类型
 */
enum UIFormType {
    /**
     * 普通窗体
     */
    Normal,
    /**
     * 固定窗体
     */
    Fixed,
    /**
     * 弹出窗体
     */
    PopUp
}


/**
 * UI窗体的显示类型
 */
enum UIFormShowMode {
    /**
     * 普通
     */
    Normal,
    /**
    * 反向切换
    */
    ReverseChange,
    /**
     * 隐藏其他
     */
    HideOther
}

/**
 * 窗体动画类型
 */
enum AnimType {
    /**
     * 无动画
     */
    Normal,
    /**
     * 由大变小
     */
    BigToSmall,
    /**
     * 由小变大
     */
    SmallToBig,
    /**
     * 下拉
     */
    TopToBottom,
    /**
     * X缩放0
     */
    ScaleByX0,
    /**
     * X缩放1
     */
    ScaleByX1


}

/**
 * UI窗体透明度类型
 */
enum UIFormLucenyType {
    /**
     * 完全透明，屏蔽事件
     */
    Lucency,
    /**
     * 半透明，屏蔽事件
     */
    Translucence,
    /**
     * 低透明度，屏蔽事件
     */
    ImPenetrable,
    /**
     * 高透明度，屏蔽事件
     */
    HightPenetrable,
    /**
     * 窗体下的窗体事件不遮挡
     */
    Pentrate,
    /**
     * 不透明
     */
    NoLucency
}

export { UIFormType, UIFormShowMode, AnimType, UIFormLucenyType };
